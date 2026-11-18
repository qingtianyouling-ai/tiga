# TIGA 个人站 · AI 交接文档

> 这份文档是给「另一个 AI／另一台电脑」看的：读完就能接手，不需要历史对话。
> 最后更新：2026-11-17 ｜ 线上版本：commit `373c998`（已推送，Pages 已上线）｜ 本地 main 与 origin/main 同步
> 给 GPT／别的 AI 接手：直接给仓库地址 <https://github.com/qingtianyouling-ai/tiga> 最稳；聊天里传文件就用 `tiga-code-*.zip`。

---

## 0. 三步接手

```powershell
# 1) 拿代码（公开仓库）
git clone git@github.com:qingtianyouling-ai/tiga.git
cd tiga

# 2) 本地预览（带热重载，改文件自动刷新）
node scripts/serve.mjs            # → http://127.0.0.1:5188/

# 3) 自检（改完必跑）
node scripts/audit.mjs            # 引用完整性 + 体积预算 + 图片健康
node scripts/dom-test.mjs         # jsdom 真跑页面，25 条断言
```

`dom-test.mjs` 需要 jsdom：`npm install --prefix .tmp jsdom`（`.tmp/` 不进仓库）。

> 如果你拿到的是 **zip 交付包**而不是 git 仓库：跳过第 1 步，解压后直接 `npm install --prefix .tmp jsdom` + `node scripts/serve.mjs`；包内缺什么见 §13。

---

## 1. 项目事实

| 项 | 值 |
|---|---|
| 站点 | https://qingtianyouling-ai.github.io/tiga/ |
| 仓库 | https://github.com/qingtianyouling-ai/tiga （分支 `main`，Pages 从仓库根目录发布） |
| 作者 | 冼正 / TIGA，深圳，视频创作 + AI 创意 + 内容营销（首页主定位，2026-11-17 改） |
| 联系 | qingtianyouling@qq.com ｜ 13267074941 ｜ 微信 `Pareght`（抖音链接 2026-11-17 已按要求从站点删除） |
| 参考站 | https://ctlasdm.studioslate.cn （张皓的作品集，深色编辑式排版） |
| 设计语言 | 深色 `#101010`、等宽感小标签、1px 分割线、巨型拉丁标题、编号章节 `01—03` |

**三个章节**：`01 Selected Work`（视频）/ `02 Graphic`（摄影平面）/ `03 Contact`。

---

## 2. 用户口味与硬性规则（最重要，违反会被打回）

1. **不要个人照片**。曾经有头像图，被明确要求删掉。
2. **不要 About 区、不要平台运营区**。2026-11-17 用户明确要求整段删除，站点只剩 作品 / 平面 / 联系 三块；首页下滑引导写「下滑看作品」，指 `#work`。**别再恢复。**
3. **教育和经历都交给简历**：作品集连同简历一起投递，所以学历、所在城市、在校职务、技能清单、粉丝数据都不在站点出现。国家开放大学、深圳鹏城技师学院永远不要出现。
4. **作品板块顺序固定**：商业广告（小米 SU7 → 雷鸟眼镜 iO → 保时捷 → iPhone 18 Pro → iPhone Duo → 舍得酒 → 扫地机器人 → HPC）→ 创意短片 → 纪实活动。**数组顺序 = 页面顺序**，别按分类自动排。
5. 视频与平面**分成两个板块**，各自首屏露 **10 个** + 「展开更多」。
6. 卡片文案是**三行**：`名称 · 片种` / `品类 · 规格（真实时长或张数）` / `职责`，右侧小字显示 `年份 · 分类`。
7. AI 生成的商业片要写成「**AI 商业产品广告**」，职责用「AI 概念生成 / 镜头调度 / 视觉设计」这类措辞，**不要**写成普通摄影职责。
8. 扫地机器人、HPC 是「**TVC 广告**」，不要叫「功能片 / 展示片」。
9. 汽车运镜那条是「**创意热点**」，不是「车拍练习」。
10. **两条微电影**（罪饿 / 重启今日）、刺绣类作品（垣象科技两条）、「模型」三张照片、**版式 6 条**（武侠/咖啡店/啤酒/电影网页/羊城晚报/耳机）和**两个图集**（品牌 VI、重阳节）**都已按要求删除**，不要加回来。
11. 首屏要有动效、文字居中、右下角 01/02/03 可切镜、下滑时文字淡出。用户很在意「排版/审美」，别退回居中堆 emoji 的旧样式。
12. 中文回复，直接给结论 + 链接，不要长篇解释。

