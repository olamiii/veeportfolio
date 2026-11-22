/* Vee — portfolio interactions v2 (no dependencies) */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Split helpers ---------- */
  const splitWords = (el, cls, inner) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
            const w = document.createElement("span");
            w.className = cls;
            w.style.setProperty("--wi", i++);
            if (inner) { const s = document.createElement("span"); s.textContent = part; w.appendChild(s); }
            else w.textContent = part;
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    return i;
  };

  // masked word reveal on headings
  $$("[data-split]").forEach((el) => splitWords(el, "w", true));
  // scroll-lit statement
  const statement = document.querySelector("[data-highlight]");
  if (statement) splitWords(statement, "hw", false);

  /* ---------- Reveal on scroll ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    if (reduce) return (el.textContent = target.toFixed(dec));
    const t0 = performance.now(), dur = 1700;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = (target * (1 - Math.pow(1 - p, 4))).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-count]", e.target).forEach(animateCount);
      if (e.target.matches("[data-count]")) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  $$("[data-fade], [data-split], .band__grid, .portrait__card").forEach((el) => io.observe(el));

  // hero: trigger immediately after fonts settle
  const heroIn = () => $$(".hero [data-fade], .hero [data-split]").forEach((el) => el.classList.add("in"));
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(heroIn));
  setTimeout(heroIn, 1200);

  /* ---------- Scroll-driven effects ---------- */
  const nav = document.querySelector(".nav");
  const portraitImg = document.querySelector(".portrait img");
  const hw = statement ? $$(".hw", statement) : [];
  const projs = $$(".proj");
  const timeline = document.querySelector(".timeline");
  const fill = document.querySelector(".timeline__fill");
  const steps = $$(".tstep");
  const desktop = () => window.innerWidth > 860;
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY, vh = window.innerHeight;

    // nav: glass after scroll, hide on scroll down
    nav.classList.toggle("is-scrolled", y > 20);
    const sheetOpen = document.querySelector(".sheet.is-open");
    nav.classList.toggle("is-hidden", !sheetOpen && y > 400 && y > lastY + 4);
    if (y < lastY - 4 || y < 400) nav.classList.remove("is-hidden");
    lastY = y;

    if (reduce) return;

    // portrait parallax
    if (portraitImg) portraitImg.style.setProperty("--p", `${Math.min(y, 700) * -0.08}px`);

    // statement highlight
    if (statement) {
      const r = statement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.floor(p * hw.length);
      hw.forEach((w, i) => w.classList.toggle("on", i < lit));
    }

    // stacked project cards: scale down cards that are being covered
    if (desktop()) {
      projs.forEach((card, i) => {
        const next = projs[i + 1];
        if (!next) return;
        const nr = next.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        const overlap = Math.min(1, Math.max(0, (cr.bottom - nr.top) / cr.height));
        const depth = projs.length - 1 - i;
        card.style.setProperty("--s", (1 - overlap * 0.05 * Math.min(depth, 2)).toFixed(4));
        card.style.setProperty("--b", (1 - overlap * 0.08).toFixed(4));
      });
    }

    // timeline fill
    if (timeline && fill) {
      const r = timeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height * 0.9)));
      timeline.style.setProperty("--prog", p.toFixed(3));
      steps.forEach((s, i) => s.classList.toggle("is-lit", p >= (i + 0.15) / steps.length));
    }
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  if (reduce) { hw.forEach((w) => w.classList.add("on")); steps.forEach((s) => s.classList.add("is-lit")); }

  /* ---------- Button glow follows cursor ---------- */
  $$(".btn--dark, .btn--light").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", `${e.clientX - r.left}px`);
      b.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Active nav link ---------- */
  const links = $$(".nav__links a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => { if (a.getAttribute("href").startsWith("#")) a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => { const h = a.getAttribute("href"); if (!h.startsWith("#")) return; const s = document.querySelector(h); if (s) spy.observe(s); });

  /* ---------- Mobile sheet ---------- */
  const burger = document.querySelector(".nav__burger");
  const sheet = document.querySelector(".sheet");
  const setSheet = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    sheet.classList.toggle("is-open", open);
    sheet.setAttribute("aria-hidden", String(!open));
    sheet.inert = !open; // closed menu stays out of the keyboard tab order
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setSheet(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", sheet).forEach((a) => a.addEventListener("click", () => setSheet(false)));

  /* ---------- FAQ accordion with height animation ---------- */
  const qas = $$(".qa");
  const openQa = (d) => {
    d.open = true;
    if (reduce) return;
    const a = d.querySelector(".qa__a");
    a.animate([{ height: "0px", opacity: 0 }, { height: a.scrollHeight + "px", opacity: 1 }], { duration: 500, easing: "cubic-bezier(.22,1,.36,1)" });
  };
  const closeQa = (d) => {
    if (reduce) return (d.open = false);
    const a = d.querySelector(".qa__a");
    a.animate([{ height: a.scrollHeight + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 380, easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = () => (d.open = false);
  };
  qas.forEach((d) => d.querySelector("summary").addEventListener("click", (e) => {
    e.preventDefault();
    const willOpen = !d.open;
    qas.forEach((o) => o !== d && o.open && closeQa(o));
    willOpen ? openQa(d) : closeQa(d);
  }));

  /* ---------- Ticker: duplicate track for seamless loop ---------- */
  const track = document.querySelector(".ticker__track");
  if (track) {
    [...track.children].forEach((item) => {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
  }

  /* ---------- Brands marquee: duplicate list for a seamless loop ---------- */
  const brandsTrack = document.querySelector(".brands__track");
  if (brandsTrack) {
    const copy = brandsTrack.querySelector("ul").cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    copy.querySelectorAll("img").forEach((img) => (img.alt = ""));
    brandsTrack.appendChild(copy);
  }

  /* ---------- Light / dark mode ---------- */
  const root = document.documentElement;
  const toggles = $$(".theme-toggle");
  const label = () => toggles.forEach((b) => b.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"));
  label();
  toggles.forEach((b) => b.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  }));
  // follow the system setting until the visitor picks a theme
  if (window.matchMedia) {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) {}
      if (!saved) { root.dataset.theme = e.matches ? "dark" : "light"; label(); }
    });
  }

  /* ---------- Lightbox for image groups ---------- */
  const lb = document.querySelector(".lightbox");
  if (lb && typeof lb.showModal === "function") {
    const lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption");
    let group = [], idx = 0, opener = null;
    const show = (i) => {
      idx = (i + group.length) % group.length;
      const t = group[idx];
      lbImg.src = t.dataset.src;
      lbImg.alt = t.querySelector("img").alt;
      lbCap.textContent = t.dataset.caption + "  (" + (idx + 1) + " of " + group.length + ")";
    };
    $$("[data-lightbox]").forEach((t) => t.addEventListener("click", () => {
      group = $$('[data-lightbox="' + t.dataset.lightbox + '"]');
      opener = t; show(group.indexOf(t)); lb.showModal();
    }));
    lb.querySelector(".lightbox__prev").addEventListener("click", () => show(idx - 1));
    lb.querySelector(".lightbox__next").addEventListener("click", () => show(idx + 1));
    lb.querySelector(".lightbox__close").addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    lb.addEventListener("close", () => { if (opener) opener.focus(); });
  }

  /* ---------- Year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();

/* ---------- Brand page: interactive social tiles (parallax, drag, tap) ---------- */
(() => {
  const tiles = [...document.querySelectorAll(".js-tile")];
  if (!tiles.length) return;
  const hero = tiles[0].closest(".bw-hero");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const depth = [26, -18, -24, 16];
  let dragging = null;
  if (!still && hero) {
    hero.addEventListener("pointermove", (e) => {
      if (dragging || e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tiles.forEach((t, i) => {
        if (t.dataset.dx) return;
        t.style.setProperty("--tx", `${x * depth[i]}px`);
        t.style.setProperty("--ty", `${y * depth[i]}px`);
      });
    });
    hero.addEventListener("pointerleave", () => tiles.forEach((t) => { if (!t.dataset.dx) { t.style.setProperty("--tx", "0px"); t.style.setProperty("--ty", "0px"); } }));
  }
  tiles.forEach((t) => {
    let sx, sy, moved;
    t.addEventListener("pointerdown", (e) => {
      if (getComputedStyle(t).position !== "absolute") return;
      dragging = t; moved = false; sx = e.clientX; sy = e.clientY;
      t.setPointerCapture(e.pointerId); t.classList.add("is-drag");
    });
    t.addEventListener("pointermove", (e) => {
      if (dragging !== t) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      t.style.setProperty("--tx", `${dx}px`); t.style.setProperty("--ty", `${dy}px`);
    });
    const end = () => {
      if (dragging !== t) return;
      dragging = null; t.classList.remove("is-drag");
      t.style.setProperty("--tx", "0px"); t.style.setProperty("--ty", "0px");
    };
    t.addEventListener("pointerup", end); t.addEventListener("pointercancel", end);
    t.addEventListener("click", () => {
      if (moved || still) return;
      t.classList.remove("is-pop"); void t.offsetWidth; t.classList.add("is-pop");
    });
    t.addEventListener("animationend", (e) => { if (e.animationName === "bwPop") t.classList.remove("is-pop"); });
  });
})();
