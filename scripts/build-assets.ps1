# ============================================================================
# build-assets.ps1 - build web assets from master media
#
#   images/web/800/*.webp     card covers / gallery thumbs  (long edge <= 800)
#   images/web/1600/*.webp    lightbox / detail images      (long edge <= 1600)
#   videos/web/*.mp4          H.264 replacement, ONLY for sources that are not
#                             already H.264 (HEVC / AV1 do not play in Chrome)
#   videos/web/preview/*.mp4  silent 5s hover previews (640px wide)
#
# Masters in images/works and videos/ are never modified.
#
# Usage (execution policy may block scripts):
#   powershell -ExecutionPolicy Bypass -File scripts/build-assets.ps1
#   ... -OnlyImages | -OnlyVideos | -ForceVideoTranscode
# ============================================================================
param(
  [switch]$OnlyImages,
  [switch]$OnlyVideos,
  [switch]$ForceVideoTranscode
)
$ErrorActionPreference = 'Stop'
$ws = Split-Path -Parent $PSScriptRoot
$srcImg = Join-Path $ws 'images\works'
$out800 = Join-Path $ws 'images\web\800'
$out1600 = Join-Path $ws 'images\web\1600'
$srcVid = Join-Path $ws 'videos'
$outVid = Join-Path $ws 'videos\web'
$outPrev = Join-Path $ws 'videos\web\preview'
foreach ($d in @($out800, $out1600, $outVid, $outPrev)) {
  New-Item -ItemType Directory -Force -Path $d | Out-Null
}

function Invoke-Ffmpeg([string[]]$argList) {
  $ErrorActionPreference = 'Continue'
  & ffmpeg -hide_banner -loglevel error -y @argList
  $code = $LASTEXITCODE
  $ErrorActionPreference = 'Stop'
  if ($code -ne 0) { throw "ffmpeg exit $code" }
}

function Test-UpToDate($dest, $src) {
  return (Test-Path $dest) -and ((Get-Item $dest).LastWriteTime -gt $src.LastWriteTime)
}

# ---------------------------------------------------------------- images ----
if (-not $OnlyVideos) {
  $imgs = @(Get-ChildItem -LiteralPath $srcImg -File | Where-Object {
      $_.Extension -match '^\.(jpg|jpeg|png|webp)$' -and $_.Length -gt 2000
    })
  Write-Output "images: $($imgs.Count)"
  $i = 0
  $failed = 0
  foreach ($img in $imgs) {
    $i++
    $base = [IO.Path]::GetFileNameWithoutExtension($img.Name)
    $pf = (& ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of default=nw=1:nk=1 $img.FullName) -join ''
    $alpha = @()
    if ($pf -match 'a$|pal8|rgba|bgra') { $alpha = @('-pix_fmt', 'yuva420p') }
    foreach ($size in 800, 1600) {
      $dest = if ($size -eq 800) { Join-Path $out800 "$base.webp" } else { Join-Path $out1600 "$base.webp" }
      if (Test-UpToDate $dest $img) { continue }
      $vf = "scale=w='min($size,iw)':h='min($size,ih)':force_original_aspect_ratio=decrease"
      try {
        Invoke-Ffmpeg (@('-i', $img.FullName, '-vf', $vf, '-c:v', 'libwebp',
            '-quality', '80', '-compression_level', '6') + $alpha + @($dest))
      } catch {
        $failed++
        Write-Output "  !! $($img.Name) @$size : $($_.Exception.Message)"
        Remove-Item $dest -Force -ErrorAction SilentlyContinue
      }
    }
    if ($i % 20 -eq 0) { Write-Output "  [$i/$($imgs.Count)]" }
  }
  Write-Output "images done (failed: $failed)"
}

# ---------------------------------------------------------------- videos ----
if (-not $OnlyImages) {
  $skip = @('commercial-03.mp4') # byte-identical to HPC display file, unreferenced
  $vids = @(Get-ChildItem -LiteralPath $srcVid -File | Where-Object {
      $_.Name -like '*.mp4' -and $skip -notcontains $_.Name
    })
  Write-Output "videos: $($vids.Count)"
  $i = 0
  foreach ($vid in $vids) {
    $i++
    $base = [IO.Path]::GetFileNameWithoutExtension($vid.Name)
    $codec = (& ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 $vid.FullName) -join ''

    # only non-H.264 sources need a web replacement
    if ($ForceVideoTranscode -or $codec -ne 'h264') {
      $dest = Join-Path $outVid "$base.mp4"
      if (-not (Test-UpToDate $dest $vid)) {
        Write-Output "  [$i/$($vids.Count)] transcode $($vid.Name) ($codec)"
        try {
          Invoke-Ffmpeg @('-i', $vid.FullName,
            '-vf', "scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
            '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '96k', '-ac', '2', '-movflags', '+faststart', $dest)
        } catch {
          Write-Output "  !! transcode failed $($vid.Name) : $($_.Exception.Message)"
          Remove-Item $dest -Force -ErrorAction SilentlyContinue
        }
      }
    }

    $prev = Join-Path $outPrev "$base.mp4"
    if (-not (Test-UpToDate $prev $vid)) {
      $dur = [double](& ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 $vid.FullName)
      $start = [Math]::Min(3.0, $dur * 0.15)
      $len = [Math]::Min(5.0, [Math]::Max(1.5, $dur - $start))
      try {
        Invoke-Ffmpeg @('-ss', "$start", '-i', $vid.FullName, '-t', "$len",
          '-vf', "scale=w='min(640,iw)':h=-2", '-an',
          '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '30', '-pix_fmt', 'yuv420p',
          '-movflags', '+faststart', $prev)
      } catch {
        Write-Output "  !! preview failed $($vid.Name) : $($_.Exception.Message)"
        Remove-Item $prev -Force -ErrorAction SilentlyContinue
      }
    }
  }
  Write-Output "videos done"
}
Write-Output "ALL DONE"
