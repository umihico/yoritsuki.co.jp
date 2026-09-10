// ページのインタラクションJS（全てインライン・外部フェッチなし）。
//   (1) reveal-on-scroll  (2) ナビの現在地ハイライト  (3) 言語・テーマ切替
// 言語トグルは <a href> のままなので JS 無効時は通常遷移にフォールバックする。
// ビルド時に esbuild で最小化されてインライン化される（このファイルはリンタ/整形対象）。
(function () {
  // ---- reveal-on-scroll（表示中の要素は触らないため遅延でもチラつかない） ----
  (function () {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-pending");
        io.observe(el);
      }
    });
  })();

  // ---- スライダー型ナビ（現在地ハイライト） ----
  (function () {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;
    var indicator = nav.querySelector(".nav-indicator");
    var links = Array.prototype.slice.call(nav.querySelectorAll("a"));

    // 論理パス化: 先頭の /en を除去して言語非依存に比較（無遷移トグルでhrefが変わるため）
    var norm = function (href) {
      href = href || "/";
      if (href === "/en") return "/";
      if (href.indexOf("/en/") === 0) return href.slice(3);
      return href;
    };
    var SPY = [
      { id: "capabilities", href: "/#capabilities" },
      { id: "company", href: "/#company" },
      { id: "contact", href: "/#contact" },
      { id: "notice", href: "/publicnotice/" },
    ];
    var intent = null;

    var measure = function () {
      var link = nav.querySelector("a.active");
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.left = link.offsetLeft + "px";
      indicator.style.width = link.offsetWidth + "px";
      indicator.style.opacity = "1";
    };
    var setActive = function (href) {
      links.forEach(function (a) {
        var on = norm(a.getAttribute("href")) === href;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      measure();
    };

    // 公告専用ページ（ja/en）ではナビの「公告」を点灯させる
    var path = window.location.pathname;
    if (path.indexOf("/publicnotice") === 0 || path.indexOf("/en/publicnotice") === 0) {
      setActive("/publicnotice/");
      window.addEventListener("resize", measure);
      document.addEventListener("i18n:changed", measure);
      return;
    }

    var els = SPY.map(function (s) {
      return { id: s.id, href: s.href, el: document.getElementById(s.id) };
    }).filter(function (s) {
      return s.el;
    });
    if (!els.length) {
      window.addEventListener("resize", measure);
      return;
    }

    var raf = 0;
    var update = function () {
      raf = 0;
      if (intent) {
        setActive(intent);
        return;
      }
      var line = window.innerHeight * 0.4;
      var current = null;
      for (var i = 0; i < els.length; i++) {
        if (els[i].el.getBoundingClientRect().top <= line) current = els[i].href;
      }
      var doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = els[els.length - 1].href;
      }
      setActive(current);
    };
    var onScroll = function () {
      if (!raf) raf = requestAnimationFrame(update);
    };
    var applyHashIntent = function () {
      var href = "/" + window.location.hash;
      if (SPY.some(function (s) { return s.href === href; })) {
        intent = href;
        setActive(href);
      }
    };
    var clearIntent = function () {
      if (!intent) return;
      intent = null;
      onScroll();
    };

    if (window.location.hash) applyHashIntent();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", measure);
    window.addEventListener("hashchange", applyHashIntent);
    window.addEventListener("wheel", clearIntent, { passive: true });
    window.addEventListener("touchstart", clearIntent, { passive: true });
    window.addEventListener("keydown", clearIntent);
    window.addEventListener("mousedown", clearIntent);
    document.addEventListener("i18n:changed", function () {
      measure();
    });
  })();

  // ---- 言語・テーマ切替（無遷移・即時） ----
  (function () {
    var root = document.documentElement;

    function applyLang(target) {
      if (target !== "ja" && target !== "en") return;
      var langLink = document.querySelector(".lang-btn");

      // 本文テキスト: .lsw（ライブ）⇄ 直後の <template data-lsa> の中身を入替え
      document.querySelectorAll(".lsw").forEach(function (el) {
        var tpl = el.nextElementSibling;
        if (!tpl || tpl.tagName !== "TEMPLATE" || !tpl.hasAttribute("data-lsa")) return;
        var keep = el.innerHTML;
        el.innerHTML = tpl.innerHTML;
        tpl.innerHTML = keep;
      });
      // 言語依存の内部リンク(href)
      document.querySelectorAll("[data-href-ja][data-href-en]").forEach(function (a) {
        var h = a.getAttribute("data-href-" + target);
        if (h != null) a.setAttribute("href", h);
      });
      // html lang / title / description / canonical / og / URL
      root.setAttribute("lang", target);
      var ti = root.getAttribute("data-title-" + target);
      if (ti) document.title = ti;
      var de = root.getAttribute("data-desc-" + target);
      var dm = document.querySelector('meta[name="description"]');
      if (de && dm) dm.setAttribute("content", de);
      var url = root.getAttribute("data-url-" + target);
      if (url) {
        history.replaceState(history.state, "", url + location.hash);
        var absUrl = location.origin + url;
        var c = document.querySelector('link[rel="canonical"]');
        if (c) c.setAttribute("href", absUrl);
        var ou = document.querySelector('meta[property="og:url"]');
        if (ou) ou.setAttribute("content", absUrl);
      }
      var ol = document.querySelector('meta[property="og:locale"]');
      if (ol) ol.setAttribute("content", target === "en" ? "en_US" : "ja_JP");
      var ola = document.querySelector('meta[property="og:locale:alternate"]');
      if (ola) ola.setAttribute("content", target === "en" ? "ja_JP" : "en_US");
      try {
        document.cookie = "yoritsuki-lang=" + target + "; path=/; max-age=31536000; samesite=lax";
      } catch (e) {}
      // トグル自身を「反対言語」に更新
      if (langLink) {
        var back = target === "en" ? "ja" : "en";
        langLink.setAttribute("data-lang-target", back);
        var backUrl = root.getAttribute("data-url-" + back);
        if (backUrl) langLink.setAttribute("href", backUrl);
        langLink.textContent = back === "en" ? "EN" : "JA";
        langLink.setAttribute("aria-label", back === "en" ? "Switch to English" : "日本語に切り替え");
      }
      // 依存UI（ナビのハイライト等）へ通知
      document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang: target } }));
    }

    var lang = document.querySelector(".lang-btn");
    if (lang) {
      lang.addEventListener("click", function (e) {
        e.preventDefault();
        applyLang(lang.getAttribute("data-lang-target"));
      });
    }

    var theme = document.querySelector(".theme-toggle");
    if (theme) {
      theme.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        root.setAttribute("data-theme", next);
        var scheme = document.querySelector('meta[name="color-scheme"]');
        if (scheme) scheme.setAttribute("content", next);
        var tc = document.querySelector('meta[name="theme-color"]');
        if (tc) tc.setAttribute("content", next === "light" ? "#f4f7fb" : "#0b1020");
        try {
          localStorage.setItem("yoritsuki-theme", next);
        } catch (e) {}
      });
    }
  })();
})();