---

## 3. 代码结构（零构建，纯静态）

```
index.html      语义骨架 + 内联 SVG 图标精灵；所有静态文案在这里
styles.css      设计令牌 + 组件样式（一个文件，含响应式与 reduced-motion）
content.js      ★ 唯一数据源：作品、分类名
app.js          渲染与交互：首屏轮播、双网格、筛选、弹层、计数、悬停预览
assets/favicon.svg
assets/og.jpg     分享大图 1200×630（og:image / twitter:image 用它）
images/works/   母版图片（用户原件，不参与页面直达）
images/web/800/   卡片封面（webp，长边 ≤800，q80）
images/web/1600/  详情大图（webp，长边 ≤1600，q82）
videos/         视频原片（H.264 直接引用）
videos/web/     非 H.264 源（HEVC）转出的网页版
videos/web/preview/  5 秒静音悬停预览
videos/hero/    首屏三镜（slide-xiaomi / slide-rayneo / slide-shede + mobile 版本；旧的 porsche/iphone 剪辑留在目录里备回滚，页面已不用）
documents/resume.pdf  用户自己做的简历（不是脚本生成的；页面已不链接它，随简历单独投递）
scripts/        serve.mjs / audit.mjs / dom-test.mjs / build-assets.ps1 / make-covers.py / build-resume.py / fetch-assets.mjs
_backup/        旧站原文件 + 备用素材（不参与页面）
```

`index.html` 里**没有内联 CSS/JS**；`<script defer src="content.js">` + `app.js`。全站无框架、无打包、无接口请求 —— 所以 `file://` 也能直接打开。

---

## 4. 数据模型（`content.js`）

```js
{ id, cat, title, desc, roles:[], year?, video?, preview?, poster?, full?, images?[], kind?, collection?, credit? }
```

- `title` = 卡片第一行（`名称 · 片种`），`desc` = 第二行（`品类 · 规格`），`roles` = 第三行。
- **`video` 有值 → 进「作品」板块；没有 → 进「摄影平面」板块。** 这是唯一的板块归属规则。
- `year` 可选：写了就在卡片右上显示，没写不占位。
- `catLabels` 是分类中文名；筛选按钮**按分类在数组里出现的顺序自动生成**，不需要另配。
- `DEFAULT_ROLES` 是没写 `roles` 时的兜底。

### 渲染规则（`app.js` 的 `buildGallery`）

- `initial: 10` → 首屏 10 张，其余进「展开更多 · 还有 N 件」。
- 计数：未筛选 `25 Projects`，筛选后 `2 / 25 Projects`（平面用 `Works`）。
- 悬停 220ms 后挂静音预览（仅 `hover:hover` 且非 reduced-motion）。
- 封面加载失败：先退回 `full` 大图 → 再不行显示标题占位（`.work-ph`）；视频作品则用 `#t=0.5` 首帧兜底。
- 弹层：视频静音自动播放 + 左上「开启声音」；单图直接展示（多图才出缩略图 + ←/→）；Esc 关闭并把焦点还给触发按钮；body 锁滚动；Tab 焦点陷阱。

### 首屏（Hero）

