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
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

  /* ---------- Mobile sheet ---------- */
  const burger = document.querySelector(".nav__burger");
  const sheet = document.querySelector(".sheet");
  const setSheet = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    sheet.classList.toggle("is-open", open);
    sheet.setAttribute("aria-hidden", String(!open));
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
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- Year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
