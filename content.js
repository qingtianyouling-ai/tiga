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
    creative: "创意短片",
    event: "纪实活动",
    landscape: "风光纪实"
  };

  /* 分类默认职责（作品没写 roles 时兜底） */
  var DEFAULT_ROLES = {
    event: ["摄影", "剪辑"],
    creative: ["摄影", "剪辑", "创意"],
    commercial: ["摄影", "剪辑"],
    landscape: ["摄影", "后期"]
  };

  /* ── 作品：33 条（视频 25 / 平面 8）────────────────────────────────── */
  var works = [
    /* ── 商业广告 ───────────────────────────────────────────────────── */
    { id: "commercial-07", cat: "commercial", year: "2026", title: "小米 SU7 · 汽车概念短片", desc: "AI 商业产品广告 · 0:40", video: "videos/web/opt-commercial-07.mp4", preview: PV + "xiaomi-su7.mp4", poster: M + "xiaomi-su7.webp", full: F + "xiaomi-su7.webp", roles: ["AI 概念生成", "视觉方向", "成片审阅"] },
    { id: "commercial-08", cat: "commercial", year: "2026", title: "雷鸟眼镜 iO · 产品概念 TVC", desc: "AI 商业产品广告 · 1:20", video: "videos/web/opt-commercial-08.mp4", preview: PV + "rayneo-io.mp4", poster: M + "rayneo-io.webp", full: F + "rayneo-io.webp", roles: ["AI 概念生成", "逐镜生成", "审阅 / 混音"] },
    { id: "commercial-04", cat: "commercial", year: "2026", title: "保时捷 Taycan Turbo GT · 汽车概念影像", desc: "AI 商业产品广告 · 0:30", video: "videos/web/opt-commercial-04.mp4", preview: PV + "taycan.mp4", poster: M + "hero-porsche.webp", full: F + "hero-porsche.webp", roles: ["AI 概念生成", "镜头调度", "视觉设计"] },
    { id: "commercial-05", cat: "commercial", year: "2026", title: "iPhone 18 Pro · 产品概念 TVC", desc: "AI 商业产品广告 · 0:30", video: "videos/web/iphone18pro.mp4", preview: PV + "iphone18pro.mp4", poster: M + "cover-iphone18pro.webp", full: F + "cover-iphone18pro.webp", roles: ["AI 概念生成", "工业设计推演", "镜头调度"] },
    { id: "commercial-06", cat: "commercial", year: "2026", title: "iPhone Duo · 双机概念 TVC", desc: "AI 商业产品广告 · 0:30", video: "videos/web/opt-commercial-06.mp4", preview: PV + "iphoneduo.mp4", poster: M + "cover-iphoneduo.webp", full: F + "cover-iphoneduo.webp", roles: ["AI 创意生成", "运镜推演", "三维解构"] },
    { id: "commercial-02", cat: "commercial", year: "2026", title: "舍得酒 · 水墨品牌短片", desc: "AI 商业产品广告 · 0:50", video: "videos/web/opt-commercial-02.mp4", preview: PV + "舍得酒.mp4", poster: M + "commercial-poster-01.webp", full: F + "commercial-poster-01.webp", roles: ["AI 概念生成", "视觉设计", "创意"] },
    { id: "commercial-01", cat: "commercial", year: "2026", title: "扫地机器人 · TVC 广告", desc: "清洁电器 · 2:20", video: "videos/web/opt-commercial-01.mp4", preview: PV + "扫地机器人.mp4", poster: M + "commercial-poster-03.webp", full: F + "commercial-poster-03.webp", roles: ["摄影", "剪辑"] },
    { id: "commercial-03", cat: "commercial", year: "2026", title: "HPC 显示器 · TVC 广告", desc: "商业广告 · 0:30", video: V + "HPC显示器.mp4", preview: PV + "HPC显示器.mp4", poster: M + "commercial-poster-02.webp", full: F + "commercial-poster-02.webp", roles: ["摄影", "剪辑"] },

    /* ── 微电影 ─────────────────────────────────────────────────────── */

    /* ── 创意短片 ───────────────────────────────────────────────────── */
    { id: "creative-01", cat: "creative", year: "2025", title: "时空 · 定格动画", desc: "创意短片 · 2:45", video: "videos/web/opt-creative-01.mp4", preview: PV + "creative-01.mp4", poster: M + "creative-poster-01.webp", full: F + "creative-poster-01.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-02", cat: "creative", year: "2025", title: "变速摩天轮 · 变速运镜", desc: "创意短片 · 0:10", video: "videos/web/creative-02.mp4", preview: PV + "creative-02.mp4", poster: M + "creative-poster-02.webp", full: F + "creative-poster-02.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-03", cat: "creative", year: "2025", title: "国庆节 · 节日创意", desc: "创意短片 · 0:07", video: "videos/web/creative-03.mp4", preview: PV + "creative-03.mp4", poster: M + "creative-poster-03.webp", full: F + "creative-poster-03.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-04", cat: "creative", year: "2025", title: "马里奥灯 · 布光创意", desc: "创意短片 · 0:22", video: V + "creative-04.mp4", preview: PV + "creative-04.mp4", poster: M + "creative-poster-04.webp", full: F + "creative-poster-04.webp", roles: ["摄影", "剪辑", "创意"] },
    { id: "creative-05", cat: "creative", year: "2025", title: "汽车运镜 · 创意热点", desc: "创意短片 · 0:11", video: "videos/web/creative-05.mp4", preview: PV + "creative-05.mp4", poster: M + "cover-auto-motion.webp", full: F + "cover-auto-motion.webp", roles: ["摄影", "剪辑", "创意"] },

    /* ── 纪实活动 ───────────────────────────────────────────────────── */
    { id: "event-01", cat: "event", year: "2025", title: "青春的底色 · 百千万工程纪实", desc: "行动纪实片 · 5:00", video: "videos/web/opt-event-01.mp4", preview: PV + "青春的底色.mp4", poster: M + "event-poster-01.webp", full: F + "event-poster-01.webp", roles: ["摄影"] },
    { id: "event-02", cat: "event", year: "2025", title: "中国联通 · 企业活动纪实", desc: "活动记录 · 1:08", video: "videos/web/opt-event-02.mp4", preview: PV + "中国联通.mp4", poster: M + "event-poster-02.webp", full: F + "event-poster-02.webp", roles: ["摄影", "剪辑"] },
    { id: "event-03", cat: "event", year: "2025", title: "五四汇演 · 校园汇演", desc: "活动记录 · 1:34", video: "videos/web/opt-event-03.mp4", preview: PV + "五四汇演.mp4", poster: M + "event-poster-03.webp", full: F + "event-poster-03.webp", roles: ["摄影", "剪辑"] },
    { id: "event-04", cat: "event", year: "2025", title: "人大代表媒体见面会 · 政务会议", desc: "会议记录 · 1:00", video: "videos/web/opt-event-04.mp4", preview: PV + "人大代表媒体见面会.mp4", poster: M + "event-poster-04.webp", full: F + "event-poster-04.webp", roles: ["摄影", "剪辑"] },
    { id: "event-05", cat: "event", year: "2025", title: "夏季嘉年华 · 校园活动", desc: "活动记录 · 0:40", video: V + "夏季嘉年华.mp4", preview: PV + "夏季嘉年华.mp4", poster: M + "event-poster-05.webp", full: F + "event-poster-05.webp", roles: ["摄影", "剪辑"] },
    { id: "event-06", cat: "event", year: "2025", title: "工商联新春联谊会 · 商会活动", desc: "活动记录 · 1:05", video: "videos/web/opt-event-06.mp4", preview: PV + "工商联新春联谊会.mp4", poster: M + "event-poster-06.webp", full: F + "event-poster-06.webp", roles: ["摄影", "剪辑"] },
    { id: "event-07", cat: "event", year: "2025", title: "恒丰银行 · 品牌活动", desc: "活动记录 · 1:00", video: "videos/web/opt-event-07.mp4", preview: PV + "恒丰银行.mp4", poster: M + "event-poster-07.webp", full: F + "event-poster-07.webp", roles: ["摄影", "剪辑"] },
    { id: "event-08", cat: "event", year: "2025", title: "极氪 · 品牌活动", desc: "活动记录 · 0:31", video: "videos/web/opt-event-08.mp4", preview: PV + "极氪.mp4", poster: M + "event-poster-08.webp", full: F + "event-poster-08.webp", roles: ["摄影", "剪辑"] },
    { id: "event-09", cat: "event", year: "2025", title: "破蝶重生 · 舞台演出", desc: "演出记录 · 1:02", video: "videos/web/opt-event-09.mp4", preview: PV + "破蝶重生.mp4", poster: M + "event-poster-09.webp", full: F + "event-poster-09.webp", roles: ["摄影", "剪辑"] },
    { id: "event-10", cat: "event", year: "2025", title: "素质街舞 · 校园街舞", desc: "活动记录 · 1:04", video: "videos/web/opt-event-10.mp4", preview: PV + "素质街舞.mp4", poster: M + "event-poster-10.webp", full: F + "event-poster-10.webp", roles: ["摄影", "剪辑"] },
    { id: "event-11", cat: "event", year: "2025", title: "蒙牛 · 品牌活动", desc: "活动记录 · 0:29", video: "videos/web/opt-event-11.mp4", preview: PV + "蒙牛.mp4", poster: M + "event-poster-11.webp", full: F + "event-poster-11.webp", roles: ["摄影", "剪辑"] },
    { id: "event-12", cat: "event", year: "2025", title: "香港珠海学院 · 院校活动", desc: "活动记录 · 1:21", video: "videos/web/opt-event-12.mp4", preview: PV + "香港珠海学院.mp4", poster: M + "event-poster-12.webp", full: F + "event-poster-12.webp", roles: ["摄影", "剪辑"] },

    /* ── 摄影平面：产品静物 ─────────────────────────────────────────── */

    /* ── 摄影平面：风光 ─────────────────────────────────────────────── */
    { id: "landscape-01", cat: "landscape", title: "DJI · 航拍视角", desc: "风光 · 1 张", images: [F + "photo-landscape-01.webp"], poster: M + "cover-landscape-01.webp", full: F + "photo-landscape-01.webp" },
    { id: "landscape-02", cat: "landscape", title: "城中镜 · 城市倒影", desc: "风光 · 1 张", images: [F + "photo-landscape-02.webp"], poster: M + "photo-landscape-02.webp", full: F + "photo-landscape-02.webp" },
    { id: "landscape-03", cat: "landscape", title: "夜春笋 · 城市夜景", desc: "风光 · 1 张", images: [F + "photo-landscape-03.webp"], poster: M + "cover-landscape-03.webp", full: F + "photo-landscape-03.webp" },
    { id: "landscape-04", cat: "landscape", title: "惬意人生 · 生活切片", desc: "风光 · 1 张", images: [F + "photo-landscape-04.webp"], poster: M + "cover-landscape-04.webp", full: F + "photo-landscape-04.webp" },
    { id: "landscape-05", cat: "landscape", title: "海与陆 · 海岸线", desc: "风光 · 1 张", images: [F + "photo-landscape-05.webp"], poster: M + "photo-landscape-05.webp", full: F + "photo-landscape-05.webp" },
    { id: "landscape-06", cat: "landscape", title: "舟游 · 水上行舟", desc: "风光 · 1 张", images: [F + "photo-landscape-06.webp"], poster: M + "photo-landscape-06.webp", full: F + "photo-landscape-06.webp" },
    { id: "landscape-07", cat: "landscape", title: "苏州 · 园林城市", desc: "风光 · 1 张", images: [F + "photo-landscape-07.webp"], poster: M + "photo-landscape-07.webp", full: F + "photo-landscape-07.webp" },
    { id: "landscape-08", cat: "landscape", title: "黄昏摩天轮 · 城市天际线", desc: "风光 · 1 张", images: [F + "photo-landscape-08.webp"], poster: M + "photo-landscape-08.webp", full: F + "photo-landscape-08.webp" }
  ];

  return {
    works: works,
    catLabels: catLabels,
    defaultRoles: DEFAULT_ROLES
  };
})();