- 三条 **7 秒**无声片：小米 SU7 → 雷鸟眼镜 iO → 舍得酒，**一条播完接一条**（监听 `ended`，9 秒兜底），交叉淡入（旧片垫在下面，**不能透黑**）。`<video>` 上不能加 `loop`，否则 `ended` 不触发。
- **性能**：首屏视频 1280×720 / 约 770KB（移动端 960×540 / 约 470KB）；下一镜**默认不预加载**，当前镜播满 5 秒且网络不是 2G/3G 才预取；`saveData` 或 2G 下只放封面、不播视频。
- 右下 `01/02/03` 手动切镜 + 当前作品名 + 暂停按钮；鼠标悬停暂停当前视频并停表，移开继续。
- 文字居中：小标签 → `XIAN / ZHENG.` 巨型两行 → `TIGA` → 中文名 + 身份 → 斜杠分隔的方向行 → `探索我的作品 (↗)`。
- 滚动时 `--hp`（0→1）驱动文字上移淡出、画面轻微推近；滚出首屏自动暂停视频。
- `prefers-reduced-motion` 下：不加载视频、只显示各镜封面、不自动轮播。

---

## 5. 内容清单（当前线上状态）

### 视频 25 件

| # | id | 标题 | 第二行 | 职责 | 年份 |
|---|---|---|---|---|---|
| 1 | `commercial-07` | 小米 SU7 · 汽车概念短片 | AI 商业产品广告 · 0:40 | AI 概念生成 / 视觉方向 / 成片审阅 | 2026 |
| 2 | `commercial-08` | 雷鸟眼镜 iO · 产品概念 TVC | AI 商业产品广告 · 1:20 | AI 概念生成 / 逐镜生成 / 审阅 / 混音 | 2026 |
| 3 | `commercial-04` | 保时捷 Taycan Turbo GT · 汽车概念影像 | AI 商业产品广告 · 0:30 | AI 概念生成 / 镜头调度 / 视觉设计 | 2026 |
| 4 | `commercial-05` | iPhone 18 Pro · 产品概念 TVC | AI 商业产品广告 · 0:30 | AI 概念生成 / 工业设计推演 / 镜头调度 | 2026 |
| 5 | `commercial-06` | iPhone Duo · 双机概念 TVC | AI 商业产品广告 · 0:30 | AI 创意生成 / 运镜推演 / 三维解构 | 2026 |
| 6 | `commercial-02` | 舍得酒 · 水墨品牌短片 | AI 商业产品广告 · 0:50 | AI 概念生成 / 视觉设计 / 创意 | 2026 |
| 7 | `commercial-01` | 扫地机器人 · TVC 广告 | 清洁电器 · 2:20 | 摄影 / 剪辑 | 2026 |
| 8 | `commercial-03` | HPC 显示器 · TVC 广告 | 商业广告 · 0:30 | 摄影 / 剪辑 | 2026 |
| 9 | `creative-01` | 时空 · 定格动画 | 创意短片 · 2:45 | 摄影 / 剪辑 / 创意 | 2025 |
| 10 | `creative-02` | 变速摩天轮 · 变速运镜 | 创意短片 · 0:10 | 摄影 / 剪辑 / 创意 | 2025 |
| 11 | `creative-03` | 国庆节 · 节日创意 | 创意短片 · 0:07 | 摄影 / 剪辑 / 创意 | 2025 |
| 12 | `creative-04` | 马里奥灯 · 布光创意 | 创意短片 · 0:22 | 摄影 / 剪辑 / 创意 | 2025 |
| 13 | `creative-05` | 汽车运镜 · 创意热点 | 创意短片 · 0:11 | 摄影 / 剪辑 / 创意 | 2025 |
| 14 | `event-01` | 青春的底色 · 百千万工程纪实 | 行动纪实片 · 5:00 | 摄影 | 2025 |
| 15 | `event-02` | 中国联通 · 企业活动纪实 | 活动记录 · 1:08 | 摄影 / 剪辑 | 2025 |
| 16 | `event-03` | 五四汇演 · 校园汇演 | 活动记录 · 1:34 | 摄影 / 剪辑 | 2025 |
| 17 | `event-04` | 人大代表媒体见面会 · 政务会议 | 会议记录 · 1:00 | 摄影 / 剪辑 | 2025 |
| 18 | `event-05` | 夏季嘉年华 · 校园活动 | 活动记录 · 0:40 | 摄影 / 剪辑 | 2025 |
| 19 | `event-06` | 工商联新春联谊会 · 商会活动 | 活动记录 · 1:05 | 摄影 / 剪辑 | 2025 |
| 20 | `event-07` | 恒丰银行 · 品牌活动 | 活动记录 · 1:00 | 摄影 / 剪辑 | 2025 |
| 21 | `event-08` | 极氪 · 品牌活动 | 活动记录 · 0:31 | 摄影 / 剪辑 | 2025 |
| 22 | `event-09` | 破蝶重生 · 舞台演出 | 演出记录 · 1:02 | 摄影 / 剪辑 | 2025 |
| 23 | `event-10` | 素质街舞 · 校园街舞 | 活动记录 · 1:04 | 摄影 / 剪辑 | 2025 |
| 24 | `event-11` | 蒙牛 · 品牌活动 | 活动记录 · 0:29 | 摄影 / 剪辑 | 2025 |
| 25 | `event-12` | 香港珠海学院 · 院校活动 | 活动记录 · 1:21 | 摄影 / 剪辑 | 2025 |

