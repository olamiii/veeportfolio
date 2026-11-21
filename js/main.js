/* Vee — portfolio interactions (no dependencies) */
(() => {
  const body = document.body;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Word split for blur-in headline ---------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    let i = 0;
    const wrap = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            const s = document.createElement("span");
            s.className = "word";
            s.style.setProperty("--w", i++);
            s.textContent = p;
            frag.appendChild(s);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !child.classList.contains("spark")) {
          wrap(child);
        }
      });
    };
    wrap(el);
  });

  /* ---------- Rolling button text (Viral) ---------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    if (btn.querySelector(".roll")) return;
    const label = btn.textContent.trim();
    btn.setAttribute("aria-label", label);
    btn.innerHTML = `<span class="roll" aria-hidden="true"><span>${label}</span><span>${label}</span></span>`;
  });

  /* ---------- Preloader ---------- */
  const start = performance.now();
  const ready = () => {
    const wait = Math.max(0, (reduce ? 0 : 900) - (performance.now() - start));
    setTimeout(() => {
      body.classList.add("is-ready");
      body.classList.remove("is-loading");
      document.querySelectorAll(".hero [data-reveal]").forEach((el) => el.classList.add("is-in"));
    }, wait);
  };
  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready, { once: true });
  setTimeout(ready, 3500); // safety net for slow images

  /* ---------- Scroll reveals, counters, bars ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduce) { el.textContent = target.toFixed(decimals); return; }
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-in");
        el.querySelectorAll("[data-count]").forEach(animateCount);
        el.querySelectorAll("[data-bar]").forEach((b) => b.style.setProperty("--w", b.dataset.bar + "%"));
        io.unobserve(el);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll("[data-reveal]:not(.hero [data-reveal]), .fan--cta, .head").forEach((el) => io.observe(el));

  /* ---------- Hero fan: subtle mouse parallax ---------- */
  const fan = document.querySelector(".hero .fan");
  if (fan && !reduce && window.matchMedia("(pointer: fine)").matches) {
    const cards = [...fan.querySelectorAll(".fan__card")];
    let raf;
    window.addEventListener("mousemove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        cards.forEach((c, i) => {
          const depth = 1 - Math.abs(i - 2) * 0.3;
          c.style.setProperty("--px", `${x * 18 * depth}px`);
          c.style.setProperty("--py", `${y * 12 * depth}px`);
        });
      });
    });
  }

  /* ---------- Nav: scrolled state + active link ---------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const links = [...document.querySelectorAll(".nav__pill a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".mobile-menu");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- FAQ: one open at a time, smooth height ---------- */
  const qas = [...document.querySelectorAll(".qa")];
  qas.forEach((qa) => {
    const summary = qa.querySelector("summary");
    const answer = qa.querySelector(".qa__a");
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      const opening = !qa.open;
      qas.forEach((other) => {
        if (other !== qa && other.open) close(other);
      });
      opening ? open(qa) : close(qa);
    });
    function open(d) {
      d.open = true;
      if (reduce) return;
      const a = d.querySelector(".qa__a");
      a.animate([{ height: "0px", opacity: 0 }, { height: a.scrollHeight + "px", opacity: 1 }], { duration: 450, easing: "cubic-bezier(0.22,1,0.36,1)" });
    }
    function close(d) {
      const a = d.querySelector(".qa__a");
      if (reduce) { d.open = false; return; }
      const anim = a.animate([{ height: a.scrollHeight + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 350, easing: "cubic-bezier(0.22,1,0.36,1)" });
      anim.onfinish = () => (d.open = false);
    }
    answer.style.overflow = "hidden";
  });

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
