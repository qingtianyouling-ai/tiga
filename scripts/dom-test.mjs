/* ============================================================================
   dom-test.mjs — 用 jsdom 真跑一遍页面脚本，断言结构、筛选、弹层与无障碍
   依赖：.tmp/node_modules/jsdom（npm i --prefix .tmp jsdom）
   用法：node scripts/dom-test.mjs
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require(path.join(ROOT, ".tmp", "node_modules", "jsdom"));

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const contentJs = fs.readFileSync(path.join(ROOT, "content.js"), "utf8");
const appJs = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

const problems = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => problems.push("jsdomError: " + e.message));
vc.on("error", (...a) => problems.push("console.error: " + a.join(" ")));

const dom = new JSDOM(html, {
  url: "https://example.test/tiga/",
  runScripts: "outside-only",
  pretendToBeVisual: true,
  virtualConsole: vc,
});
const { window } = dom;

window.matchMedia = (q) => ({
  matches: /hover: hover/.test(q),
  media: q,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
});
class IO {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ isIntersecting: true, target: el }], this); }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IO;
window.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); };
window.HTMLMediaElement.prototype.pause = function () {};
window.HTMLMediaElement.prototype.load = function () {};
window.Element.prototype.scrollIntoView = function () {};

const results = [];
function check(name, fn) {
  try {
    results.push([true, name, fn() || ""]);
  } catch (err) {
    results.push([false, name, err.message]);
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

try {
  window.eval(contentJs);
  window.eval(appJs);
} catch (err) {
  problems.push("脚本执行异常: " + err.message);
}

const doc = window.document;
const $ = (s) => doc.querySelector(s);
const $$ = (s) => Array.from(doc.querySelectorAll(s));
const P = window.portfolio;
const titles = (sel) => $$(sel + " .work-title").map((n) => n.textContent);

/* ── 数据 ─────────────────────────────────────────────────────────────── */
check("数据：45 条 = 25 视频 + 20 平面，刺绣与模型已删", () => {
  assert(P && P.works.length === 45, `作品数应为 45，实际 ${P && P.works.length}`);
  const video = P.works.filter((w) => !!w.video);
  const still = P.works.filter((w) => !w.video);
  assert(video.length === 25, `视频应为 25，实际 ${video.length}`);
  assert(still.length === 20, `平面应为 20，实际 ${still.length}`);
  assert(!P.works.some((w) => /yuanxiang|刺绣|Mom deserve/i.test(w.video + w.title)), "刺绣两条应已移除");
  assert(!P.works.some((w) => w.id === "poster-05" || w.id === "poster-06" || w.id === "poster-07"), "模型三条应已移除");
  assert(P.collections.brand.items.length === 54 && P.collections.cultural.items.length === 15, "图集数量不对");
  const noPreview = video.filter((w) => !w.preview);
  assert(noPreview.length === 0, `缺预览：${noPreview.map((w) => w.id).join(",")}`);
  return "25 视频 / 20 平面";
});

check("作品板块筛选按钮按分类顺序生成", () => {
  const chips = $$("#workFilters .filter").map((c) => c.textContent);
  assert(chips.join("/") === "全部/商业广告/微电影/创意短片/纪实活动", `实际：${chips.join("/")}`);
  const gchips = $$("#graphicFilters .filter").map((c) => c.textContent);
  assert(gchips.join("/") === "全部/平面摄影/风光纪实/版式设计/品牌 VI/重阳节主题", `实际：${gchips.join("/")}`);
  return `${chips.length} + ${gchips.length} 个`;
});

check("作品板块首屏只露 10 个 + 展开按钮", () => {
  assert($$("#workGrid .work-card").length === 10, `应为 10，实际 ${$$("#workGrid .work-card").length}`);
  const btn = $("#workExpand");
  assert(btn && btn.hidden === false, "展开按钮应可见");
  assert(btn.textContent.includes("15"), `应提示还剩 15 件，实际「${btn.textContent}」`);
  return btn.textContent;
});

check("点展开 → 25 个，按钮隐藏，焦点交给第一张新卡片", () => {
  $("#workExpand").click();
  assert($$("#workGrid .work-card").length === 25, `应为 25，实际 ${$$("#workGrid .work-card").length}`);
  assert($("#workExpand").hidden === true, "展开后按钮应隐藏");
  assert($("#workCount").textContent === "25 Projects", `计数不对：${$("#workCount").textContent}`);
  const cards = $$("#workGrid .work-trigger");
  assert(doc.activeElement === cards[10], "键盘展开后焦点应落到第 11 张（第一张新增）");
  return $("#workCount").textContent + " · 焦点 → 第 11 张";
});