### 平面 8 件（只有风光）

| # | id | 标题 | 第二行 | 职责 |
|---|---|---|---|---|
| 1–8 | `landscape-01…08` | DJI 航拍 / 城中镜 / 夜春笋 / 惬意人生 / 海与陆 / 舟游 / 苏州 / 黄昏摩天轮 | 风光 · 1 张 | 摄影 / 后期 |

**极氪 4 条商业平面、版式 6 条、两个图集都已按要求删除**，别加回来；对应 webp 也从 `images/web` 删了（母版还在 `images/works`）。

平面只剩**一个分类**，`app.js` 会自动隐藏筛选条（`cats.length <= 1` 时把 `filtersEl` 设 `hidden`）。

平面 8 件**还没有年份**（用户尚未提供）。

---

## 6. 素材管线

### 图片 → webp（`scripts/build-assets.ps1`）

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build-assets.ps1 [-OnlyImages|-OnlyVideos|-ForceVideoTranscode]
```

- 800（q80）给卡片，1600（q82）给详情；母版不动。
- 视频：只有源不是 H.264 时才转 H.264（`-crf 26 -preset veryfast -movflags +faststart`）；另出 5 秒静音预览。

### 竖构图 / 方图 → 16:9 封面（`scripts/make-covers.py`）

原图比例 < 1.2 的，**不要硬塞 16:9**（会裁成一条）。用 Pillow 生成「完整画面居中 + 同图虚化铺底」的 `cover-*.webp`（`COVERS` 表里加条目）。

### 首屏三镜（ffmpeg，源片在 `~/Desktop/xz/AI做片项目归档`）

每条剪 **7 秒**、无声、1920×1080（移动端另出 1280×720），H.264 + `+faststart`：

- `slide-xiaomi.mp4`：`02_小米SU7/外部参考/jlyzw0zRJgDQB198_1080p.mp4` 的 14.5–21.5s（沙漠车身；**别用 5–13s**，那里有内嵌字幕会压到首屏文字）。
- `slide-rayneo.mp4`：`03_雷鸟眼镜/外部参考/jlyzw0zBRpKQB198_1080p.mp4` 的 17–24s（光轨 + 产品，画面够暗，白字清楚）。
- `slide-shede.mp4`：`videos/舍得酒.mp4` 的 16–23s。
- 编码：`-crf 26 -maxrate 2200k`（移动端 `-crf 28 -maxrate 900k`），单条约 2MB。

### 社交分享大图（`assets/og.jpg`）

首屏截图成 1200×630：无头 Chrome 打开 `/?`（禁 JS 以固定画面），隐藏 `.site-header`、`.hero-cue`、`.hero-dock`、`.hero-cta` 与 `<video>`，把 `.hero-shade` 中间压深一档，再截 `assets/og.jpg`（q86，约 58KB）。**换了首屏主视觉就重出一张**：微信/微博的分享卡片用的就是它，audit 会检查它存在且 < 300KB。

### 体积预算（audit 会卡）

首屏 < 3.5MB、首页文字资源 < 600KB、封面合计 < 25MB、预览小样 < 6MB、单条播放版 < 45MB、无缺失引用、无数据错误、图片文件头有效。

---

## 7. 校验脚本

```powershell
node scripts/audit.mjs      # 33 条作品 / 129 引用 / 0 缺失；检查 webp/png/jpg 文件头与体积、og:image、首屏 poster/data-src
node scripts/audit.mjs --no-media   # 代码包里用：跳过 videos/ 下缺失的详情播放版
node scripts/dom-test.mjs   # 25 条断言：数据、筛选、展开与焦点、年份、弹层、导航（桌面+移动）、联系区、Hero
```

`dom-test` 会真执行 `content.js` + `app.js`，任何运行时异常都会 fail —— 改完必须 0 错。

---

## 8. 部署

### 这台 Mac（2026-11-17 起用的方式）

仓库 remote 是 HTTPS，本机没有 HTTPS 凭据；推的是 **SSH + 仓库部署密钥**（deploy key，只对 tiga 有写权限）：

```bash
KEY=/Users/edy/Documents/deepseek-harness/default-workspace/.keys/tiga_deploy
GIT_SSH_COMMAND="ssh -i $KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
  git push git@github.com:qingtianyouling-ai/tiga.git main
