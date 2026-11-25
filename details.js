/* ==========================================================================
   项目详情数据（给 work.html 用）
   --------------------------------------------------------------------------
   有 detail 的作品才能打开详情页；没有的走 work.html 的兜底版式。
   每条 detail 的结构：
     kicker   小标题（英文/短句）
     facts    右侧信息表 [[标签, 值], ...]
     brief    项目背景（数组，每段一句）
     approach 做法（[{ h, p }]）
     pipeline AI 管线（[{ n, t, d, img }]）——没有就省略
     frames   关键帧（[{ src, cap }]）
     note     备注（如「独立概念练习，未投放」）
   ========================================================================== */
window.workDetails = {
  "commercial-07": {
    kicker: "AI COMMERCIAL FILM / 24 SHOTS",
    facts: [
      ["项目", "新一代 SU7 靛石绿《自在而行》"],
      ["性质", "独立概念练习（非品牌委托）"],
      ["年份", "2026"],
      ["片长", "0:39.64 · 16:9"],
      ["镜头", "24 镜"],
      ["职责", "创意 / 脚本 / 分镜 / 静帧 / 逐镜生成 / 剪辑"]
    ],
    brief: [
      "把新一代 SU7 靛石绿放进一片暖金色砂岩：从沙纹与蝎子开始，经过峡谷穿行、与马并行，到山顶云海停住。全片用「运动与自由」把 24 个镜头串成一条线，最后用安静远景回收节奏。",
      "这是一次独立的概念练习，不是品牌委托。分镜、静帧、视频、剪辑和声音都由我一个人完成，用来验证一条 AI 商业片能不能做到「产品可信、节奏成立」。"
    ],
    approach: [
      { h: "先锁产品母版", p: "颜色只用官网 6-3 靛石绿，轮毂固定 21 英寸双层锻造梅花轮毂、红色卡钳，内饰统一砂陶米。这些约束写进每一镜的提示词里，避免镜头之间车「变样」。" },
      { h: "静帧先行", p: "24 张分镜静帧用 Nano Banana Pro 生成，先审静帧再逐镜动画——构图、光比、车的位置不对就重来，不把问题留到视频阶段。" },
      { h: "逐镜生成", p: "视频用 Seedance 2.5，单镜最短 4 秒，生成时留剪辑余量；接口单次整合最长 30 秒，所以分两段生成，最后拼成 39.64 秒，24 镜一个不少。" },
      { h: "剪辑与声音", p: "按 24 镜顺序表拼片，速度来自低机位追拍、前景掠过和轮胎扬尘的真实响应；声音是原创电子/管弦氛围，加沙、轮胎、风、马蹄的实录音效，纯电车不加发动机轰鸣。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 → 24 镜表", d: "每一镜写清画面、运镜、时长和参考，先定结构再生成。", img: "images/detail/xiaomi/story-01.webp" },
      { n: "02", t: "静帧 · Nano Banana Pro", d: "24 张分镜静帧，产品一致性在第一帧就锁死。", img: "images/detail/xiaomi/story-04.webp" },
      { n: "03", t: "视频 · 即梦 AI", d: "即梦（Seedance）逐镜生成，单镜 4 秒起，超长段落分段整合。", img: "images/detail/xiaomi/story-06.webp" },
      { n: "04", t: "剪辑 · 39.64 秒", d: "24 镜按节奏表拼接，配乐与实录音效对齐。", img: "images/detail/xiaomi/final-02.jpg" }
    ],
    frames: [
      { src: "images/detail/xiaomi/final-01.jpg", cap: "峡谷穿行" },
      { src: "images/detail/xiaomi/final-02.jpg", cap: "与马并行" },
      { src: "images/detail/xiaomi/final-03.jpg", cap: "扬尘轨迹" },
      { src: "images/detail/xiaomi/final-04.jpg", cap: "驾驶视角" },
      { src: "images/detail/xiaomi/final-05.jpg", cap: "车头特写" },
      { src: "images/detail/xiaomi/final-06.jpg", cap: "环形轨迹" }
    ],
    note: "独立概念练习，未投放；片中车辆与品牌仅为练习对象。"
  },
"commercial-08": {
    kicker: "AI PRODUCT FILM / 30 SHOTS",
    facts: [
      ["项目", "雷鸟眼镜 iO《不同的眼光》"],
      ["性质", "独立练习"],
      ["年份", "2026"],
      ["片长", "1:20 · 30 镜"],
      ["职责", "创意 / 脚本 / 分镜 / 参考图 / 视频生成 / 剪辑"]
    ],
    brief: [
      "用光学线条进入创作者的日常：前 21 秒是黑底、灰金属和荧光绿，之后转进有纸张、陶器和鼓点的工作室。全片 30 个镜头逐镜生成、拼接，最后统一混音。",
      "想验证的是风格一致性——30 个镜头分别生成，但看起来要像同一天、同一台机器拍的。"
    ],
    approach: [
      { h: "先定光学语言", p: "前段用冷黑、镜面反射和荧光绿建立科技感，后段切暖色工作室，用材质反差讲「从产品到生活」。" },
      { h: "参考图锁风格", p: "先用 Nano Banana 出参考图，定下金属质感、环境光和构图，再拿参考图去生成视频，减少镜头之间的漂移。" },
      { h: "逐镜生成再统一", p: "即梦 AI 逐镜生成，每镜检查镜腿比例、佩戴位置和形变，不合格就重生成；最后统一调色和混音。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 · ChatGPT", d: "创意与脚本、30 镜拆解，先定每镜要讲什么。" },
      { n: "02", t: "参考图 · Nano Banana", d: "定金属质感、环境光和构图，作为生成参考。" },
      { n: "03", t: "视频 · 即梦 AI", d: "逐镜生成，控制镜腿细节和佩戴位置。", img: "images/detail/rayneo/frame-02.webp" },
      { n: "04", t: "剪辑 · 1:20", d: "按节奏拼接，统一调色与混音。", img: "images/detail/rayneo/frame-04.webp" }
    ],
    frames: [
      { src: "images/detail/rayneo/frame-01.webp", cap: "光学结构" },
      { src: "images/detail/rayneo/frame-02.webp", cap: "金属细节" },
      { src: "images/detail/rayneo/frame-03.webp", cap: "线条与光" },
      { src: "images/detail/rayneo/frame-04.webp", cap: "工作室 · 夜" },
      { src: "images/detail/rayneo/frame-05.webp", cap: "纸张与桌面" },
      { src: "images/detail/rayneo/frame-06.webp", cap: "鼓点 · 收尾" }
    ],
    note: "独立练习，非品牌委托。"
  },

  "commercial-09": {
    kicker: "AI GAME TRAILER / 0:42",
    facts: [
      ["项目", "游戏 PV（ZOA 概念片）"],
      ["性质", "独立练习"],
      ["年份", "2026"],
      ["片长", "0:42 · 16:9"],
      ["职责", "概念 / 分镜 / 参考图 / 视频生成 / 剪辑"]
    ],
    brief: [
      "一条游戏宣传片的概念练习：从云海上的浮空岛开场，进遗迹、点传送、唤出无人机，最后落在 ZOA 的徽章上。42 秒里把世界观、角色和玩法信号都交待一遍。",
      "没有真实游戏资产，全部画面由 AI 生成，重点是把「预告片该有的节奏」做出来：开场给世界、中段给角色、结尾给 logo。"
    ],
    approach: [
      { h: "先写世界观", p: "用一句话定世界（浮空岛 + 遗迹文明），再拆成 12 个镜头的功能：建立、人物、奇观、钩子、落版。" },
      { h: "参考图统一质感", p: "Nano Banana 出概念图，锁住写实 CG 的材质、光线和色调，避免不同镜头像两个游戏。" },
      { h: "逐镜生成 + 节奏剪辑", p: "即梦 AI 逐镜生成，按预告片节奏剪：前 10 秒慢、中段加速、结尾留白给 logo。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 · ChatGPT", d: "世界观、12 镜功能表、旁白与字幕节奏。" },
      { n: "02", t: "参考图 · Nano Banana", d: "锁写实 CG 的材质与色调，统一全片质感。" },
      { n: "03", t: "视频 · 即梦 AI", d: "逐镜生成，控制镜头运动与角色一致性。", img: "images/detail/gamepv/frame-03.webp" },
      { n: "04", t: "剪辑 · 0:42", d: "按预告片节奏拼接，落版收在徽章上。", img: "images/detail/gamepv/frame-09.webp" }
    ],
    frames: [
      { src: "images/detail/gamepv/frame-01.webp", cap: "浮空岛 · 开场" },
      { src: "images/detail/gamepv/frame-03.webp", cap: "遗迹入口" },
      { src: "images/detail/gamepv/frame-05.webp", cap: "传送点" },
      { src: "images/detail/gamepv/frame-06.webp", cap: "角色登场" },
      { src: "images/detail/gamepv/frame-08.webp", cap: "无人机" },
      { src: "images/detail/gamepv/frame-09.webp", cap: "ZOA 落版" }
    ],
    note: "独立练习，片中游戏与角色均为虚构。"
  },

  "commercial-01": {
    kicker: "LIVE-ACTION PRODUCT FILM",
    facts: [
      ["项目", "扫地机器人 · 产品片"],
      ["性质", "实拍产品片"],
      ["年份", "2026"],
      ["片长", "2:20"],
      ["器材", "索尼相机 / DJI / 神牛 / 南光"],
      ["职责", "摄影 / 布光 / 剪辑"]
    ],
    brief: [
      "室内实景拍一台扫地机器人：地面刷头、尘杯、滤芯、整机，按功能点逐段拍。现场最难的是控制反光——机身是亮面，地面会映，背景还要留层次。",
      "这条片不是 AI 生成的，机器、灯、机位、剪辑都是实拍完成。"
    ],
    approach: [
      { h: "先布光再开机", p: "地面压暗、机身用柔光提亮，侧逆光勾边；每一步都先看监视器，确认高光不炸再拍。" },
      { h: "按功能分镜", p: "把产品拆成刷头、尘杯、滤芯、整机几个段落，低机位贴地拍工作状态，手持跟拍补动势。" },
      { h: "剪辑与输出", p: "按卖点分段剪，字幕和音效对齐，同时出竖版和横版两个规格。" }
    ],
    pipeline: [
      { n: "01", t: "布光", d: "室内实景控反光，机身与背景分开打。" },
      { n: "02", t: "拍摄", d: "低机位贴地、手持跟拍、特写切分。", img: "images/detail/vac/frame-02.webp" },
      { n: "03", t: "剪辑 · 输出", d: "按卖点分段，出竖版与横版。", img: "images/detail/vac/frame-05.webp" }
    ],
    frames: [
      { src: "images/detail/vac/frame-01.webp", cap: "机身与光" },
      { src: "images/detail/vac/frame-02.webp", cap: "手持跟拍" },
      { src: "images/detail/vac/frame-03.webp", cap: "地面刷头" },
      { src: "images/detail/vac/frame-04.webp", cap: "整机使用" },
      { src: "images/detail/vac/frame-05.webp", cap: "尘杯特写" },
      { src: "images/detail/vac/frame-06.webp", cap: "滤芯细节" }
    ],
    note: "实拍项目，非 AI 生成。"
  },

  "commercial-03": {
    kicker: "LIVE-ACTION PRODUCT FILM / DARK SET",
    facts: [
      ["项目", "HPC 显示器 · 产品片"],
      ["性质", "实拍产品片"],
      ["年份", "2026"],
      ["片长", "0:30"],
      ["器材", "索尼相机 / DJI / 神牛 / 南光"],
      ["职责", "摄影 / 布光 / 剪辑"]
    ],
    brief: [
      "暗调产品片：屏幕是画面的主光源，靠屏幕内容和高光位塑形。黑位要黑得住，边框的高光又不能脏。",
      "实拍完成，没有用 AI 生成画面。"
    ],
    approach: [
      { h: "暗场布光", p: "关掉环境光，屏幕亮度作为主光，侧逆光勾边框；用黑旗压掉多余反射。" },
      { h: "屏幕内容对位", p: "拍摄时同步播放素材，保证画面内容、亮度和运镜方向一致。" },
      { h: "剪辑", p: "短节奏卡点，保留黑场呼吸，输出 16:9 与竖版。" }
    ],
    pipeline: [
      { n: "01", t: "暗场布光", d: "屏幕主光 + 侧逆勾边，黑旗控反射。" },
      { n: "02", t: "拍摄", d: "屏幕内容对位，控曝光与黑位。", img: "images/detail/hpc/frame-02.webp" },
      { n: "03", t: "剪辑", d: "卡点剪辑，保留黑场呼吸。", img: "images/detail/hpc/frame-04.webp" }
    ],
    frames: [
      { src: "images/detail/hpc/frame-01.webp", cap: "暗场开场" },
      { src: "images/detail/hpc/frame-02.webp", cap: "屏幕主光" },
      { src: "images/detail/hpc/frame-03.webp", cap: "边框高光" },
      { src: "images/detail/hpc/frame-04.webp", cap: "游戏画面" },
      { src: "images/detail/hpc/frame-05.webp", cap: "细节" },
      { src: "images/detail/hpc/frame-06.webp", cap: "收尾" }
    ],
    note: "实拍项目，非 AI 生成。"
  },

  "commercial-02": {
    kicker: "AI BRAND FILM / INK",
    facts: [
      ["项目", "舍得酒 · 水墨品牌短片"],
      ["性质", "AI 概念片"],
      ["年份", "2026"],
      ["片长", "0:50"],
      ["职责", "概念 / 脚本 / 参考图 / 视频生成 / 剪辑"]
    ],
    brief: [
      "把白酒的时间感做成水墨：卷轴展开、酒液入盏、青绿山水与酿造场景交替，最后收在产品和品牌名上。",
      "青绿山水 + 金线的视觉体系先用参考图定死，再逐镜生成，避免每一镜的「画风」不一样。"
    ],
    approach: [
      { h: "定视觉体系", p: "青绿山水、金色线条、宣纸质感三件套先出参考图，全片只在这个体系里变。" },
      { h: "产品一致性", p: "瓶型、标签、瓶盖金顶在每个镜头里保持一致，产品镜头单独盯。" },
      { h: "按水墨节奏剪", p: "镜头之间用墨色流动做过渡，水声、器皿声铺底，节奏跟着墨的扩散走。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 · ChatGPT", d: "把「时间、酿造、山水」拆成镜头顺序。" },
      { n: "02", t: "参考图 · Nano Banana", d: "青绿山水与金线质感，先定全片画风。" },
      { n: "03", t: "视频 · 即梦 AI", d: "逐镜生成，水、墨、器皿分别控制。", img: "images/detail/shede/frame-02.webp" },
      { n: "04", t: "剪辑 · 0:50", d: "墨色过渡串联，落版收在产品。", img: "images/detail/shede/frame-05.webp" }
    ],
    frames: [
      { src: "images/detail/shede/frame-01.webp", cap: "卷轴展开" },
      { src: "images/detail/shede/frame-02.webp", cap: "山水与瓶" },
      { src: "images/detail/shede/frame-03.webp", cap: "酿造场景" },
      { src: "images/detail/shede/frame-04.webp", cap: "大师勾调" },
      { src: "images/detail/shede/frame-05.webp", cap: "酒液入盏" },
      { src: "images/detail/shede/frame-06.webp", cap: "墨色收尾" }
    ],
    note: "AI 概念片，非品牌委托。"
  },

  "commercial-04": {
    kicker: "AI AUTOMOTIVE FILM / 4 CUTS",
    facts: [
      ["项目", "保时捷 Taycan Turbo GT"],
      ["性质", "AI 概念片"],
      ["年份", "2026"],
      ["片长", "0:30"],
      ["职责", "概念 / 脚本 / 参考图 / 视频生成 / 剪辑"]
    ],
    brief: [
      "四镜硬切的速度样本：尾灯、轮毂、前脸、行驶，每镜约一秒，不淡黑。用剪辑节奏代替转场。",
      "画面只讲形状和光：车漆的冷蓝、轮毂的金、尾灯的红，其他都压掉。"
    ],
    approach: [
      { h: "四镜一个逻辑", p: "每镜只讲一件事——灯、轮、脸、动，镜头之间硬切，靠节奏连起来。" },
      { h: "材质与光", p: "车漆、轮毂、卡钳的材质在参考图阶段定死，生成时只改机位不改材质。" },
      { h: "冷调统一", p: "全片压在冷蓝灰里，尾灯的红是唯一的暖色出口。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 · ChatGPT", d: "四镜顺序、每镜时长与机位。" },
      { n: "02", t: "参考图 · Nano Banana", d: "车漆、轮毂、卡钳材质定版。" },
      { n: "03", t: "视频 · 即梦 AI", d: "逐镜生成，控制车身形变。", img: "images/detail/porsche/frame-02.webp" },
      { n: "04", t: "剪辑 · 0:30", d: "硬切卡点，不淡黑。", img: "images/detail/porsche/frame-05.webp" }
    ],
    frames: [
      { src: "images/detail/porsche/frame-01.webp", cap: "尾灯" },
      { src: "images/detail/porsche/frame-02.webp", cap: "轮毂与卡钳" },
      { src: "images/detail/porsche/frame-03.webp", cap: "前脸" },
      { src: "images/detail/porsche/frame-04.webp", cap: "车身全景" },
      { src: "images/detail/porsche/frame-05.webp", cap: "行驶" },
      { src: "images/detail/porsche/frame-06.webp", cap: "夜色尾灯" }
    ],
    note: "AI 概念片，非品牌委托。"
  },

  "commercial-05": {
    kicker: "AI PRODUCT FILM / MACRO",
    facts: [
      ["项目", "iPhone 18 Pro · 概念 TVC"],
      ["性质", "AI 概念片"],
      ["年份", "2026"],
      ["片长", "0:30"],
      ["职责", "概念 / 脚本 / 参考图 / 视频生成 / 剪辑"]
    ],
    brief: [
      "把手机拆成光影：镜头模组、边框、背部纹理，用微距和慢推讲质感。",
      "产品片最难的是比例和细节，所以参考图阶段就把模组、按键、logo 位置定死。"
    ],
    approach: [
      { h: "微距优先", p: "先用微距镜头语言建立质感，再拉开到整机，避免一上来就是「产品图」。" },
      { h: "比例锁定", p: "镜头模组的排列、机身厚度、按键位置在参考图里逐项对，生成时只允许光变。" },
      { h: "节奏", p: "30 秒分三段：细节 → 形态 → 留白落版。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 · ChatGPT", d: "三段式结构与每段时长。" },
      { n: "02", t: "参考图 · Nano Banana", d: "模组、边框、背部纹理定版。" },
      { n: "03", t: "视频 · 即梦 AI", d: "微距到整机的推拉运镜。", img: "images/detail/ip18/frame-02.webp" },
      { n: "04", t: "剪辑 · 0:30", d: "三段节奏与落版。", img: "images/detail/ip18/frame-05.webp" }
    ],
    frames: [
      { src: "images/detail/ip18/frame-01.webp", cap: "镜头模组" },
      { src: "images/detail/ip18/frame-02.webp", cap: "边框" },
      { src: "images/detail/ip18/frame-03.webp", cap: "整机" },
      { src: "images/detail/ip18/frame-04.webp", cap: "质感" },
      { src: "images/detail/ip18/frame-05.webp", cap: "模组特写" },
      { src: "images/detail/ip18/frame-06.webp", cap: "背部收尾" }
    ],
    note: "AI 概念片，非品牌委托。"
  },

  "commercial-06": {
    kicker: "AI PRODUCT FILM / FOLD",
    facts: [
      ["项目", "iPhone Duo · 双机概念 TVC"],
      ["性质", "AI 概念片"],
      ["年份", "2026"],
      ["片长", "0:30"],
      ["职责", "概念 / 脚本 / 参考图 / 视频生成 / 剪辑"]
    ],
    brief: [
      "讲折叠形态：合起、展开、悬停，三个动作撑起全片。",
      "折叠屏的难点是铰链和屏幕内容，参考图阶段就把开合角度和屏幕画面定好。"
    ],
    approach: [
      { h: "动作即节奏", p: "合、开、停三个动作对应三段时间，剪辑跟着机械动作走。" },
      { h: "铰链与屏幕", p: "铰链结构、折痕、屏幕内容逐镜检查，避免展开后画面漂移。" },
      { h: "手部入镜", p: "加真人手部动作，让「能折叠」这件事有尺度感。" }
    ],
    pipeline: [
      { n: "01", t: "脚本 · ChatGPT", d: "三个动作、三段时间。" },
      { n: "02", t: "参考图 · Nano Banana", d: "开合角度、铰链、屏幕内容定版。" },
      { n: "03", t: "视频 · 即梦 AI", d: "折叠动作逐镜生成。", img: "images/detail/duo/frame-02.webp" },
      { n: "04", t: "剪辑 · 0:30", d: "动作卡点与落版。", img: "images/detail/duo/frame-06.webp" }
    ],
    frames: [
      { src: "images/detail/duo/frame-01.webp", cap: "合起" },
      { src: "images/detail/duo/frame-02.webp", cap: "铰链" },
      { src: "images/detail/duo/frame-03.webp", cap: "整机" },
      { src: "images/detail/duo/frame-04.webp", cap: "展开" },
      { src: "images/detail/duo/frame-05.webp", cap: "悬停" },
      { src: "images/detail/duo/frame-06.webp", cap: "双屏内容" }
    ],
    note: "AI 概念片，非品牌委托。"
  },

  "microfilm-02": {
    kicker: "NARRATIVE SHORT / 7:10",
    facts: [
      ["项目", "重启今日 · 校园剧情短片"],
      ["性质", "学生短片"],
      ["年份", "2025"],
      ["片长", "7:10"],
      ["职责", "摄影 / 剪辑"],
      ["荣誉", "2025 大学生短片电影节最佳影片"],
    ],
    brief: [
      "校园剧情短片，完整叙事，7 分 10 秒。校园实景拍摄，多场景切换，从白天拍到夜戏。",
      "我负责摄影与剪辑：机位、光比、场景衔接，以及全片的叙事节奏。",
    ],
    approach: [
      { h: "按场景排机位", p: "先把场景按时间线拆开，每个场景定主光位和主机位，再补特写和反应镜头。" },
      { h: "控制叙事节奏", p: "7 分钟的长度靠剪辑撑：删掉重复信息，用动作和视线接镜头，避免拖沓。" },
      { h: "统一影调", p: "不同场景的光线差别大，剪辑后统一色温和对比，让全片像同一天发生的事。" },
    ],
    frames: [
      { src: "images/detail/mf2/frame-01.webp", cap: "剧照 01" },
      { src: "images/detail/mf2/frame-02.webp", cap: "剧照 02" },
      { src: "images/detail/mf2/frame-03.webp", cap: "剧照 03" },
      { src: "images/detail/mf2/frame-04.webp", cap: "剧照 04" },
      { src: "images/detail/mf2/frame-05.webp", cap: "剧照 05" },
      { src: "images/detail/mf2/frame-06.webp", cap: "剧照 06" },
    ],
    note: "学生短片作品。"
  },

  "microfilm-01": {
    kicker: "NARRATIVE SHORT / 11:48",
    facts: [
      ["项目", "罪饿 · 校园剧情短片"],
      ["性质", "学生短片"],
      ["年份", "2025"],
      ["片长", "11:48"],
      ["职责", "摄影 / 剪辑"],
      ["荣誉", "大学生原创微电影大赛 · 剧情片一等奖"],
    ],
    brief: [
      "校园剧情短片，11 分 48 秒，多场景实拍。拍摄周期里跑了宿舍、走廊、街道、天台等场景。",
      "我负责摄影与剪辑，重点是把长片的节奏控住，不让中段塌下来。",
    ],
    approach: [
      { h: "多场景调度", p: "每个场景先定机位和走位，再用不同焦段区分「日常」和「冲突」两类段落。" },
      { h: "长片剪辑", p: "按事件线剪，先粗剪到 14 分钟，再砍到 11 分 48；每砍一次都回看情绪是否断。" },
      { h: "声音与留白", p: "环境声铺底，关键段落留白，让表演和画面自己说话。" },
    ],
    frames: [
      { src: "images/detail/mf1/frame-01.webp", cap: "剧照 01" },
      { src: "images/detail/mf1/frame-02.webp", cap: "剧照 02" },
      { src: "images/detail/mf1/frame-03.webp", cap: "剧照 03" },
      { src: "images/detail/mf1/frame-04.webp", cap: "剧照 04" },
      { src: "images/detail/mf1/frame-05.webp", cap: "剧照 05" },
      { src: "images/detail/mf1/frame-06.webp", cap: "剧照 06" },
    ],
    note: "学生短片作品。"
  },

  "event-01": {
    kicker: "纪 实 / 5:00",
    facts: [
      ["项目", "青春的底色 · 百千万工程纪实"],
      ["性质", "纪实片"],
      ["年份", "2025"],
      ["片长", "5:00"],
      ["跟拍", "人物与场景"],
      ["职责", "摄影 / 剪辑"],
    ],
    brief: [
      "跟拍记录 + 场景空镜 + 人物采访，5 分钟成片。",
      "我负责摄影与剪辑：跟拍机位、采访布光、以及事件线与人物线的交叉剪辑。",
    ],
    approach: [
      { h: "跟拍机位", p: "手持跟拍为主，保持人物在画面里的稳定位置，走动时不丢焦。" },
      { h: "采访布光", p: "室内采访用柔光做主光，背景压暗，让人物从环境里出来。" },
      { h: "交叉剪辑", p: "事件线和人物线交替，避免变成流水账。" },
    ],
    frames: [
      { src: "images/detail/ev01/frame-01.webp", cap: "现场 01" },
      { src: "images/detail/ev01/frame-02.webp", cap: "现场 02" },
      { src: "images/detail/ev01/frame-03.webp", cap: "现场 03" },
      { src: "images/detail/ev01/frame-04.webp", cap: "现场 04" },
      { src: "images/detail/ev01/frame-05.webp", cap: "现场 05" },
      { src: "images/detail/ev01/frame-06.webp", cap: "现场 06" },
    ],
    note: "现场记录，非摆拍。"
  },

  "event-03": {
    kicker: "LIVE EVENT / 1:34",
    facts: [
      ["项目", "五四汇演 · 校园汇演"],
      ["性质", "活动记录"],
      ["年份", "2025"],
      ["片长", "1:34"],
      ["机位", "舞台 + 观众"],
      ["职责", "摄影 / 剪辑"],
    ],
    brief: [
      "舞台汇演的现场记录，1 分 34 秒。",
      "负责摄影与剪辑：舞台机位、观众反应、以及按节目节奏剪出高光。",
    ],
    approach: [
      { h: "机位分工", p: "舞台正面主机位保表演，侧机位抓群像和观众反应。" },
      { h: "现场收音", p: "以现场声为主，保留掌声和欢呼，不额外配音。" },
      { h: "高光剪辑", p: "按节目切段，每个节目留最有力的一两个动作。" },
    ],
    frames: [
      { src: "images/detail/ev03/frame-01.webp", cap: "现场 01" },
      { src: "images/detail/ev03/frame-02.webp", cap: "现场 02" },
      { src: "images/detail/ev03/frame-03.webp", cap: "现场 03" },
      { src: "images/detail/ev03/frame-04.webp", cap: "现场 04" },
      { src: "images/detail/ev03/frame-05.webp", cap: "现场 05" },
      { src: "images/detail/ev03/frame-06.webp", cap: "现场 06" },
    ],
    note: "现场记录，非摆拍。"
  },

  "event-05": {
    kicker: "EVENT FILM / 0:40",
    facts: [
      ["项目", "夏季嘉年华 · 校园活动"],
      ["性质", "活动记录"],
      ["年份", "2025"],
      ["片长", "0:40"],
      ["机位", "快剪"],
      ["职责", "摄影 / 剪辑"],
    ],
    brief: [
      "校园嘉年华的现场快剪，40 秒。",
      "负责摄影与剪辑：手持跟拍 + 快速剪辑，用音乐卡点。",
    ],
    approach: [
      { h: "手持跟拍", p: "跟着人流走，抓互动和笑脸，画面保持动势。" },
      { h: "卡点剪辑", p: "按音乐重音切镜头，短镜头堆节奏。" },
    ],
    frames: [
      { src: "images/detail/ev05/frame-01.webp", cap: "现场 01" },
      { src: "images/detail/ev05/frame-02.webp", cap: "现场 02" },
      { src: "images/detail/ev05/frame-03.webp", cap: "现场 03" },
      { src: "images/detail/ev05/frame-04.webp", cap: "现场 04" },
      { src: "images/detail/ev05/frame-05.webp", cap: "现场 05" },
      { src: "images/detail/ev05/frame-06.webp", cap: "现场 06" },
    ],
    note: "现场记录，非摆拍。"
  },

  "event-08": {
    kicker: "BRAND EVENT / 0:31",
    facts: [
      ["项目", "极氪 · 品牌活动"],
      ["性质", "品牌活动记录"],
      ["年份", "2025"],
      ["片长", "0:31"],
      ["机位", "展台 + 氛围"],
      ["职责", "摄影 / 剪辑"],
    ],
    brief: [
      "品牌活动现场记录，31 秒。",
      "负责摄影与剪辑：展台产品特写、现场氛围、以及快节奏成片。",
    ],
    approach: [
      { h: "展台特写", p: "产品细节和展台布置优先，保证品牌露出清晰。" },
      { h: "氛围镜头", p: "人流、互动、灯光，补足现场感。" },
      { h: "快剪", p: "短镜头拼接，控制在 30 秒左右。" },
    ],
    frames: [
      { src: "images/detail/ev08/frame-01.webp", cap: "现场 01" },
      { src: "images/detail/ev08/frame-02.webp", cap: "现场 02" },
      { src: "images/detail/ev08/frame-03.webp", cap: "现场 03" },
      { src: "images/detail/ev08/frame-04.webp", cap: "现场 04" },
      { src: "images/detail/ev08/frame-05.webp", cap: "现场 05" },
      { src: "images/detail/ev08/frame-06.webp", cap: "现场 06" },
    ],
    note: "现场记录，非摆拍。"
  },

  "event-11": {
    kicker: "BRAND EVENT / 0:29",
    facts: [
      ["项目", "蒙牛 · 品牌活动"],
      ["性质", "品牌活动记录"],
      ["年份", "2025"],
      ["片长", "0:29"],
      ["机位", "展台 + 氛围"],
      ["职责", "摄影 / 剪辑"],
    ],
    brief: [
      "品牌活动现场记录，29 秒。",
      "负责摄影与剪辑：展台、产品、互动环节的快剪。",
    ],
    approach: [
      { h: "展台与产品", p: "先拍清品牌和产品，再拍人。" },
      { h: "互动抓拍", p: "抓参与者的反应，让片子有人气。" },
      { h: "统一节奏", p: "短镜头 + 音乐，收在品牌落版。" },
    ],
    frames: [
      { src: "images/detail/ev11/frame-01.webp", cap: "现场 01" },
      { src: "images/detail/ev11/frame-02.webp", cap: "现场 02" },
      { src: "images/detail/ev11/frame-03.webp", cap: "现场 03" },
      { src: "images/detail/ev11/frame-04.webp", cap: "现场 04" },
      { src: "images/detail/ev11/frame-05.webp", cap: "现场 05" },
      { src: "images/detail/ev11/frame-06.webp", cap: "现场 06" },
    ],
    note: "现场记录，非摆拍。"
  },

  "event-12": {
    kicker: "CAMPUS EVENT / 1:21",
    facts: [
      ["项目", "香港珠海学院 · 院校活动"],
      ["性质", "院校活动记录"],
      ["年份", "2025"],
      ["片长", "1:21"],
      ["机位", "仪式 + 场馆"],
      ["职责", "摄影 / 剪辑"],
    ],
    brief: [
      "院校活动记录，1 分 21 秒。",
      "负责摄影与剪辑：仪式流程、场馆空间、以及人物采访片段。",
    ],
    approach: [
      { h: "流程跟拍", p: "按仪式流程走位，保证关键环节不缺镜头。" },
      { h: "空间空镜", p: "场馆、校徽、环境，用来做转场和呼吸。" },
      { h: "结构剪辑", p: "仪式 + 人物 + 空镜三段式，控制在一分半内。" },
    ],
    frames: [
      { src: "images/detail/ev12/frame-01.webp", cap: "现场 01" },
      { src: "images/detail/ev12/frame-02.webp", cap: "现场 02" },
      { src: "images/detail/ev12/frame-03.webp", cap: "现场 03" },
      { src: "images/detail/ev12/frame-04.webp", cap: "现场 04" },
      { src: "images/detail/ev12/frame-05.webp", cap: "现场 05" },
      { src: "images/detail/ev12/frame-06.webp", cap: "现场 06" },
    ],
    note: "现场记录，非摆拍。"
  },

  "creative-01": {
    kicker: "STOP MOTION / 2:45",
    facts: [
      ["项目", "时空 · 定格动画"],
      ["性质", "创意短片"],
      ["年份", "2025"],
      ["片长", "2:45"],
      ["职责", "摄影 / 剪辑 / 创意"],
    ],
    brief: [
      "定格动画创意短片，2 分 45 秒，逐帧拍摄完成。",
      "负责创意、逐帧拍摄与剪辑：每一帧都要重新摆位，灯光和机位不能动。",
    ],
    approach: [
      { h: "逐帧拍摄", p: "相机固定、灯光固定，每拍一帧移动一次道具，保证动作连贯。" },
      { h: "光比稳定", p: "全程用同一组灯，避免帧与帧之间亮度跳变。" },
      { h: "剪辑节奏", p: "按帧率还原动作，再用剪辑控制快慢与停顿。" },
    ],
    frames: [
      { src: "images/detail/cr01/frame-01.webp", cap: "画面 01" },
      { src: "images/detail/cr01/frame-02.webp", cap: "画面 02" },
      { src: "images/detail/cr01/frame-03.webp", cap: "画面 03" },
      { src: "images/detail/cr01/frame-04.webp", cap: "画面 04" },
      { src: "images/detail/cr01/frame-05.webp", cap: "画面 05" },
      { src: "images/detail/cr01/frame-06.webp", cap: "画面 06" },
    ],
    note: "创意短片，逐帧拍摄。"
  },

  "creative-03": {
    kicker: "SHORT FORM / 0:07",
    facts: [
      ["项目", "国庆节 · 节日创意"],
      ["性质", "创意短片"],
      ["年份", "2025"],
      ["片长", "0:07"],
      ["职责", "摄影 / 剪辑 / 创意"],
    ],
    brief: [
      "7 秒节日创意短片，为一组节日内容做的开场。",
      "负责创意、拍摄与剪辑：一个镜头讲完一件事，节奏要快。",
    ],
    approach: [
      { h: "一镜到底", p: "7 秒只留一个核心动作，不堆信息。" },
      { h: "卡点", p: "动作与音乐重音对齐，结尾留半秒落版。" },
    ],
    frames: [
      { src: "images/detail/cr03/frame-01.webp", cap: "画面 01" },
      { src: "images/detail/cr03/frame-02.webp", cap: "画面 02" },
      { src: "images/detail/cr03/frame-03.webp", cap: "画面 03" },
      { src: "images/detail/cr03/frame-04.webp", cap: "画面 04" },
      { src: "images/detail/cr03/frame-05.webp", cap: "画面 05" },
    ],
    note: "创意短片。"
  }
};
