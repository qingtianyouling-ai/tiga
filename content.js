/* ============================================================================
   content.js — 全站作品数据（唯一数据源）
   ----------------------------------------------------------------------------
   每件作品三行文案：
     title  「名称 · 片种/描述」        卡片第一行（大字）
     desc   「品类 · 规格（时长/张数）」 卡片第二行（小字）
     roles  「我做的事」，斜杠分隔       卡片第三行 + 详情弹层
   排序规则：数组顺序 = 页面顺序；带 video 进「作品」板块（首屏 10 + 展开），
   不带 video 的进「摄影平面」板块（首屏 10 + 展开）。分类名在 catLabels。
   ========================================================================== */
window.portfolio = (function () {
  "use strict";

  var M = "images/web/800/";
  var F = "images/web/1600/";
  var V = "videos/";            /* 原片：已是 H.264，可直接播放 */
  var PV = "videos/web/preview/";

  var catLabels = {
    commercial: "商业广告",
    microfilm: "微电影",
    creative: "创意短片",
    event: "纪实活动",
    poster: "平面摄影",
    landscape: "风光纪实",
    layout: "版式设计",
    brand: "品牌 VI",
    cultural: "重阳节主题"
  };

  /* 分类默认职责（作品没写 roles 时兜底） */
  var DEFAULT_ROLES = {
    event: ["摄影", "剪辑"],
    microfilm: ["摄影", "剪辑"],
    creative: ["摄影", "剪辑", "创意"],
    commercial: ["摄影", "剪辑"],
    landscape: ["摄影", "后期"],
    poster: ["摄影", "后期"],
    layout: ["版式设计"],
    brand: ["视觉设计"],
    cultural: ["视觉设计", "版式设计"]
  };

  /* ── 作品：45 条（视频 25 / 平面 20）────────────────────────────────── */
  var works = [
    /* ── 商业广告 ───────────────────────────────────────────────────── */
    { id: "commercial-07", cat: "commercial", year: "2026", title: "小米 SU7 · 汽车概念短片", desc: "AI 商业产品广告 · 0:40", video: "videos/web/xiaomi-su7.mp4", preview: PV + "xiaomi-su7.mp4", poster: M + "xiaomi-su7.webp", full: F + "xiaomi-su7.webp", roles: ["AI 概念生成", "视觉方向", "成片审阅"] },
    { id: "commercial-08", cat: "commercial", year: "2026", title: "雷鸟眼镜 iO · 产品概念 TVC", desc: "AI 商业产品广告 · 1:20", video: "videos/web/rayneo-io.mp4", preview: PV + "rayneo-io.mp4", poster: M + "rayneo-io.webp", full: F + "rayneo-io.webp", roles: ["AI 概念生成", "逐镜生成", "审阅 / 混音"] },
    { id: "commercial-04", cat: "commercial", year: "2026", title: "保时捷 Taycan Turbo GT · 汽车概念影像", desc: "AI 商业产品广告 · 0:30", video: "videos/web/taycan.mp4", preview: PV + "taycan.mp4", poster: M + "hero-porsche.webp", full: F + "hero-porsche.webp", roles: ["AI 概念生成", "镜头调度", "视觉设计"] },
    { id: "commercial-05", cat: "commercial", year: "2026", title: "iPhone 18 Pro · 产品概念 TVC", desc: "AI 商业产品广告 · 0:30", video: "videos/web/iphone18pro.mp4", preview: PV + "iphone18pro.mp4", poster: M + "cover-iphone18pro.webp", full: F + "cover-iphone18pro.webp", roles: ["AI 概念生成", "工业设计推演", "镜头调度"] },
    { id: "commercial-06", cat: "commercial", year: "2026", title: "iPhone Duo · 双机概念 TVC", desc: "AI 商业产品广告 · 0:30", video: "videos/web/iphoneduo.mp4", preview: PV + "iphoneduo.mp4", poster: M + "cover-iphoneduo.webp", full: F + "cover-iphoneduo.webp", roles: ["AI 创意生成", "运镜推演", "三维解构"] },
    { id: "commercial-02", cat: "commercial", year: "2026", title: "舍得酒 · 水墨品牌短片", desc: "AI 商业产品广告 · 0:50", video: V + "舍得酒.mp4", preview: PV + "舍得酒.mp4", poster: M + "commercial-poster-01.webp", full: F + "commercial-poster-01.webp", roles: ["AI 概念生成", "视觉设计", "创意"] },
    { id: "commercial-01", cat: "commercial", year: "2026", title: "扫地机器人 · TVC 广告", desc: "清洁电器 · 2:20", video: V + "扫地机器人.mp4", preview: PV + "扫地机器人.mp4", poster: M + "commercial-poster-03.webp", full: F + "commercial-poster-03.webp", roles: ["摄影", "剪辑"] },
    { id: "commercial-03", cat: "commercial", year: "2026", title: "HPC 显示器 · TVC 广告", desc: "商业广告 · 0:30", video: V + "HPC显示器.mp4", preview: PV + "HPC显示器.mp4", poster: M + "commercial-poster-02.webp", full: F + "commercial-poster-02.webp", roles: ["摄影", "剪辑"] },

    /* ── 微电影 ─────────────────────────────────────────────────────── */
    { id: "microfilm-01", cat: "microfilm", year: "2025", title: "罪饿 · 校园剧情短片", desc: "剧情微电影 · 11:48 · 一等奖", video: V + "microfilm-01.mp4", preview: PV + "microfilm-01.mp4", poster: M + "microfilm-poster-01.webp", full: F + "microfilm-poster-01.webp", roles: ["摄影", "剪辑"], credit: "大学生原创微电影大赛 · 剧情片一等奖" },
    { id: "microfilm-02", cat: "microfilm", year: "2025", title: "重启今日 · 校园剧情短片", desc: "剧情微电影 · 7:10 · 最佳影片", video: V + "microfilm-02.mp4", preview: PV + "microfilm-02.mp4", poster: M + "microfilm-poster-02.webp", full: F + "microfilm-poster-02.webp", roles: ["摄影", "剪辑"], credit: "2025 创意文化商贸学院最佳学生短片 / 2025 大学生短片电影节最佳影片" },

    /* ── 创意短片 ───────────────────────────────────────────────────── */
    { id: "creative-01", cat: "creative", year: "2025", title: "时空 · 定格动画", desc: "创意短片 · 2:45", video: V + "creative-01.mp4", preview: PV + "creative-01.mp4", poster: M + "creative-poster-01.webp", full: F + "creative-poster-01.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-02", cat: "creative", year: "2025", title: "变速摩天轮 · 变速运镜", desc: "创意短片 · 0:10", video: "videos/web/creative-02.mp4", preview: PV + "creative-02.mp4", poster: M + "creative-poster-02.webp", full: F + "creative-poster-02.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-03", cat: "creative", year: "2025", title: "国庆节 · 节日创意", desc: "创意短片 · 0:07", video: "videos/web/creative-03.mp4", preview: PV + "creative-03.mp4", poster: M + "creative-poster-03.webp", full: F + "creative-poster-03.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-04", cat: "creative", year: "2025", title: "马里奥灯 · 布光创意", desc: "创意短片 · 0:22", video: V + "creative-04.mp4", preview: PV + "creative-04.mp4", poster: M + "creative-poster-04.webp", full: F + "creative-poster-04.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-05", cat: "creative", year: "2025", title: "汽车运镜 · 创意热点", desc: "创意短片 · 0:11", video: "videos/web/creative-05.mp4", preview: PV + "creative-05.mp4", poster: M + "cover-auto-motion.webp", full: F + "cover-auto-motion.webp", roles: ["摄影", "剪辑", "创意"] },

    /* ── 纪实活动 ───────────────────────────────────────────────────── */
    { id: "event-01", cat: "event", year: "2025", title: "青春的底色 · 百千万工程纪实", desc: "行动纪实片 · 5:00", video: V + "青春的底色.mp4", preview: PV + "青春的底色.mp4", poster: M + "event-poster-01.webp", full: F + "event-poster-01.webp", roles: ["摄影"] },
    { id: "event-02", cat: "event", year: "2025", title: "中国联通 · 企业活动纪实", desc: "活动记录 · 1:08", video: V + "中国联通.mp4", preview: PV + "中国联通.mp4", poster: M + "event-poster-02.webp", full: F + "event-poster-02.webp", roles: ["摄影", "剪辑"] },
    { id: "event-03", cat: "event", year: "2025", title: "五四汇演 · 校园汇演", desc: "活动记录 · 1:34", video: V + "五四汇演.mp4", preview: PV + "五四汇演.mp4", poster: M + "event-poster-03.webp", full: F + "event-poster-03.webp", roles: ["摄影", "剪辑"] },
    { id: "event-04", cat: "event", year: "2025", title: "人大代表媒体见面会 · 政务会议", desc: "会议记录 · 1:00", video: V + "人大代表媒体见面会.mp4", preview: PV + "人大代表媒体见面会.mp4", poster: M + "event-poster-04.webp", full: F + "event-poster-04.webp", roles: ["摄影", "剪辑"] },
    { id: "event-05", cat: "event", year: "2025", title: "夏季嘉年华 · 校园活动", desc: "活动记录 · 0:40", video: V + "夏季嘉年华.mp4", preview: PV + "夏季嘉年华.mp4", poster: M + "event-poster-05.webp", full: F + "event-poster-05.webp", roles: ["摄影", "剪辑"] },
    { id: "event-06", cat: "event", year: "2025", title: "工商联新春联谊会 · 商会活动", desc: "活动记录 · 1:05", video: V + "工商联新春联谊会.mp4", preview: PV + "工商联新春联谊会.mp4", poster: M + "event-poster-06.webp", full: F + "event-poster-06.webp", roles: ["摄影", "剪辑"] },
    { id: "event-07", cat: "event", year: "2025", title: "恒丰银行 · 品牌活动", desc: "活动记录 · 1:00", video: V + "恒丰银行.mp4", preview: PV + "恒丰银行.mp4", poster: M + "event-poster-07.webp", full: F + "event-poster-07.webp", roles: ["摄影", "剪辑"] },
    { id: "event-08", cat: "event", year: "2025", title: "极氪 · 品牌活动", desc: "活动记录 · 0:31", video: V + "极氪.mp4", preview: PV + "极氪.mp4", poster: M + "event-poster-08.webp", full: F + "event-poster-08.webp", roles: ["摄影", "剪辑"] },
    { id: "event-09", cat: "event", year: "2025", title: "破蝶重生 · 舞台演出", desc: "演出记录 · 1:02", video: V + "破蝶重生.mp4", preview: PV + "破蝶重生.mp4", poster: M + "event-poster-09.webp", full: F + "event-poster-09.webp", roles: ["摄影", "剪辑"] },
    { id: "event-10", cat: "event", year: "2025", title: "素质街舞 · 校园街舞", desc: "活动记录 · 1:04", video: V + "素质街舞.mp4", preview: PV + "素质街舞.mp4", poster: M + "event-poster-10.webp", full: F + "event-poster-10.webp", roles: ["摄影", "剪辑"] },
    { id: "event-11", cat: "event", year: "2025", title: "蒙牛 · 品牌活动", desc: "活动记录 · 0:29", video: V + "蒙牛.mp4", preview: PV + "蒙牛.mp4", poster: M + "event-poster-11.webp", full: F + "event-poster-11.webp", roles: ["摄影", "剪辑"] },
    { id: "event-12", cat: "event", year: "2025", title: "香港珠海学院 · 院校活动", desc: "活动记录 · 1:21", video: V + "香港珠海学院.mp4", preview: PV + "香港珠海学院.mp4", poster: M + "event-poster-12.webp", full: F + "event-poster-12.webp", roles: ["摄影", "剪辑"] },

    /* ── 摄影平面：产品静物 ─────────────────────────────────────────── */
    { id: "poster-01", cat: "poster", title: "极氪冬日咖啡 · 产品静物", desc: "平面摄影 · 1 张", images: [F + "design-poster-01.webp"], poster: M + "design-poster-01.webp", full: F + "design-poster-01.webp" },
    { id: "poster-02", cat: "poster", title: "极氪咖啡 · 产品静物", desc: "平面摄影 · 1 张", images: [F + "design-poster-02.webp"], poster: M + "cover-poster-02.webp", full: F + "design-poster-02.webp" },
    { id: "poster-03", cat: "poster", title: "极氪联名杯子 · 联名产品", desc: "平面摄影 · 1 张", images: [F + "design-poster-03.webp"], poster: M + "cover-poster-03.webp", full: F + "design-poster-03.webp" },
    { id: "poster-04", cat: "poster", title: "极氪联名饮料 · 联名产品", desc: "平面摄影 · 1 张", images: [F + "design-poster-04.webp"], poster: M + "cover-poster-04.webp", full: F + "design-poster-04.webp" },

    /* ── 摄影平面：风光 ─────────────────────────────────────────────── */
    { id: "landscape-01", cat: "landscape", title: "DJI · 航拍视角", desc: "风光 · 1 张", images: [F + "photo-landscape-01.webp"], poster: M + "cover-landscape-01.webp", full: F + "photo-landscape-01.webp" },
    { id: "landscape-02", cat: "landscape", title: "城中镜 · 城市倒影", desc: "风光 · 1 张", images: [F + "photo-landscape-02.webp"], poster: M + "photo-landscape-02.webp", full: F + "photo-landscape-02.webp" },
    { id: "landscape-03", cat: "landscape", title: "夜春笋 · 城市夜景", desc: "风光 · 1 张", images: [F + "photo-landscape-03.webp"], poster: M + "cover-landscape-03.webp", full: F + "photo-landscape-03.webp" },
    { id: "landscape-04", cat: "landscape", title: "惬意人生 · 生活切片", desc: "风光 · 1 张", images: [F + "photo-landscape-04.webp"], poster: M + "cover-landscape-04.webp", full: F + "photo-landscape-04.webp" },
    { id: "landscape-05", cat: "landscape", title: "海与陆 · 海岸线", desc: "风光 · 1 张", images: [F + "photo-landscape-05.webp"], poster: M + "photo-landscape-05.webp", full: F + "photo-landscape-05.webp" },
    { id: "landscape-06", cat: "landscape", title: "舟游 · 水上行舟", desc: "风光 · 1 张", images: [F + "photo-landscape-06.webp"], poster: M + "photo-landscape-06.webp", full: F + "photo-landscape-06.webp" },
    { id: "landscape-07", cat: "landscape", title: "苏州 · 园林城市", desc: "风光 · 1 张", images: [F + "photo-landscape-07.webp"], poster: M + "photo-landscape-07.webp", full: F + "photo-landscape-07.webp" },
    { id: "landscape-08", cat: "landscape", title: "黄昏摩天轮 · 城市天际线", desc: "风光 · 1 张", images: [F + "photo-landscape-08.webp"], poster: M + "photo-landscape-08.webp", full: F + "photo-landscape-08.webp" },

    /* ── 摄影平面：版式 ─────────────────────────────────────────────── */
    { id: "layout-01", cat: "layout", title: "中国武侠风场景 · 场景视觉", desc: "版式 · 1 张", images: [F + "design-ecommerce-01.webp"], poster: M + "design-ecommerce-01.webp", full: F + "design-ecommerce-01.webp" },
    { id: "layout-02", cat: "layout", title: "咖啡店页面设计 · 网页版式", desc: "版式 · 1 张", images: [F + "design-ecommerce-02.webp"], poster: M + "cover-layout-02.webp", full: F + "design-ecommerce-02.webp" },
    { id: "layout-03", cat: "layout", title: "啤酒 · 产品视觉", desc: "版式 · 1 张", images: [F + "design-ecommerce-03.webp"], poster: M + "design-ecommerce-03.webp", full: F + "design-ecommerce-03.webp" },
    { id: "layout-04", cat: "layout", title: "电影网页设计 · 网页版式", desc: "版式 · 1 张", images: [F + "design-ecommerce-04.webp"], poster: M + "cover-layout-04.webp", full: F + "design-ecommerce-04.webp" },
    { id: "layout-05", cat: "layout", title: "羊城晚报 · 媒体版面", desc: "版式 · 1 张", images: [F + "design-ecommerce-05.webp"], poster: M + "cover-layout-05.webp", full: F + "design-ecommerce-05.webp" },
    { id: "layout-06", cat: "layout", title: "耳机 · 产品视觉", desc: "版式 · 1 张", images: [F + "design-ecommerce-06.webp"], poster: M + "design-ecommerce-06.webp", full: F + "design-ecommerce-06.webp" },

    /* ── 摄影平面：图集 ─────────────────────────────────────────────── */
    { id: "brand-vi", cat: "brand", title: "品牌 VI 手册 · 品牌视觉识别", desc: "品牌 VI · 54 页", kind: "collection", collection: "brand", poster: M + "design-brand-001.webp" },
    { id: "chongyang", cat: "cultural", title: "重阳节主题 · 展板 + 海报 + 文创", desc: "重阳节 · 15 件", kind: "collection", collection: "cultural", poster: M + "cover-chongyang.webp" }
  ];

  /* ── 图集内容 ────────────────────────────────────────────────────────── */
  var brandPages = [];
  for (var i = 1; i <= 55; i++) {
    if (i === 38) continue; /* 038 缺图 */
    var num = (i < 10 ? "00" : i < 100 ? "0" : "") + i;
    brandPages.push({ src: F + "design-brand-" + num + ".webp", thumb: M + "design-brand-" + num + ".webp", name: "VI 手册 · P" + i });
  }

  var collections = {
    brand: {
      title: "品牌 VI 手册",
      summary: "一套完整的品牌视觉识别系统：标志规范、辅助图形、色彩与字体、版式应用与落地物料，共 54 页。",
      items: brandPages
    },
    cultural: {
      title: "重阳节主题",
      summary: "以重阳节为线索的完整视觉方案：一块展板、六张系列海报与八件文创，从节气氛围到落地成品的统一表达。",
      items: [
        { src: F + "chongyang-board.webp", thumb: M + "chongyang-board.webp", name: "重阳节展板" },
        { src: F + "chongyang-poster-01.webp", thumb: M + "chongyang-poster-01.webp", name: "海报 · 敬老" },
        { src: F + "chongyang-poster-02.webp", thumb: M + "chongyang-poster-02.webp", name: "海报 · 期盼" },
        { src: F + "chongyang-poster-03.webp", thumb: M + "chongyang-poster-03.webp", name: "海报 · 牵挂" },
        { src: F + "chongyang-poster-04.webp", thumb: M + "chongyang-poster-04.webp", name: "海报 · 登高" },
        { src: F + "chongyang-poster-05.webp", thumb: M + "chongyang-poster-05.webp", name: "海报 · 盼归" },
        { src: F + "chongyang-poster-06.webp", thumb: M + "chongyang-poster-06.webp", name: "海报 · 采菊" },
        { src: F + "design-cultural-01.webp", thumb: M + "design-cultural-01.webp", name: "文创 · 01" },
        { src: F + "design-cultural-02.webp", thumb: M + "design-cultural-02.webp", name: "文创 · 02" },
        { src: F + "design-cultural-03.webp", thumb: M + "design-cultural-03.webp", name: "文创 · 03" },
        { src: F + "design-cultural-04.webp", thumb: M + "design-cultural-04.webp", name: "文创 · 04" },
        { src: F + "design-cultural-05.webp", thumb: M + "design-cultural-05.webp", name: "文创 · 05" },
        { src: F + "design-cultural-06.webp", thumb: M + "design-cultural-06.webp", name: "文创 · 06" },
        { src: F + "design-cultural-07.webp", thumb: M + "design-cultural-07.webp", name: "文创 · 07" },
        { src: F + "design-cultural-08.webp", thumb: M + "design-cultural-08.webp", name: "文创 · 08" }
      ]
    }
  };

  return {
    works: works,
    collections: collections,
    catLabels: catLabels,
    defaultRoles: DEFAULT_ROLES
  };
})();