```

私钥在 workspace 的 `.keys/`（不在仓库里）。密钥失效就去 <https://github.com/qingtianyouling-ai/tiga/settings/keys> 重新加一个。

### 早期 Windows 机器（历史记录）

```powershell
git add -A
git commit -m "说明"
git push origin main
```

**坑 1：schannel 坏**。`git` 用默认 TLS 后端会报 `schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS`。HTTPS 操作加 `-c http.sslBackend=openssl`。

**坑 2：MSYS 的 `sh.exe` 在受限沙箱里起不来**（`couldn't create signal pipe, Win32 error 5`），导致 git 的 ssh 包装器失败。解法：做一个 `.cmd` 包装器，让 git 直接调 **Windows 自带 OpenSSH**：

```cmd
@echo off
"C:\Windows\System32\OpenSSH\ssh.exe" -o StrictHostKeyChecking=no -o UserKnownHostsFile="<某个可写路径>\known_hosts" -o ConnectTimeout=20 %*
```

```powershell
$env:GIT_SSH = "<包装器路径>"; $env:GIT_SSH_VARIANT = "ssh"
git clone git@github.com:qingtianyouling-ai/tiga.git
```

认证用的是 `~/.ssh/id_ed25519`（已授权给 qingtianyouling-ai）。**能连 GitHub 的方法**：SSH（22 或 443 都行，`ssh.github.com:443` 更稳）。

**Pages 缓存**：推完 1–2 分钟构建，HTML 在 CDN 上还会缓存约 10 分钟。验证新版要加参数（`/?v=时间戳`）或强刷。

---

## 9. 已经修掉的老坑（别重复踩）

1. 旧站 `openLightbox` 定义在 IIFE 里却被内联 `onclick` 调用 → 点击报 `ReferenceError`。
2. 旧站 `mediaCategories` 里 `commercial` 键重复定义两次。
3. 旧站空状态和轮播同时带 `active`，无 JS 时显示「暂无视频」。
4. 旧站两个全局 ←/→ 监听互相打架。
5. 旧站计数器不到视口就永远是 0。
6. **0 字节 webp**：个别 PNG 其实是 APNG，ffmpeg 解析第二帧时报 `Invalid PNG signature` 并留下空文件 → 用 `make-covers.py`（Pillow 取首帧）。
7. 轮播交叉淡入时新旧两屏都半透明 → 透出黑底；现在旧镜垫在下面保持不透明。
8. 竖构图封面在 16:9 卡里被裁成一条 → 模糊底填充。
9. 卡片封面 404 时原来 `visibility:hidden` 变空白 → 改三级兜底（大图 → 标题占位 / 视频首帧）。
10. 联系区用 `.contact-links div` 连行内的内容块一起选中 → 每行多出一条短分割线；改成 `>` 只作用于直接子元素，行内块单独给 flex。
11. 移动端菜单漏了「平面」，手机上根本进不去平面板块；现在与桌面导航同序同项（dom-test 有断言）。
12. 关于标题在 1440 下从「让作 / 品被看见」中间断开 → `em` 独占一行 + `text-wrap: balance`。
13. 视频弹层「开启声音」原来压在原生控制条上，挡住全屏键 → 移到画面左上角。
14. 键盘点「展开更多」后按钮 `hidden`，焦点掉回 body → 现在把焦点送到第一张新增卡片；计数加了 `aria-live`。

