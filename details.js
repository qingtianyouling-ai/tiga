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
  }
};
