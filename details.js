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
      "这是我自己定题做的概念片，不是品牌委托。想法是让车晚点出现：先拍沙子上爬的蝎子，再拍车和马一起跑，最后停在云海上。",
      "24 个镜头，39 秒 6。分镜、参考图、生成、剪辑和声音都是我一个人做的。"
    ],
    approach: [
      { h: "先锁产品母版", p: "颜色只用官网 6-3 靛石绿，轮毂固定 21 英寸双层锻造梅花轮毂、红色卡钳，内饰统一砂陶米。这些约束写进每一镜的提示词里，避免镜头之间车「变样」。" },
      { h: "静帧先行", p: "24 张分镜静帧用 Nano Banana Pro 生成，先审静帧再逐镜动画——构图、光比、车的位置不对就重来，不把问题留到视频阶段。" },
      { h: "逐镜生成", p: "视频用即梦（Seedance 2.5），单镜最短 4 秒，生成时留剪辑余量；接口单次整合最长 30 秒，所以分两段生成，最后拼成 39.64 秒，24 镜一个不少。" },
      { h: "剪辑与声音", p: "按 24 镜顺序表拼片，速度来自低机位追拍、前景掠过和轮胎扬尘的真实响应；声音是原创电子/管弦氛围，加沙、轮胎、风、马蹄的实录音效，纯电车不加发动机轰鸣。" }
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
      "雷鸟这副眼镜看着不太像眼镜，所以前 20 秒我全用金属和光做抽象画面，后面才进到有人生活的房间。",
      "30 个镜头，一分二十秒。"
    ],
    approach: [
      { h: "前半段做抽象", p: "前 20 秒只有黑底、金属反光和荧光绿，不出现人；后面切到暖色的房间，画面里开始有人和手。" },
      { h: "参考图锁风格", p: "先用 Nano Banana 出参考图，定下金属质感、环境光和构图，再拿参考图去生成视频，减少镜头之间的漂移。" },
      { h: "逐镜生成再统一", p: "即梦 AI 逐镜生成，每镜检查镜腿比例、佩戴位置和形变，不合格就重生成；最后统一调色和混音。" }
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
      "给一个虚构游戏做的 PV。开场是云海上的浮空岛，然后进遗迹、点亮传送点、放无人机，最后落 logo。",
      "42 秒，12 个镜头。世界观、分镜、生成和剪辑都是我自己来。"
    ],
    approach: [
      { h: "先写世界观", p: "用一句话定世界（浮空岛 + 遗迹文明），再拆成 12 个镜头的功能：建立、人物、奇观、钩子、落版。" },
      { h: "参考图统一质感", p: "Nano Banana 出概念图，锁住写实 CG 的材质、光线和色调，避免不同镜头像两个游戏。" },
      { h: "逐镜生成 + 节奏剪辑", p: "即梦 AI 逐镜生成，按预告片节奏剪：前 10 秒慢、中段加速、结尾留白给 logo。" }
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
      "这条是实拍的产品片：机器在室内地面上工作，拍刷头、尘杯、滤芯和整机。室内光线要控制住地面反光，机身是亮面的，灯位差一点就会花。",
      "拍摄和剪辑都是我自己来。"
    ],
    approach: [
      { h: "先布光再开机", p: "地面压暗、机身用柔光提亮，侧逆光勾边；每一步都先看监视器，确认高光不炸再拍。" },
      { h: "按功能分镜", p: "把产品拆成刷头、尘杯、滤芯、整机几个段落，低机位贴地拍工作状态，手持跟拍补动势。" },
      { h: "剪辑与输出", p: "按卖点分段剪，字幕和音效对齐，同时出竖版和横版两个规格。" }
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
      "显示器这条全程在暗场里拍，屏幕本身就是主光。难的是黑位不能发灰，边框那圈高光不能过曝。",
      "用黑旗压掉多余的反射，屏幕里放游戏画面做内容，30 秒。"
    ],
    approach: [
      { h: "暗场布光", p: "关掉环境光，屏幕亮度作为主光，侧逆光勾边框；用黑旗压掉多余反射。" },
      { h: "屏幕内容对位", p: "拍摄时同步播放素材，保证画面内容、亮度和运镜方向一致。" },
      { h: "剪辑", p: "短节奏卡点，保留黑场呼吸，输出 16:9 与竖版。" }
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
      "舍得这条想用画的方式讲酒。画面参考青绿山水，瓶子放在山水中间，酒液倒进杯子那一下是全片重点。",
      "50 秒，产品镜头和风景镜头交替，最后收在品牌上。"
    ],
    approach: [
      { h: "先把画定下来", p: "青绿山水、金线、宣纸底，这三种质感先在参考图里试，定好之后整条片都按这个画。" },
      { h: "产品一致性", p: "瓶型、标签、瓶盖金顶在每个镜头里保持一致，产品镜头单独盯。" },
      { h: "按水墨节奏剪", p: "镜头之间用墨色流动做过渡，水声、器皿声铺底，节奏跟着墨的扩散走。" }
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
      "想做一条没有转场的车片：尾灯、轮毂、前脸、行驶，四个镜头各一秒左右，硬切。",
      "全片压在冷蓝灰里，只有尾灯是暖的。"
    ],
    approach: [
      { h: "四个镜头讲四件事", p: "尾灯、轮毂、前脸、行驶，每个镜头只拍一个部位，中间不叠化，直接切。" },
      { h: "材质与光", p: "车漆、轮毂、卡钳的材质在参考图阶段定死，生成时只改机位不改材质。" },
      { h: "冷调统一", p: "全片压在冷蓝灰里，尾灯的红是唯一的暖色出口。" }
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
      "手机片我当成在看一件工业品来拍：先贴近镜头模组，再慢慢拉到整机，主要动作就一个「推」。",
      "模组、边框、按键的位置不能变，30 秒。"
    ],
    approach: [
      { h: "从近处开始", p: "先拍模组和边框的细节，再慢慢拉开到整机，不要一开始就摆产品图。" },
      { h: "比例锁定", p: "镜头模组的排列、机身厚度、按键位置在参考图里逐项对，生成时只允许光变。" },
      { h: "节奏", p: "30 秒分三段：细节 → 形态 → 留白落版。" }
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
      "折叠屏最好看的是开合那一下，所以整条片就围绕合起、打开、悬停三个动作做。",
      "中间加了一只手，让人看得出大小，30 秒。"
    ],
    approach: [
      { h: "三个动作", p: "合起来、打开、停在半空中，三个动作各占一段，剪辑跟着动作走。" },
      { h: "铰链与屏幕", p: "铰链结构、折痕、屏幕内容逐镜检查，避免展开后画面漂移。" },
      { h: "加一只手", p: "手一进去，观众就知道这台机器有多大。" }
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

  "event-01": {
    kicker: "纪 实 / 5:00",
    facts: [
      ["项目", "青春的底色 · 百千万工程纪实"],
      ["性质", "纪实片"],
      ["年份", "2025"],
      ["片长", "5:00"],
      ["跟拍", "人物与场景"],
      ["职责", "编剧 / 导演 / 摄影 / 剪辑"],
    ],
    brief: [
      "跟拍学校「百千万工程」突击队的行动，从集合、走访到收工，剪成 5 分钟。",
      "跟拍为主，中间插了几段采访。"
    ],
    approach: [
      { h: "跟拍机位", p: "手持跟拍为主，保持人物在画面里的稳定位置，走动时不丢焦。" },
      { h: "采访布光", p: "室内采访用柔光做主光，背景压暗，让人物从环境里出来。" },
      { h: "两条线交替", p: "事件和人物交替着剪，不按时间顺序一直堆现场。" },
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
      ["职责", "编剧 / 导演 / 摄影 / 剪辑"],
    ],
    brief: [
      "学校五四汇演的现场记录。舞台正面一个机位保表演，侧面一个抓观众反应，按节目剪。"
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
      ["职责", "编剧 / 导演 / 摄影 / 剪辑"],
    ],
    brief: [
      "校园嘉年华当天拍的素材，剪成 40 秒快剪，按音乐重音切。"
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
      ["职责", "编剧 / 导演 / 摄影 / 剪辑"],
    ],
    brief: [
      "极氪品牌活动的现场记录，展台、产品、人流，30 秒。",
      "展会现场光线杂，尽量找干净的角度。"
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
      ["职责", "编剧 / 导演 / 摄影 / 剪辑"],
    ],
    brief: [
      "蒙牛品牌活动的现场记录，拍了展台、产品和人流，剪成 29 秒。"
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
      ["职责", "编剧 / 导演 / 摄影 / 剪辑"],
    ],
    brief: [
      "香港珠海学院的院校活动，拍了仪式、场馆和人物，剪成 1 分 21 秒。"
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
      "定格动画，逐帧摆道具拍出来的。相机和灯固定不动，每拍一帧挪一次东西，最后按帧率还原成动作。",
      "2 分 45 秒。"
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