---

## 10. 待确认 / 可继续做的事

1. **扫地机器人首屏高清版**：归档里没有这个项目，站点这条只有 960×544；用户决定先不上首屏。以后拿到高清原片，再把 `slide-xiaomi.mp4` 或第一镜换掉。
2. **HPC 显示器**的第二行还是「商业广告 · 0:30」，问过是否改成「显示设备 · 0:30」，用户未答。
3. **《青春的底色》年份**：用户说「剩下都是 2025」—— 已按 2025 填，待确认。
4. 平面 8 件是否也加年份（可统一 2025 或逐条提供）。
5. 保时捷 / iPhone 两条的是否需要和参考站一样显示更详细的项目信息（职责已有）。
6. 简历 `documents/resume.pdf` 是用户自己做的 PDF（623KB），**不要**用脚本覆盖。

---

## 11. 不要做的事

- 不要加个人照片、不要恢复教育/设备/获奖/项目四块（已被明确删除）。
- 不要引入框架、构建链、Tailwind、CDN 依赖 —— 站点要能 `file://` 直开。
- 不要按分类自动排序作品；顺序是人工定的。
- 不要把视频全量预载；只用 `preload="none"` + 封面 + 5 秒预览小样。
- 不要用 PowerShell 的 `Set-Content/Get-Content` 处理含中文的源码文件（PS 5.1 会按 ANSI 读写，把 UTF-8 写坏）。改文件用编辑工具或 Node 脚本。
- 不要删 `images/works` 里的母版（那是用户唯一的原始素材副本）。

---

## 12. 素材原件（这台 Mac 上）

- `~/Desktop/xz/AI做片项目归档/` —— 11GB 项目归档：`01_保时捷与汽车`、`02_小米SU7`、`03_雷鸟眼镜`、`04_iPhone`、`05_宠物理发器`、`06_Paw-to-Wear`、`07_社会故事`、`08_制作工作流`、`09_跨项目工作素材` + `归档清单.tsv`。
- 小米成片：`02_小米SU7/外部参考/jlyzw0zRJgDQB198_1080p.mp4`（39.6s，首屏 14.5–21.5s 就是从它剪的）。
- 雷鸟成片：`03_雷鸟眼镜/外部参考/jlyzw0zBRpKQB198_1080p.mp4`（79.7s，首屏 17–24s）。
- 宠物理发器、Paw-to-Wear 只有素材和脚本，**没有成片**。
- 早期 Windows 机器上的 `D:\my rice bowl\` 这套母版这台机器上没有，别再找。

---

## 13. 交付包（2026-11-17）

- `tiga-full-2026-11-17.zip`：**整站**，不含 `.git` / `.tmp` / `node_modules`；解压后 `node scripts/serve.mjs` 就能跑，也可以直接推到 GitHub Pages（约 445MB）。
- `tiga-code-2026-11-17.zip`：**给 AI 上传的源码包**（约 18MB），含全部代码、文档、`images/web` 封面、首屏片与 5 秒预览；**不含** 27 条详情播放版和 `images/works` 母版。这个包里 audit 要加 `--no-media`（跳过视频缺失），否则会报 27 条缺失——**别靠删数据去「修」**。
- 两个包都带 `START-HERE.md`（30 秒上手）和这份 `HANDOFF-AI.md`；代码包根目录另有 `READ-ME-FIRST.md`（给 GPT 的一句话接手指令）。
- **仓库已公开推送**：之后让别的 AI 接手，优先给 <https://github.com/qingtianyouling-ai/tiga>；`tiga-code` 包只作为聊天上传的备选。