check("计数变化对读屏可感知（aria-live）", () => {
  const a = $("#workCount").getAttribute("aria-live");
  const b = $("#graphicCount").getAttribute("aria-live");
  assert(a === "polite" && b === "polite", `实际：${a} / ${b}`);
  return "polite ×2";
});

check("年份：前六条 2026，其余 2025", () => {
  const cards = $$("#workGrid .work-card");
  const y = (i) => (cards[i].querySelector(".work-year") || {}).textContent;
  assert(y(0) === "2026", `第 1 张应为 2026，实际 ${y(0)}`);
  assert(y(5) === "2026", `第 6 张应为 2026，实际 ${y(5)}`);
  assert(y(6) === "2025", `第 7 张应为 2025，实际 ${y(6)}`);
  assert(y(cards.length - 1) === "2025", `末张应为 2025，实际 ${y(cards.length - 1)}`);
  const years = cards.map((c, i) => y(i));
  assert(years.filter((x) => x === "2026").length === 6, "2026 应正好 6 条");
  return "2026 ×6 ｜ 2025 ×19";
});

check("商业广告排序：保时捷 → 苹果 18 → 苹果 Duo → 舍得酒", () => {
  $$("#workFilters .filter").find((c) => c.textContent === "商业广告").click();
  const t = titles("#workGrid");
  const expect = [
    "保时捷 Taycan Turbo GT · 汽车概念影像",
    "iPhone 18 Pro · 产品概念 TVC",
    "iPhone Duo · 双机概念 TVC",
    "舍得酒 · 水墨品牌短片",
    "扫地机器人 · TVC 广告",
    "HPC 显示器 · TVC 广告"
  ];
  assert(t.join("|") === expect.join("|"), `实际：${t.join(" | ")}`);
  return t.slice(0, 4).join(" → ");
});

check("卡片三行文案：标题 / 规格 / 职责", () => {
  const card = $$("#workGrid .work-card")[0];
  const sub = card.querySelector(".work-sub");
  const roles = card.querySelector(".work-roles");
  assert(sub, "应有第二行规格");
  assert(sub.textContent === "AI 商业产品广告 · 0:30", `规格不对：${sub.textContent}`);
  assert(roles.textContent.includes(" / "), `职责应用斜杠分隔：${roles.textContent}`);
  assert(roles.textContent.includes("AI 概念生成"), `职责不对：${roles.textContent}`);
  return `${sub.textContent} ｜ ${roles.textContent}`;
});

check("微电影筛选 → 2 张，计数 2 / 25", () => {
  $$("#workFilters .filter").find((c) => c.textContent === "微电影").click();
  assert($$("#workGrid .work-card").length === 2, "应为 2 张");
  assert($("#workCount").textContent === "2 / 25 Projects", `计数不对：${$("#workCount").textContent}`);
  return $("#workCount").textContent;
});

check("摄影平面：标题 + 首屏 10 张 + 展开按钮", () => {
  assert($("#graphic .work-heading").textContent.trim() === "摄影平面。", "标题应为「摄影平面。」");
  assert($$("#graphicGrid .work-card").length === 10, `应为 10 张，实际 ${$$("#graphicGrid .work-card").length}`);
  const btn = $("#graphicExpand");
  assert(btn && btn.hidden === false, "展开按钮应可见");
  assert(btn.textContent.includes("10"), `应提示还剩 10 件，实际「${btn.textContent}」`);
  assert($("#graphicCount").textContent === "20 Works", `计数不对：${$("#graphicCount").textContent}`);
  return btn.textContent;
});

