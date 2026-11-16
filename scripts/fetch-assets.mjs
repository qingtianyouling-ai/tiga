// 拉取 qingtianyouling-ai/tiga 的母版素材到工作区（git/curl 被 TLS 拦截，只能用 Node fetch）
import fs from "node:fs";
import path from "node:path";

const REPO = "qingtianyouling-ai/tiga";
const BRANCH = "main";
const ROOT = process.cwd();
const CONCURRENCY = 5;

const treeRes = await fetch(
  `https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`,
  { headers: { "user-agent": "dsh-fetch", accept: "application/vnd.github+json" } }
);
if (!treeRes.ok) throw new Error(`tree ${treeRes.status}`);
const tree = (await treeRes.json()).tree;

const wanted = tree.filter(
  (e) => e.type === "blob" && (e.path.startsWith("images/") || e.path.startsWith("videos/") || e.path === "index.html")
);
console.log(`files to fetch: ${wanted.length}`);

const queue = [...wanted];
let done = 0;
let bytes = 0;
const failures = [];

async function worker(id) {
  while (queue.length) {
    const item = queue.shift();
    const dest = path.join(ROOT, item.path);
    if (fs.existsSync(dest) && fs.statSync(dest).size === item.size) {
      done++;
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path.split("/").map(encodeURIComponent).join("/")}`;
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        const res = await fetch(url, { headers: { "user-agent": "dsh-fetch" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        bytes += buf.length;
        ok = true;
      } catch (err) {
        if (attempt === 3) failures.push(`${item.path}: ${err.message}`);
        else await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
    done++;
    if (done % 10 === 0 || done === wanted.length) {
      console.log(`[${done}/${wanted.length}] ${(bytes / 1048576).toFixed(1)} MB`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
console.log(`DONE. downloaded ${(bytes / 1048576).toFixed(1)} MB, failures: ${failures.length}`);
if (failures.length) console.log(failures.join("\n"));
