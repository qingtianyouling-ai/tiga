/* ============================================================================
   serve.mjs — 本地预览服务（零依赖，带热重载 + 视频 Range 支持）
   用法：node scripts/serve.mjs [端口]
   打开：http://127.0.0.1:5188/
   改完任何文件，页面会自动刷新（只在本地预览注入，不影响上线的 index.html）
   ========================================================================== */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const ROOT = process.cwd();
const PORT = Number(process.argv[2] || process.env.PORT || 5188);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const LIVE_RELOAD = `
<script>
/* 本地预览热重载（只在 serve.mjs 下注入） */
(function () {
  if (!window.EventSource) return;
  var es = new EventSource("/__livereload");
  es.onmessage = function (e) {
    if (e.data === "reload") location.reload();
  };
})();
</script>
`;

const clients = new Set();

function snapshot() {
  const map = new Map();
  (function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name === "node_modules" || e.name === ".git" || e.name === ".tmp" || e.name.startsWith("_backup")) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile()) {
        try {
          map.set(full, fs.statSync(full).mtimeMs);
        } catch {}
      }
    }
  })(ROOT);
  return map;
}

let last = snapshot();
setInterval(() => {
  const now = snapshot();
  let changed = false;
  for (const [file, mtime] of now) {
    if (last.get(file) !== mtime) {
      changed = true;
      break;
    }
  }
  if (!changed && now.size !== last.size) changed = true;
  last = now;
  if (changed && clients.size) {
    for (const res of clients) res.write("data: reload\n\n");
  }
}, 700);

function safeResolve(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  const full = path.resolve(ROOT, rel);
  if (!full.startsWith(ROOT)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  if (req.url === "/__livereload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });
    res.write("retry: 1000\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const file = safeResolve(req.url);
  if (!file) {
    res.writeHead(403).end("forbidden");
    return;
  }

  let stat;
  try {
    stat = fs.statSync(file);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("404 " + req.url);
    return;
  }
  if (stat.isDirectory()) {
    res.writeHead(302, { Location: "/" }).end();
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";

  /* 视频/PDF 的 Range 请求：拖动进度条、边下边播都依赖它 */
  const range = req.headers.range;
  if (range && /^(video|application\/pdf)/.test(type)) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    if (m) {
      const start = m[1] ? parseInt(m[1], 10) : 0;
      const end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
      if (start < stat.size && end >= start) {
        res.writeHead(206, {
          "Content-Type": type,
          "Content-Length": end - start + 1,
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes"
        });
        fs.createReadStream(file, { start, end }).pipe(res);
        return;
      }
    }
  }

  if (ext === ".html") {
    let html = fs.readFileSync(file, "utf8");
    html = html.replace("</body>", LIVE_RELOAD + "</body>");
    const buf = Buffer.from(html, "utf8");
    res.writeHead(200, { "Content-Type": type, "Content-Length": buf.length, "Cache-Control": "no-store" });
    res.end(buf);
    return;
  }

  res.writeHead(200, {
    "Content-Type": type,
    "Content-Length": stat.size,
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store"
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[serve] http://127.0.0.1:${PORT}/  (root: ${ROOT})`);
  console.log("[serve] 改文件后浏览器自动刷新；Ctrl+C 结束");
});