check("展开 → 20 张，顺序 极氪 → 风光 → 版式", () => {
  $("#graphicExpand").click();
  assert($$("#graphicGrid .work-card").length === 20, `应为 20，实际 ${$$("#graphicGrid .work-card").length}`);
  assert($("#graphicExpand").hidden === true, "展开后按钮应隐藏");
  const t = titles("#graphicGrid");
  const head = [
    "极氪冬日咖啡 · 产品静物",
    "极氪咖啡 · 产品静物",
    "极氪联名杯子 · 联名产品",
    "极氪联名饮料 · 联名产品",
    "DJI · 航拍视角",
    "城中镜 · 城市倒影",
    "夜春笋 · 城市夜景",
    "惬意人生 · 生活切片",
    "海与陆 · 海岸线",
    "舟游 · 水上行舟"
  ];
  assert(t.slice(0, 10).join("|") === head.join("|"), `前十张顺序不对：${t.slice(0, 10).join(" | ")}`);
  assert(t[3] === "极氪联名饮料 · 联名产品" && t[4] === "DJI · 航拍视角", "极氪之后应直接接风光");
  assert(t[11] === "黄昏摩天轮 · 城市天际线", `第 12 张应为最后一张风光，实际 ${t[11]}`);
  assert(t[12] === "中国武侠风场景 · 场景视觉", `第 13 张应为版式，实际 ${t[12]}`);
  assert(t[t.length - 1] === "重阳节主题 · 展板 + 海报 + 文创", `末张不对：${t[t.length - 1]}`);
  assert(!t.some((x) => x.startsWith("模型")), "模型照片应已移除");
  return `${t[0]} → ${t[4]} → ${t[12]} → ${t[t.length - 1]}`;
});

/* ── 弹层 ─────────────────────────────────────────────────────────────── */
check("平面板块打开图集弹层（15 张缩略图）", () => {
  const cards = $$("#graphicGrid .work-card");
  cards[cards.length - 1].querySelector(".work-trigger").click();
  const dialog = $("#dialog");
  assert(dialog.classList.contains("is-open"), "弹层应打开");
  assert($("#dialogTitle").textContent.startsWith("重阳节主题"), `标题不对：${$("#dialogTitle").textContent}`);
  assert($$("#dialog .gallery-thumb").length === 15, "缩略图应为 15");
  assert(doc.activeElement === $("#dialogClose"), "焦点应在关闭按钮");
  return "15 张";
});

check("Esc 关闭弹层并还原焦点", () => {
  const opener = $$("#graphicGrid .work-card").pop().querySelector(".work-trigger");
  doc.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  assert(!$("#dialog").classList.contains("is-open"), "应关闭");
  assert(doc.activeElement === opener, "焦点应回到触发按钮");
  return "closed";
});

check("作品板块打开视频弹层（静音起播 + 声音开关）", () => {
  $$("#workFilters .filter").find((c) => c.textContent === "纪实活动").click();
  $$("#workGrid .work-trigger")[0].click();
  const v = $("#dialog video");
  assert(v, "应渲染 video");
  assert(v.hasAttribute("muted"), "应静音起播");
  assert(($("#dialogFacts").textContent || "").includes("职责"), "应显示职责");
  const audio = $("#dialog .dialog-audio");
  assert(audio, "应有声音开关");
  audio.click();
  assert(audio.getAttribute("aria-pressed") === "true", "应切到有声");
  $("#dialogClose").click();
  return v.getAttribute("src");
});

/* ── 其余板块 ─────────────────────────────────────────────────────────── */
check("移动端菜单 aria 状态翻转", () => {
  const btn = $("#navToggle");
  assert(btn.getAttribute("aria-expanded") === "false", "初始应为 false");
  btn.click();
  assert(btn.getAttribute("aria-expanded") === "true", "点击后应为 true");
  btn.click();
  assert(btn.getAttribute("aria-expanded") === "false", "再点应回到 false");
  return "ok";
});

check("导航只有 作品 / 平面 / 联系，且锚点都存在", () => {
  const navs = $$("[data-nav]").map((a) => a.getAttribute("data-nav"));
  assert(navs.join("/") === "work/graphic/contact", `实际：${navs.join("/")}`);
  navs.forEach((id) => assert(doc.getElementById(id), `#${id} 板块应存在`));
  assert(!$("#about") && !$("#platform"), "关于与平台运营应已删除");
  return navs.join(" / ");
});

check("移动端菜单与桌面导航同序同项（含平面）", () => {
  const desk = $$("[data-nav]").map((a) => a.getAttribute("data-nav"));
  const mob = $$("#mobileNav a").map((a) => a.getAttribute("href").slice(1));
  assert(mob.join("/") === desk.join("/"), `移动端：${mob.join("/")} ≠ 桌面：${desk.join("/")}`);
  return mob.join(" / ");
});

check("联系区 4 行，都是 .contact-links 的直接子元素", () => {
  const rows = $$(".contact-links > *");
  assert(rows.length === 4, `应为 4 行（Email/Phone/WeChat/Douyin），实际 ${rows.length}`);
  const nested = $$(".contact-links > * > div").length;
  assert(nested === 4, `每行应只有一个内容块，实际 ${nested}`);
  return rows.map((r) => (r.querySelector(".k") || {}).textContent).join(" / ");
});

