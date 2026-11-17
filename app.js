/* ============================================================================
   app.js — 渲染 + 交互（原生 JS，零依赖）
   ========================================================================== */
(function () {
  "use strict";

  var P = window.portfolio;
  if (!P) {
    console.error("[tiga] content.js 未加载");
    return;
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var workById = {};
  P.works.forEach(function (w) { workById[w.id] = w; });

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function icon(id, cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (cls) svg.setAttribute("class", cls);
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }
  function catLabel(id) {
    return P.catLabels[id] || id;
  }
  function rolesOf(w) {
    return w.roles && w.roles.length ? w.roles : P.defaultRoles[w.cat] || [];
  }

  /* ── Header / 导航 ────────────────────────────────────────────────────── */
  var header = $("#siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navToggle = $("#navToggle");
  var mobileNav = $("#mobileNav");
  var lastFocused = null;

  function setMobileNav(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    mobileNav.setAttribute("aria-hidden", String(!open));
    mobileNav.classList.toggle("is-open", open);
    document.body.classList.toggle("modal-open", open);
    if (open) {
      lastFocused = document.activeElement;
      var first = mobileNav.querySelector("a");
      if (first) first.focus();
    } else if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  }
  navToggle.addEventListener("click", function () {
    setMobileNav(navToggle.getAttribute("aria-expanded") !== "true");
  });
  $$("[data-mobile-link]").forEach(function (a) {
    a.addEventListener("click", function () { setMobileNav(false); });
  });

  /* ── Hero：精选镜头轮播（保时捷 / 苹果 18 / 舍得酒）+ 滚动淡出 ────────── */
  var hero = $("#top");
  var heroSlides = $$(".hero-slide");
  var heroVideos = $$(".hero-video");
  var heroDots = $$(".hero-dot");
  var heroNow = $("#heroNow");
  var motionToggle = $("#motionToggle");
  var HERO_NAMES = ["小米 SU7 · 自在而行", "雷鸟眼镜 iO", "舍得酒 · 大师勾调"];
  var HERO_FALLBACK = 9000; /* 视频没触发 ended 时的兜底，正常情况由 ended 接力 */
  var heroEnabled = !reducedMotion.matches;
  var heroIndex = 0;
  var heroTimer = null;
  var heroPaused = false;
  var heroOffscreen = false;

  function heroSrcOf(video) {
    var mobile = window.matchMedia("(max-width: 860px)").matches;
    return (mobile && video.getAttribute("data-src-mobile")) || video.getAttribute("data-src");
  }

  function heroLoad(i) {
    var v = heroVideos[i];
    if (!v || v.getAttribute("src")) return;
    v.src = heroSrcOf(v);
    v.setAttribute("preload", "auto");
    v.load();
  }

  function heroPlay() {
    if (!heroEnabled || heroPaused || heroOffscreen) return;
    var v = heroVideos[heroIndex];
    if (!v) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () { /* 被拒时停在封面上 */ });
  }

  function heroStopAll() {
    heroVideos.forEach(function (v) {
      if (!v.paused) v.pause();
    });
  }

  function heroNext() {
    if (!heroEnabled || heroPaused || heroOffscreen || document.hidden) return;
    heroSet(heroIndex + 1);
  }

  /* 一个播完接下一个：优先听 ended，兜底 9 秒（自动播放被拒 / 解码失败时也能走） */
  function heroStartTimer() {
    heroStopTimer();
    if (!heroEnabled || heroPaused || heroOffscreen) return;
    heroTimer = setTimeout(heroNext, HERO_FALLBACK);
  }
  function heroStopTimer() {
    if (heroTimer) {
      clearTimeout(heroTimer);
      heroTimer = null;
    }
  }

  function heroPauseCurrent() {
    var v = heroVideos[heroIndex];
    if (v && !v.paused) v.pause();
  }

  var heroLeaveTimers = new Map();

  function heroSet(i) {
    if (!heroSlides.length) return;
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    heroSlides.forEach(function (s, n) {
      var timer = heroLeaveTimers.get(s);
      if (timer) {
        clearTimeout(timer);
        heroLeaveTimers.delete(s);
        s.classList.remove("is-leaving");
      }
      if (n === heroIndex) {
        s.classList.add("is-active");
      } else if (s.classList.contains("is-active")) {
        /* 旧镜头留在下面垫着，等新镜头淡入完成再收掉，避免中间透黑 */
        s.classList.remove("is-active");
        s.classList.add("is-leaving");
        heroLeaveTimers.set(
          s,
          setTimeout(function () {
            s.classList.remove("is-leaving");
            heroLeaveTimers.delete(s);
          }, 1100)
        );
      }
    });
    heroDots.forEach(function (d, n) {
      var on = n === heroIndex;
      d.classList.toggle("is-active", on);
      d.setAttribute("aria-pressed", String(on));
    });
    if (hero) hero.setAttribute("data-slide", String(heroIndex));
    if (heroNow) heroNow.textContent = HERO_NAMES[heroIndex] || "";

    if (heroEnabled) {
      heroLoad(heroIndex);
      heroVideos.forEach(function (v, n) {
        if (n !== heroIndex && !v.paused) v.pause();
      });
      heroPlay();
      /* 提前把下一镜的元数据拉回来，切换时不至于停在封面上 */
      heroLoad((heroIndex + 1) % heroSlides.length);
      heroStartTimer();
    }
  }

  if (hero && heroSlides.length) {
    if (heroEnabled) {
      heroSet(0);
      heroStartTimer();
    } else {
      /* 降级动效：只显示各镜封面，不播视频、不自动轮播 */
      motionToggle.setAttribute("aria-pressed", "true");
      motionToggle.setAttribute("aria-label", "播放背景视频");
      motionToggle.querySelector("span").textContent = "播放";
    }

    heroDots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        heroSet(Number(dot.getAttribute("data-slide")));
        heroStartTimer();
      });
    });

    motionToggle.addEventListener("click", function () {
      heroPaused = !heroPaused;
      motionToggle.setAttribute("aria-pressed", String(heroPaused));
      motionToggle.setAttribute("aria-label", heroPaused ? "播放背景视频" : "暂停背景视频");
      motionToggle.querySelector("span").textContent = heroPaused ? "播放" : "暂停";
      if (heroPaused) {
        heroStopTimer();
        heroStopAll();
      } else {
        heroEnabled = true;
        heroLoad(heroIndex);
        heroPlay();
        heroStartTimer();
      }
    });

    /* 每条放完自己接力下一条 */
    heroVideos.forEach(function (v) {
      v.addEventListener("ended", heroNext);
    });

    /* 鼠标停在首屏时先停住，方便看画面；移开继续 */
    hero.addEventListener("mouseenter", function () {
      heroStopTimer();
      heroPauseCurrent();
    });
    hero.addEventListener("mouseleave", function () {
      heroPlay();
      heroStartTimer();
    });
    hero.addEventListener("focusin", function () {
      heroStopTimer();
      heroPauseCurrent();
    });
    hero.addEventListener("focusout", function () {
      heroPlay();
      heroStartTimer();
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        heroStopAll();
        heroStopTimer();
      } else {
        heroPlay();
        heroStartTimer();
      }
    });

    /* 滚动进度：文字上移淡出、画面轻微推近、滚出视口后停视频 */
    var heroTick = false;
    function updateHeroProgress() {
      var h = hero.offsetHeight || window.innerHeight;
      var p = Math.min(Math.max(window.scrollY / (h * 0.85), 0), 1);
      hero.style.setProperty("--hp", p.toFixed(3));
      var off = window.scrollY > h * 0.92;
      if (off !== heroOffscreen) {
        heroOffscreen = off;
        if (off) {
          heroStopAll();
          heroStopTimer();
        } else {
          heroPlay();
          heroStartTimer();
        }
      }
    }
    window.addEventListener(
      "scroll",
      function () {
        if (heroTick) return;
        heroTick = true;
        requestAnimationFrame(function () {
          heroTick = false;
          updateHeroProgress();
        });
      },
      { passive: true }
    );
    window.addEventListener("resize", updateHeroProgress);
    updateHeroProgress();
  }

  /* 当前章节高亮 */
  var navLinks = $$("[data-nav]");
  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("data-nav") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ["work", "graphic", "contact"].forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) navObserver.observe(sec);
    });
  }

  /* ── Reveal ──────────────────────────────────────────────────────────── */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (n) { revealObserver.observe(n); });
  } else {
    revealEls.forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ── 作品 / 平面：两个独立网格 ────────────────────────────────────────── */
  var previewTimer = null;
  var previewVideo = null;

  function stopPreview() {
    if (previewTimer) { clearTimeout(previewTimer); previewTimer = null; }
    if (previewVideo) {
      previewVideo.pause();
      previewVideo.removeAttribute("src");
      previewVideo.load();
      previewVideo.classList.remove("is-playing");
      if (previewVideo.parentNode) previewVideo.parentNode.removeChild(previewVideo);
      previewVideo = null;
    }
  }

  function makeCard(work, index) {
    var card = el("article", "work-card");
    var trigger = el("button", "work-trigger");
    trigger.type = "button";
    trigger.setAttribute("data-index", String(index));
    trigger.setAttribute("aria-label", "查看作品：" + work.title);

    var visual = el("span", "work-visual");
    var img = el("img");
    img.src = work.poster;
    img.alt = work.title + " — " + work.desc;
    img.width = 800;
    img.height = 450;
    img.setAttribute("loading", "lazy");
    img.setAttribute("decoding", "async");
    img.addEventListener("error", function () {
      /* 封面加载失败：先用同名大图顶一次，再不行就给个可见占位，不留空白框 */
      if (!work.video) {
        if (work.full && img.getAttribute("data-fallback") !== "1") {
          img.setAttribute("data-fallback", "1");
          img.src = work.full;
          return;
        }
        var ph = el("span", "work-ph", work.title);
        img.replaceWith(ph);
        return;
      }
      var fb = document.createElement("video");
      fb.muted = true;
      fb.playsInline = true;
      fb.preload = "metadata";
      fb.className = "is-fallback";
      fb.setAttribute("muted", "");
      fb.setAttribute("playsinline", "");
      fb.setAttribute("aria-hidden", "true");
      fb.setAttribute("preload", "metadata");
      fb.src = work.video + "#t=0.5";
      img.replaceWith(fb);
    });
    visual.appendChild(img);

    var badges = el("span", "work-badges");
    var kind = el("span", "work-kind");
    kind.appendChild(icon(work.video ? "i-play" : "i-image"));
    kind.appendChild(document.createTextNode(work.video ? "视频" : "图片"));
    var open = el("span", "work-open");
    open.textContent = "查看详情";
    badges.appendChild(kind);
    badges.appendChild(open);
    visual.appendChild(badges);

    var meta = el("span", "work-meta");
    meta.appendChild(el("span", "work-title", work.title));
    var metaRight = el("span", "work-meta-right");
    if (work.year) metaRight.appendChild(el("span", "work-year", work.year));
    metaRight.appendChild(el("span", "work-cat", catLabel(work.cat)));
    meta.appendChild(metaRight);

    var sub = el("span", "work-sub", work.desc);
    var roles = el("span", "work-roles", rolesOf(work).join(" / "));

    trigger.appendChild(visual);
    trigger.appendChild(meta);
    trigger.appendChild(sub);
    trigger.appendChild(roles);
    card.appendChild(trigger);

    /* 悬停静音预览（仅精确指针 + 非降级动效；只加载 5 秒小样，不碰正片） */
    if (work.preview && canHover.matches && !reducedMotion.matches) {
      card.addEventListener("mouseenter", function () {
        if (previewVideo) return;
        previewTimer = setTimeout(function () {
          previewTimer = null;
          var v = document.createElement("video");
          v.muted = true;
          v.loop = true;
          v.playsInline = true;
          v.preload = "none";
          v.setAttribute("muted", "");
          v.setAttribute("playsinline", "");
          v.setAttribute("aria-hidden", "true");
          v.src = work.preview;
          visual.appendChild(v);
          previewVideo = v;
          var p = v.play();
          if (p && p.catch) p.catch(function () { /* 自动播放被拒时保持封面 */ });
          v.classList.add("is-playing");
        }, 220);
      });
      card.addEventListener("mouseleave", stopPreview);
      card.addEventListener("focusout", stopPreview);
    }
    return card;
  }

  function buildGallery(opts) {
    var items = opts.items;
    var grid = $(opts.grid);
    var emptyEl = $(opts.empty);
    var countEl = $(opts.count);
    var filtersEl = $(opts.filters);
    var expandBtn = opts.expand ? $(opts.expand) : null;
    var initial = opts.initial || items.length;
    var unit = opts.unit || "Projects";
    var currentList = items.slice();
    var shown = initial;

    function paint(reset) {
      if (reset) shown = initial;
      stopPreview();
      grid.textContent = "";
      var frag = document.createDocumentFragment();
      currentList.slice(0, shown).forEach(function (w, i) {
        frag.appendChild(makeCard(w, i));
      });
      grid.appendChild(frag);

      emptyEl.classList.toggle("is-visible", currentList.length === 0);
      countEl.textContent =
        currentList.length === items.length
          ? currentList.length + " " + unit
          : currentList.length + " / " + items.length + " " + unit;

      if (expandBtn) {
        var remain = currentList.length - shown;
        expandBtn.hidden = remain <= 0;
        expandBtn.textContent = "展开更多 · 还有 " + remain + " 件";
      }
    }

    function applyFilter(id) {
      currentList = id === "all" ? items.slice() : items.filter(function (w) { return w.cat === id; });
      [].forEach.call(filtersEl.querySelectorAll(".filter"), function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === id));
      });
      paint(true);
    }

    /* 筛选按钮：按数组里分类出现的顺序自动生成 */
    var cats = [];
    items.forEach(function (w) {
      if (cats.indexOf(w.cat) < 0) cats.push(w.cat);
    });
    [{ id: "all", label: "全部" }]
      .concat(cats.map(function (c) { return { id: c, label: catLabel(c) }; }))
      .forEach(function (f, i) {
        var b = el("button", "filter", f.label);
        b.type = "button";
        b.setAttribute("data-filter", f.id);
        b.setAttribute("aria-pressed", String(i === 0));
        b.addEventListener("click", function () { applyFilter(f.id); });
        filtersEl.appendChild(b);
      });

    if (expandBtn) {
      expandBtn.addEventListener("click", function (e) {
        var before = shown;
        shown = currentList.length;
        paint(false);
        /* 键盘（Enter/Space）触发时按钮会随 hidden 消失，焦点掉回 body；
           把焦点送到第一张新卡片，键盘用户不用重新从头 Tab */
        if (e.detail === 0) {
          var firstNew = grid.querySelectorAll(".work-trigger")[before];
          if (firstNew) firstNew.focus();
        }
      });
    }

    grid.addEventListener("click", function (e) {
      var trigger = e.target.closest(".work-trigger");
      if (!trigger) return;
      var work = currentList[Number(trigger.getAttribute("data-index"))];
      if (work) openDialog(work, trigger);
    });

    paint(true);
    return { paint: paint };
  }

  var videoWorks = P.works.filter(function (w) { return !!w.video; });
  var stillWorks = P.works.filter(function (w) { return !w.video; });

  buildGallery({
    items: videoWorks,
    grid: "#workGrid",
    empty: "#workEmpty",
    count: "#workCount",
    filters: "#workFilters",
    expand: "#workExpand",
    initial: 10,
    unit: "Projects"
  });

  buildGallery({
    items: stillWorks,
    grid: "#graphicGrid",
    empty: "#graphicEmpty",
    count: "#graphicCount",
    filters: "#graphicFilters",
    expand: "#graphicExpand",
    initial: 10,
    unit: "Works"
  });


  /* ── 详情弹层 ────────────────────────────────────────────────────────── */
  var dialog = $("#dialog");
  var dialogMedia = $("#dialogMedia");
  var dialogEyebrow = $("#dialogEyebrow");
  var dialogTitle = $("#dialogTitle");
  var dialogDesc = $("#dialogDesc");
  var dialogFacts = $("#dialogFacts");
  var dialogNote = $("#dialogNote");
  var dialogClose = $("#dialogClose");
  var dialogOpen = false;
  var dialogOpener = null;
  var gallery = null;

  var FOCUSABLE = 'a[href],button:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])';

  function factRow(k, v) {
    var row = el("div");
    row.appendChild(el("span", null, k));
    row.appendChild(el("span", null, v));
    return row;
  }

  function closeDialog() {
    if (!dialogOpen) return;
    dialogOpen = false;
    dialog.classList.remove("is-open");
    dialog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    dialogMedia.textContent = "";
    gallery = null;
    if (dialogOpener && dialogOpener.focus) dialogOpener.focus();
    dialogOpener = null;
  }

  function openGallery(collection) {
    var items = collection.items || [];
    var idx = 0;
    var wrap = el("div", "gallery");
    var main = el("div", "gallery-main");
    var mainImg = el("img");
    mainImg.alt = collection.title;
    mainImg.decoding = "async";
    main.appendChild(mainImg);

    function show(i) {
      idx = (i + items.length) % items.length;
      mainImg.src = items[idx].src;
      mainImg.alt = items[idx].name + " — " + collection.title;
      $$(".gallery-thumb", thumbs).forEach(function (t, n) {
        t.setAttribute("aria-current", String(n === idx));
      });
      var cur = thumbs.querySelectorAll(".gallery-thumb")[idx];
      if (cur && cur.scrollIntoView) {
        cur.scrollIntoView({ block: "nearest", inline: "center", behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    }

    wrap.appendChild(main);

    if (items.length > 1) {
      var prev = el("button", "gallery-nav gallery-prev");
      prev.type = "button";
      prev.setAttribute("aria-label", "上一张");
      prev.appendChild(icon("i-prev"));
      prev.addEventListener("click", function () { show(idx - 1); });
      var next = el("button", "gallery-nav gallery-next");
      next.type = "button";
      next.setAttribute("aria-label", "下一张");
      next.appendChild(icon("i-next"));
      next.addEventListener("click", function () { show(idx + 1); });
      main.appendChild(prev);
      main.appendChild(next);
    }

    var thumbs = el("div", "gallery-thumbs");
    items.forEach(function (item, i) {
      var t = el("button", "gallery-thumb");
      t.type = "button";
      t.setAttribute("aria-label", item.name);
      var ti = el("img");
      ti.src = item.thumb || item.src;
      ti.alt = "";
      ti.setAttribute("loading", "lazy");
      ti.setAttribute("decoding", "async");
      t.appendChild(ti);
      t.addEventListener("click", function () { show(i); });
      thumbs.appendChild(t);
    });
    wrap.appendChild(thumbs);

    dialogMedia.appendChild(wrap);
    show(0);

    return {
      next: function () { show(idx + 1); },
      prev: function () { show(idx - 1); },
      count: items.length
    };
  }

  function openDialog(work, opener) {
    stopPreview();
    dialogOpener = opener || null;
    dialogMedia.textContent = "";
    gallery = null;

    if (work.video) {
      var v = document.createElement("video");
      v.src = work.video;
      v.poster = work.poster || work.full;
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      /* 静音起播：浏览器允许自动播放，点开就能看到动效而不是一张静止画面 */
      v.muted = true;
      v.setAttribute("muted", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("controls", "");
      v.setAttribute("aria-label", work.title);
      dialogMedia.appendChild(v);

      var audioBtn = el("button", "dialog-audio");
      audioBtn.type = "button";
      audioBtn.textContent = "开启声音";
      audioBtn.setAttribute("aria-pressed", "false");
      audioBtn.addEventListener("click", function () {
        v.muted = !v.muted;
        if (v.muted) v.setAttribute("muted", "");
        else v.removeAttribute("muted");
        audioBtn.textContent = v.muted ? "开启声音" : "关闭声音";
        audioBtn.setAttribute("aria-pressed", String(!v.muted));
        if (!v.muted) {
          var ap = v.play();
          if (ap && ap.catch) ap.catch(function () {});
        }
      });
      dialogMedia.appendChild(audioBtn);

      var p = v.play();
      if (p && p.catch) p.catch(function () { /* 被拒时停在封面上，用户可点播放 */ });
    } else {
      var imgs = work.images && work.images.length ? work.images : [work.full || work.poster];
      if (imgs.length > 1) {
        gallery = openGallery({ title: work.title, items: imgs.map(function (s, i) {
          return { src: s, thumb: i === 0 ? work.poster : s, name: work.title + " · " + (i + 1) };
        }) });
      } else {
        var img = el("img");
        img.src = imgs[0];
        img.alt = work.title + " — " + work.desc;
        img.decoding = "async";
        dialogMedia.appendChild(img);
      }
    }

    dialogEyebrow.textContent = catLabel(work.cat) + " / " + (work.video ? "视频" : "图片");
    dialogTitle.textContent = work.title;
    dialogDesc.textContent = work.desc;

    dialogFacts.textContent = "";
    dialogFacts.appendChild(factRow("职责", rolesOf(work).join(" / ")));
    if (work.credit) dialogFacts.appendChild(factRow("荣誉", work.credit));

    dialogNote.textContent = work.video
      ? "视频为网页压缩版，原片请向本人索取。"
      : "图片为网页压缩版，原图请向本人索取。";

    dialogOpen = true;
    dialog.classList.add("is-open");
    dialog.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    dialogClose.focus();
  }

  dialogClose.addEventListener("click", closeDialog);
  dialog.addEventListener("mousedown", function (e) {
    if (e.target === dialog) closeDialog();
  });

  /* 焦点陷阱 + 键盘 */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (dialogOpen) { closeDialog(); return; }
      if (navToggle.getAttribute("aria-expanded") === "true") { setMobileNav(false); return; }
    }
    if (!dialogOpen) return;
    if (e.key === "Tab") {
      var items = $$(FOCUSABLE, dialog).filter(function (n) { return n.offsetParent !== null; });
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (gallery) {
      if (e.key === "ArrowRight") { e.preventDefault(); gallery.next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); gallery.prev(); }
    }
  });

  /* ── 启动 ────────────────────────────────────────────────────────────── */
  var lastWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    /* 只在宽度真的变化时关闭弹层（移动端地址栏收起会触发 resize） */
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    if (dialogOpen) closeDialog();
  });
})();
