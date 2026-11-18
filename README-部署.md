# Tiga · 冼正 个人作品集 —— 改造说明与发布指南

参考站：<https://ctlasdm.studioslate.cn>（张皓 · 摄像/后期/AI 影像）
线上站：<https://qingtianyouling-ai.github.io/tiga/>

---

## 1. 这次改了什么

| 维度 | 改造前 | 改造后 |
| --- | --- | --- |
| 结构 | 单个 96KB `index.html`，CSS/JS/内容全塞在里面 | `index.html`（骨架）+ `styles.css` + `content.js`（数据）+ `app.js`（交互） |
| 视觉 | 亮色 + 黑底夹层、居中大标题、emoji 图标 | 深色 `#101010` 编辑式排版、编号章节 `01—03`、1px 分割线、SVG 图标 |
| 浏览作品 | 每类一次只能看 1 条，35 条要点箭头翻 | 拆成两个板块：**作品（视频 25 件，首屏 10 件 + 展开更多）**、**摄影平面（8 件风光）**；卡片三行文案（名称·片种 / 品类·规格 / 职责）；各自独立筛选、悬停静音预览、点击进详情弹层 |
| 图集 | 54 页 VI 与重阳节塞进同一个轮播 DOM | 曾收成 2 个"图集"作品；2026-11-17 按用户要求删除，站点只留 极氪 4 + 风光 8 |
| 首图 | 无 | **三条精选镜头接力**：① 小米 SU7《自在而行》② 雷鸟眼镜 iO《不同的眼光》③ 舍得酒大师勾调；每条 7 秒、**一条播完接一条**、淡入不淡黑；右下角 01/02/03 手动切换 + 暂停；文字居中（巨型两行拉丁名 + 中文名 + 方向 + 圆形箭头按钮）；「下滑看作品」引导；滚动时整块文字上移淡出 |
| 人物照 | 关于区一张头像照 | 已移除，关于区改为纯文字排版（左大标题、右事实清单） |
| 素材体积 | 图片 105.1MB、单图最大 10.5MB | 封面 webp 合计 3.34MB、详情图 7.92MB；图集原图按需加载 |
| 首屏负载 | 96KB HTML + 未压缩大图 | 文字+封面 **167KB**（文字 gzip 后 21.4KB），首屏只加载第 1 条 2.33MB，另两条在轮播到时才加载（1.04MB / 1.68MB） |
| 视频 | 22 条直出，含 3 条 HEVC（Chrome 放不了） | **25 条**：HEVC 转 H.264，其余用原片；全部 `preload="none"` + 封面；5 秒静音预览小样；弹层静音起播 + 一键开声音 |
| 数据看板 | 未滚动到就永远是 `0`，`100W+` 格式不一致 | HTML 里就写好终值，进视口才从 0 动画，统一 `2万+ / 15万+ / 100万+ / 200+` |
| 缺陷 | 重阳节海报点击报 `ReferenceError`；`commercial` 数据键重复；空状态与轮播同时可见；两个全局 ←/→ 监听互相打架 | 全部消除（事件委托、单一数据源、单一键盘监听） |
| 无障碍 | 无 skip-link、无焦点陷阱、无 `prefers-reduced-motion` | skip-link、`role="dialog"` + 焦点陷阱 + 焦点归还、`aria-expanded/pressed/current`、降级动效、关闭态不可聚焦 |
| SEO/分享 | 无 favicon、无 og | SVG favicon、og:title/description/image（1200×630 分享大图 `assets/og.jpg`）、twitter card、theme-color、canonical |
| 简历 | 无 | `documents/resume.pdf` 存在仓库里，但**页面已不放下载按钮**（简历随投递单独附上，避免和作品集重复） |

---

## 2. 目录

```
index.html              页面骨架（联系我等文案在这里改）
styles.css              设计系统与全部样式
content.js              ★ 作品数据（39 条作品）
app.js                  渲染与交互
assets/favicon.svg      站点图标
images/works/           图片母版（原封不动）
images/web/800/         卡片封面与缩略图（webp，页面用这个）
images/web/1600/        详情大图（webp）+ 首屏封面 hero-xiaomi / hero-rayneo / hero-shede.webp
videos/                 视频母版（除 3 条 HEVC 外，页面直接引用）
videos/hero/            首屏三镜：slide-xiaomi / slide-rayneo / slide-shede（各约 2MB）+ mobile 版
videos/web/             可直接播放的 H.264 版（3 条 HEVC 转换 + 5 条新增作品的网页压版）
videos/web/preview/     27 条 5 秒静音预览
documents/resume.pdf    简历原件（页面不再链接，随投递单独附上）
scripts/                构建与自检脚本
_backup/index-2026-10-24.html   改造前的整站原文件（回滚用）
```

---

## 3. 本地预览

**推荐：本地预览服务（带热重载）**

```powershell
node scripts/serve.mjs          # 打开 http://127.0.0.1:5188/
```

