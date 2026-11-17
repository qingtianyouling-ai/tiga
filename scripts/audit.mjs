/* ============================================================================
   audit.mjs — 引用完整性审计
   1) 解析 content.js 的数据对象
   2) 断言每个 poster / full / video / preview / 图集图片都真实存在于磁盘
   3) 汇总首屏负载与各目录体积，标出超预算的单个文件
   用法：node scripts/audit.mjs
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const sizeOf = (p) => (exists(p) ? fs.statSync(path.join(ROOT, p)).size : 0);
const kb = (b) => (b / 1024).toFixed(1) + " KB";
const mb = (b) => (b / 1048576).toFixed(2) + " MB";

/* ── 载入数据 ───────────────────────────────────────────────────────────── */
const sandbox = {};
new Function("window", read("content.js"))(sandbox);
const P = sandbox.portfolio;
if (!P) {
  console.error("FATAL: content.js 没有产出 window.portfolio");
  process.exit(1);
}

const errors = [];
const refs = [];
const add = (p, what) => {
  if (!p) return;
  if (!refs.some((r) => r.path === p)) refs.push({ path: p, what });
};

for (const w of P.works) {
  add(w.poster, `work:${w.id}:poster`);
  add(w.full, `work:${w.id}:full`);
  add(w.video, `work:${w.id}:video`);
  add(w.preview, `work:${w.id}:preview`);
  (w.images || []).forEach((s, i) => add(s, `work:${w.id}:image${i}`));
  if (w.preview && !w.video) errors.push(`work ${w.id} 有 preview 但没有 video`);
  if (w.video && !w.preview) errors.push(`work ${w.id} 缺少 preview（悬停预览会失效）`);
}
for (const [key, col] of Object.entries(P.collections)) {
  col.items.forEach((it, i) => {
    add(it.src, `collection:${key}:${i}:src`);
    add(it.thumb, `collection:${key}:${i}:thumb`);
  });
}

/* index.html 里写死的引用 */
const html = read("index.html");
for (const m of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
  const ref = m[1];
  if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue; // 外链不算缺失
  add(ref, "index.html");
}
for (const m of html.matchAll(/href="(#[\w-]+)"/g)) {
  const id = m[1].slice(1);
  if (!new RegExp(`id="${id}"`).test(html)) errors.push(`锚点 #${id} 没有对应元素`);
}
/* <use href="#i-xxx"> 必须有对应 <symbol id="i-xxx"> */
for (const m of html.matchAll(/use href="#([\w-]+)"/g)) {
  if (!new RegExp(`symbol id="${m[1]}"`).test(html)) errors.push(`图标 ${m[1]} 未定义`);
}
/* app.js 里用到的 icon id */
const app = read("app.js");
for (const m of app.matchAll(/icon\("([\w-]+)"\)/g)) {
  if (!new RegExp(`symbol id="${m[1]}"`).test(html)) errors.push(`app.js 引用了未定义图标 ${m[1]}`);
}