check("所有卡片都有可读名称与封面", () => {
  const cards = $$("#workGrid .work-card").concat($$("#graphicGrid .work-card"));
  const bad = cards.filter((c) => {
    const btn = c.querySelector(".work-trigger");
    const img = c.querySelector("img");
    return !btn.getAttribute("aria-label") || !img.getAttribute("alt") || !img.getAttribute("src");
  });
  assert(bad.length === 0, `${bad.length} 张卡缺 aria-label / alt / src`);
  const lazy = cards.every((c) => c.querySelector("img").getAttribute("loading") === "lazy");
  assert(lazy, "封面应全部 lazy");
  return `${cards.length} 张`;
});

/* ── Hero ─────────────────────────────────────────────────────────────── */
check("Hero：三镜头 + 01/02/03 编号", () => {
  const slides = $$(".hero-slide");
  assert(slides.length === 3, `应有 3 个镜头，实际 ${slides.length}`);
  const dots = $$(".hero-dot");
  assert(dots.length === 3, `应有 3 个编号，实际 ${dots.length}`);
  assert(dots.map((d) => d.textContent.trim()).join("/") === "01/02/03", "编号不对");
  return dots.map((d) => d.textContent.trim()).join(" / ");
});

check("Hero：每个镜头都有封面、静音与懒加载地址", () => {
  const vids = $$(".hero-video");
  assert(vids.length === 3, "应有 3 个视频层");
  vids.forEach((v, i) => {
    assert(v.hasAttribute("muted") && v.hasAttribute("loop") && v.hasAttribute("playsinline"), `第 ${i + 1} 个缺属性`);
    assert(v.getAttribute("poster"), `第 ${i + 1} 个缺封面`);
    assert(v.getAttribute("data-src"), `第 ${i + 1} 个缺 data-src`);
  });
  assert(vids[0].getAttribute("data-src") === "videos/hero/slide-porsche-cut.mp4", "首镜应为保时捷四镜剪辑");
  return vids.map((v) => v.getAttribute("poster").split("/").pop()).join(", ");
});

check("Hero：点 03 切到舍得酒并同步作品名", () => {
  const dots = $$(".hero-dot");
  dots[2].click();
  assert($$(".hero-slide")[2].classList.contains("is-active"), "第 3 镜应激活");
  assert(dots[2].getAttribute("aria-pressed") === "true", "第 3 个应选中");
  assert($("#heroNow").textContent.includes("舍得酒"), "作品名未同步");
  dots[0].click();
  return $("#heroNow").textContent;
});

check("Hero：暂停按钮切换", () => {
  const btn = $("#motionToggle");
  assert(btn.getAttribute("aria-pressed") === "false", "初始应播放中");
  btn.click();
  assert(btn.getAttribute("aria-pressed") === "true", "应标记暂停");
  btn.click();
  assert(btn.getAttribute("aria-pressed") === "false", "应恢复");
  return btn.textContent.trim();
});

check("Hero：下滑引导 + 滚动淡出已接线", () => {
  const cue = $(".hero-cue");
  assert(cue && cue.getAttribute("href") === "#work", "引导应指向作品");
  assert(cue.textContent.includes("下滑看作品"), "引导文案不对");
  const flatCss = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8").replace(/\s+/g, "");
  assert(flatCss.includes("opacity:calc(1-var(--hp)"), "缺 --hp 淡出样式");
  assert(appJs.includes('setProperty("--hp"'), "app.js 没写 --hp");
  return "cue → #work";
});

/* ── About / 标题区 ───────────────────────────────────────────────────── */
check("作品区：主标题独立，说明降为右侧小字", () => {
  const note = $(".work-note");
  assert(note && note.textContent.trim() === "每一件，都有我参与的环节。", "右侧小字不对");
  assert(!$(".work-heading").textContent.includes("每一件"), "主标题不该含这句");
  return note.textContent.trim();
});

/* ── 输出 ─────────────────────────────────────────────────────────────── */
let failed = 0;
console.log("=== DOM / 交互测试 ===");
for (const [ok, name, detail] of results) {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  → " + detail : ""}`);
}
if (problems.length) {
  console.log("\n运行时问题:");
  [...new Set(problems)].slice(0, 12).forEach((p) => console.log("  - " + p));
}
console.log(`\n结果: ${results.length - failed}/${results.length} 通过${problems.length ? `，${problems.length} 条运行时问题` : "，无运行时错误"}`);
process.exit(failed === 0 && problems.length === 0 ? 0 : 1);