- 支持视频拖动进度条（Range）、PDF 直读；
- 我改完任何文件，你打开的页面会**自动刷新**，不用手动刷；
- 只在本机预览时注入这段脚本，上线文件不受影响。

也可以直接双击 `index.html`（`file://` 可用，页面不依赖接口），或：

```powershell
npx serve .
```

---

## 4. 发布到 GitHub Pages（3 步）

1. 把本目录内容覆盖到本地 `tiga` 仓库根目录（保留 `.git` 文件夹）。
2. 提交并推送：

   ```powershell
   git add -A
   git commit -m "redesign: dark editorial portfolio, web-optimized assets, resume PDF"
   git push origin main
   ```

3. 等 1–2 分钟后强刷 <https://qingtianyouling-ai.github.io/tiga/>（`Ctrl+F5`）。

> 不想用命令行：用 GitHub Desktop 打开仓库 → 会列出所有改动 → `Commit to main` → `Push origin`。
> 网页上传也可以，但 279 个文件请用 Desktop 或命令行，网页上传会非常慢。

**⚠️ 推送量提醒**：本次新增约 21MB（webp 封面/详情图、3 条转码视频、预览小样、简历）。
GitHub Pages 建议仓库 <1GB，当前总量约 386MB，仍在安全范围内。

---

## 5. 以后怎么加作品

1. 把图片放进 `images/works/`，视频放进 `videos/`（名字随意，中文也可以）。
2. 在仓库根目录跑一次素材构建（会跳过已存在的）：

   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/build-assets.ps1
   ```

3. 打开 `content.js`，在 `works` 数组里照着现有格式加一条：

   ```js
   { id: "event-13", cat: "event", title: "作品名", desc: "一句话说明",
     video: V + "新视频.mp4", preview: PV + "新视频.mp4",
     poster: M + "新封面.webp", full: F + "新封面.webp" },
   ```

   - `cat` 只能是 `event / microfilm / creative / commercial / landscape / poster / layout / brand / cultural` 之一，筛选项按分类在数组里出现的顺序自动生成。
   - 不写 `roles` 就套用该分类的默认职责（`DEFAULT_ROLES`）。
   - 想调整默认职责，直接改 `DEFAULT_ROLES`。
   - **板块归属由数据决定**：带 `video` 字段的进「作品」板块，不带的（图片 / 图集）进「平面」板块。
   - **页面顺序 = 数组顺序**（不是按 `cat` 自动排）；想调先后，直接挪那一行。
   - 作品板块首屏露 10 件，其余进「展开更多」；改阈值在 `app.js` 的 `buildGallery({ initial: 10 })`（摄影平面同样 10）。

4. **封面**（16:9，页面统一裁切显示）：
   - 你有现成封面就放 `images/works/`，跑一次 `build-assets.ps1` 会自动出 800/1600 两档 webp。
   - **竖构图 / 方图别硬塞 16:9**，跑一次模糊底脚本，会生成 `cover-xxx.webp`（完整画面居中 + 虚化背景）：

     ```powershell
     & "C:\Users\Administrator\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe" scripts/make-covers.py
     ```

     （要新增条目，改脚本里 `COVERS` 那张表；生成后把 `content.js` 里那条的 `poster` 指向 `cover-xxx.webp`，`full` 保持原图。）
   - 没有封面时从视频抽一帧当封面：

     ```powershell
     ffmpeg -y -ss 5 -i "videos/新视频.mp4" -frames:v 1 -vf "scale=w='min(1600,iw)':h='min(900,ih)':force_original_aspect_ratio=decrease" `
       -c:v libwebp -quality 82 images/web/1600/cover-新片名.webp
     ```

   - **竖屏视频**别硬裁，用模糊底填充成 16:9（不裁掉画面内容）：

     ```powershell
     ffmpeg -y -ss 5 -i "videos/竖屏.mp4" -frames:v 1 -filter_complex `
       "[0:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,gblur=sigma=30,eq=brightness=-0.05[b];[0:v]scale=-2:900[f];[b][f]overlay=(W-w)/2:(H-h)/2" `
       -c:v libwebp -quality 82 images/web/1600/cover-新片名.webp
     ```

   - 万一某张封面漏了或路径写错，卡片会先退回同名大图，再不行显示标题占位，不会出现空白框；`scripts/audit.mjs` 也会检查 webp/png/jpg 文件头和体积，坏图直接报错。
   - **坑**：个别 PNG 其实是 APNG（内嵌多帧），ffmpeg 会报 `Invalid PNG signature` 并留下 0 字节文件。遇到就把那张原图交给 `scripts/make-covers.py`（Pillow 只取首帧），别用 ffmpeg 转。

5. 跑一次自检（可选但推荐）：`node scripts/audit.mjs`

---

## 6. 改文案 / 改联系方