/* 社交分享图：og:image 写的是绝对地址，上面的引用扫描抓不到，单独验一次 */
const og = html.match(/<meta property="og:image" content="([^"]+)"/);
if (!og) {
  errors.push("缺少 og:image（分享到微信/微博时没有大图）");
} else {
  const ogRel = og[1].replace(/^https?:\/\/[^/]+\/tiga\//, "");
  if (!exists(ogRel)) errors.push(`og:image 指向的文件不存在: ${ogRel}`);
  else if (sizeOf(ogRel) > 300 * 1024) errors.push(`og:image 过大: ${mb(sizeOf(ogRel))}（应 < 300KB）`);
}

/* ── 存在性 + 体积 ──────────────────────────────────────────────────────── */
let totalImg = 0;
let totalVid = 0;
let totalPrev = 0;
let missing = 0;
for (const r of refs) {
  if (!exists(r.path)) {
    missing++;
    errors.push(`缺失文件: ${r.path}  (${r.what})`);
    continue;
  }
  const s = sizeOf(r.path);
  if (r.path.startsWith("images/web/800/")) totalImg += s;
  else if (r.path.startsWith("videos/web/preview/")) totalPrev += s;
  else if (r.path.startsWith("videos/web/")) totalVid += s;
}

/* ── 图片健康检查：只看头 32 字节，防止 0 字节 / 半截文件混进来 ────────── */
function headBytes(p, n) {
  const fd = fs.openSync(path.join(ROOT, p), "r");
  const buf = Buffer.alloc(n);
  fs.readSync(fd, buf, 0, n, 0);
  fs.closeSync(fd);
  return buf;
}
for (const r of refs) {
  if (!exists(r.path) || !/\.(webp|png|jpe?g)$/i.test(r.path)) continue;
  const size = sizeOf(r.path);
  const head = headBytes(r.path, 32);
  if (size < 1024) {
    errors.push(`图片过小，疑似空文件: ${r.path} (${size}B)`);
    continue;
  }
  if (r.path.toLowerCase().endsWith(".webp")) {
    const ok = head.toString("ascii", 0, 4) === "RIFF" && head.toString("ascii", 8, 12) === "WEBP";
    if (!ok) errors.push(`图片损坏（不是有效 webp）: ${r.path}`);
  }
  if (r.path.toLowerCase().endsWith(".png")) {
    const ok = head[0] === 0x89 && head.toString("ascii", 1, 4) === "PNG";
    if (!ok) errors.push(`图片损坏（不是有效 png）: ${r.path}`);
  }
  if (r.path.toLowerCase().endsWith(".jpg") || r.path.toLowerCase().endsWith(".jpeg")) {
    const ok = head[0] === 0xff && head[1] === 0xd8;
    if (!ok) errors.push(`图片损坏（不是有效 jpg）: ${r.path}`);
  }
}

/* ── 首屏负载 ───────────────────────────────────────────────────────────── */
const firstPaint = [
  "index.html",
  "styles.css",
  "content.js",
  "app.js",
  "assets/favicon.svg",
  "images/web/1600/hero-porsche-cut.webp",
  "videos/hero/slide-porsche-cut.mp4"
];
let firstBytes = 0;
for (const p of firstPaint) {
  const s = sizeOf(p);
  if (!s) errors.push(`首屏文件缺失: ${p}`);
  firstBytes += s;
}

/* ── 报告 ───────────────────────────────────────────────────────────────── */
const biggest = refs
  .map((r) => ({ path: r.path, size: sizeOf(r.path) }))
  .sort((a, b) => b.size - a.size)
  .slice(0, 8);

console.log("=== TIGA SITE AUDIT ===");
console.log(`作品: ${P.works.length} 条 | 图集: ${Object.values(P.collections).map((c) => c.items.length).join(" / ")} 张`);
console.log(`被引用文件: ${refs.length} | 缺失: ${missing}`);
console.log(`首屏负载(未压缩): ${kb(firstBytes)}`);
console.log(`封面合计: ${mb(totalImg)} | 播放版视频合计: ${mb(totalVid)} | 预览小样合计: ${mb(totalPrev)}`);
console.log("最大文件:");
for (const b of biggest) console.log(`  ${mb(b.size).padStart(9)}  ${b.path}`);

const videoFiles = refs.filter((r) => r.path.startsWith("videos/web/") && !r.path.includes("/preview/"));
const budgets = [
  ["首屏 < 3.5MB（含 2.3MB 首屏视频）", firstBytes < 3.5 * 1024 * 1024],
  ["首页文字资源 < 600KB", ["index.html", "styles.css", "content.js", "app.js"].reduce((n, p) => n + sizeOf(p), 0) < 600 * 1024],
  ["封面合计 < 25MB", totalImg < 25 * 1024 * 1024],
  ["预览小样合计 < 6MB", totalPrev < 6 * 1024 * 1024],
  ["播放版合计 < 320MB（成片为完整长度）", totalVid < 320 * 1024 * 1024],
  ["单条播放版 < 45MB", videoFiles.every((r) => sizeOf(r.path) < 45 * 1024 * 1024)],
  ["无缺失引用", missing === 0],
  ["无数据错误", errors.filter((e) => !e.startsWith("缺失文件")).length === 0]
];
console.log("\n预算检查:");
let failed = 0;
for (const [label, ok] of budgets) {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failed++;
}
if (errors.length) {
  console.log("\n问题清单:");
  errors.slice(0, 40).forEach((e) => console.log("  - " + e));
  if (errors.length > 40) console.log(`  ... 另有 ${errors.length - 40} 条`);
}
console.log(`\n结果: ${failed === 0 && errors.length === 0 ? "全部通过" : `${failed} 项预算未通过 / ${errors.length} 个问题`}`);
process.exit(failed === 0 && errors.length === 0 ? 0 : 1);
