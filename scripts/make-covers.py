# ============================================================================
# make-covers.py — 竖构图 / 非 16:9 素材 → 16:9 卡片封面（模糊底 + 居中画面）
#   输入：images/works 下的原图；输出：images/web/{800,1600}/cover-<名>.webp
#   用法：<bundled-python> scripts/make-covers.py
# ============================================================================
import os

from PIL import Image, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "images", "works")
OUT = {800: os.path.join(ROOT, "images", "web", "800"), 1600: os.path.join(ROOT, "images", "web", "1600")}

# 需要转 16:9 的卡片封面：cover 名 → 原图文件名
COVERS = {
    "cover-poster-02": "design-poster-02.png",
    "cover-poster-03": "design-poster-03.jpg",
    "cover-poster-04": "design-poster-04.jpg",
    "cover-landscape-01": "photo-landscape-01.jpg",
    "cover-landscape-03": "photo-landscape-03.jpg",
    "cover-landscape-04": "photo-landscape-04.jpg",
    "cover-layout-02": "design-ecommerce-02.png",
    "cover-layout-04": "design-ecommerce-04.png",
    "cover-layout-05": "design-ecommerce-05.png",
    "cover-chongyang": "chongyang-board.jpg",
}

for name in OUT.values():
    os.makedirs(name, exist_ok=True)


def build(src_path, w, h):
    im = Image.open(src_path)
    im.seek(0)
    fg = im.convert("RGB")

    # 背景：铺满 + 高斯模糊 + 压暗
    bg = fg.copy()
    scale = max(w / bg.width, h / bg.height)
    bg = bg.resize((max(w, int(bg.width * scale)), max(h, int(bg.height * scale))), Image.LANCZOS)
    left = (bg.width - w) // 2
    top = (bg.height - h) // 2
    bg = bg.crop((left, top, left + w, top + h))
    bg = bg.filter(ImageFilter.GaussianBlur(radius=max(12, w // 40)))
    bg = ImageEnhance.Brightness(bg).enhance(0.55)

    # 前景：按高度缩放，居中贴上去
    fs = h / fg.height
    fgw, fgh = max(1, int(fg.width * fs)), h
    fg = fg.resize((fgw, fgh), Image.LANCZOS)
    if fgw > w:  # 横图按宽度收
        fs = w / fg.width
        fgw, fgh = w, max(1, int(fg.height * fs))
        fg = fg.resize((fgw, fgh), Image.LANCZOS)
    canvas = bg.copy()
    canvas.paste(fg, ((w - fgw) // 2, (h - fgh) // 2))
    return canvas


count = 0
for cover, filename in COVERS.items():
    src_path = os.path.join(SRC, filename)
    if not os.path.exists(src_path):
        print("skip（缺原图）:", filename)
        continue
    for long_edge, folder in OUT.items():
        w = long_edge
        h = round(long_edge * 9 / 16)
        img = build(src_path, w, h)
        dst = os.path.join(folder, cover + ".webp")
        img.save(dst, "WEBP", quality=82, method=6)
        count += 1
        print(f"{cover}.webp  {w}x{h}  {os.path.getsize(dst) // 1024}KB  ← {filename}")
print("done:", count, "files")