- 联系方式在 `index.html` 的 `03 Contact` 一段；关于我、平台运营两块已整段删除（2026-11-17 用户要求）。
- 微信一行现在是 `Pareght`（原样保留），如果那不是微信号，改 `index.html` 里 `WeChat` 那行即可。

---

## 7. 首屏轮播怎么换镜头 / 重新生成简历

首屏是 3 条无声片，每条 **7 秒**，**一条播完接一条**（监听 `ended`，9 秒兜底）：
小米 SU7 沙漠车身（`slide-xiaomi.mp4`，源片 14.5–21.5s）
→ 雷鸟眼镜光轨段（`slide-rayneo.mp4`，源片 17–24s）
→ 舍得酒大师勾调（`slide-shede.mp4`，源片 16–23s）。
`<video>` 上**不能加 `loop`**，否则 `ended` 不触发、接不上。
原始的黄昏车尾片段留在 `_backup/hero-dusk/`，想换回来搬回 `videos/hero/` 即可。

**换 / 加镜头三步**：

1. 剪一条 8 秒、无声、faststart 的 mp4 放进 `videos/hero/`：

   ```powershell
   ffmpeg -y -ss 22.2 -t 8 -i "D:\my rice bowl\保时捷taycan turbo gt.mp4" -an `
     -vf "fade=t=in:st=0:d=0.5,fade=t=out:st=7.5:d=0.5,scale=1920:1080:flags=lanczos" `
     -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart `
     videos/hero/slide-新镜头.mp4
   ```

2. 抽一帧当封面（1600 与 800 两档）：

   ```powershell
   ffmpeg -y -ss 4 -i videos/hero/slide-新镜头.mp4 -frames:v 1 -vf "scale=1600:-2" `
     -c:v libwebp -quality 82 images/web/1600/hero-新镜头.webp
   ffmpeg -y -ss 4 -i videos/hero/slide-新镜头.mp4 -frames:v 1 -vf "scale=800:-2" `
     -c:v libwebp -quality 80 images/web/800/hero-新镜头.webp
   ```

3. 在 `index.html` 的 `.hero-media` 里复制一段 `.hero-slide`，改 `poster` / `data-src`（移动端另有 `data-src-mobile`），
   再在 `.hero-dots` 里加一个 `<button class="hero-dot" data-slide="3">04</button>`。
   - 镜头名（右下角显示的文字）在 `app.js` 的 `HERO_NAMES` 数组里，按顺序加一项即可。
   - 切换间隔改 `HERO_INTERVAL`（默认 8000ms）。
   - `.hero-slide--light` 这个 class 用于偏亮画面（如舍得酒），会把视频再压暗一点，保证白字可读。
   - 首屏第 1 镜的封面同时写在 `index.html` 的 `<link rel="preload">` 与 `styles.css` 的 `.hero-media` 背景里。

**简历**：站点**不再链接**简历（作品集连同简历一起投递，页面上重复出现内容已删）。`documents/resume.pdf` 只是仓库里的备份，换简历直接覆盖这个文件即可，不用改代码。

我早先生成的深色版简历保留在 `_backup/resume-generated-2026-10-24.pdf`，脚本 `scripts/build-resume.py` 默认只输出到 `_backup/`，不会覆盖你的文件（真要覆盖加 `--overwrite-site`）。

---

## 8. 自检脚本

```powershell
node scripts/audit.mjs      # 引用完整性 + 体积预算（当前：全部通过）
node scripts/dom-test.mjs   # jsdom 真跑页面：45 件作品、双板块筛选与展开、弹层与 Esc、焦点、导航（桌面+移动）、联系区、Hero（25/25 通过）
```

`dom-test.mjs` 依赖 `.tmp/node_modules/jsdom`（已装好；`.tmp/` 不进仓库）。
换机器后先跑：`npm install --prefix .tmp jsdom`

---

## 9. 回滚

改造前的整站原文件在 `_backup/index-2026-10-24.html`。
把 `index.html` 改名备份，再把该文件复制成 `index.html` 即可回到旧版（旧版依赖 `images/works` 与 `videos` 原名文件，都还在）。

---

## 10. 已知限制

1. 本机沙箱挡住了 git/curl 的外网访问与无头 Chrome，所以**我无法代你推送、也无法出浏览器截图**；页面已用 jsdom 做过结构与交互验证，视觉请你在本地打开确认。
2. 长片（《罪饿》32MB、《青春的底色》29MB 等）是完整正片，用 `preload="none"` + faststart 边播边下，不会一进页面就下载。
3. 抖音/小红书的数据与链接沿用你原来的内容，未做抓取核实；2026-11-17 起抖音链接已从站点删除。
4. 本轮从 `D:\my rice bowl` 补进来的作品（保时捷 Taycan、iPhone 18 Pro、iPhone Duo）用的是**文件名当标题**、职责套用「商业广告」默认值，请确认叫法与职责，直接在 `content.js` 里改。垣象科技那两条刺绣视频已按你的要求删除。
