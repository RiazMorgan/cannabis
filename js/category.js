/*!
 * DANKERY CARTEL — Category Pages JavaScript
 * Shared across: flower.html, concentrates.html, membership.html
 */

document.addEventListener("DOMContentLoaded", () => {
  const hasGsap = typeof gsap !== "undefined";
  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";
  const hasScrollToPlugin = typeof ScrollToPlugin !== "undefined";

  const revealAnimatedContent = () => {
    document.querySelectorAll(".fade-up, .fade-in, .scale-in").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     GSAP PLUGIN REGISTRATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (hasGsap) {
    if (hasScrollTrigger && hasScrollToPlugin) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    } else if (hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  } else {
    revealAnimatedContent();
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     CUSTOM CURSOR
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (hasGsap && dot && ring && window.innerWidth > 768) {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    });

    gsap.ticker.add(() => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
    });

    document
      .querySelectorAll(
        "a, button, .strain-product-card, .vault-nav-card, .tier-card, .perk-detail-card",
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("expanded"));
        el.addEventListener("mouseleave", () =>
          ring.classList.remove("expanded"),
        );
      });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     NAVBAR SCROLL
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
      },
      { passive: true },
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     HAMBURGER MENU
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     HERO ENTRANCE ANIMATION
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (hasGsap) {
    const heroTl = gsap.timeline({ delay: 0.1 });
    heroTl
      .fromTo(
        ".cat-back-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
      )
      .fromTo(
        ".cat-hero-label",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        ".cat-hero-title",
        { opacity: 0, y: 60, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.4",
      )
      .fromTo(
        ".cat-hero-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(
        ".cat-hero-stat",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
        "-=0.5",
      );

    // Parallax on hero bg
    const heroBg = document.querySelector(".cat-hero-bg");
    if (heroBg && hasScrollTrigger) {
      gsap.to(heroBg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".cat-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (hasScrollTrigger) {
      /* ── Scroll-triggered fade-ups ── */
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true },
          },
        );
      });

      gsap.utils.toArray(".fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true },
          },
        );
      });

      /* ── Strain cards stagger ── */
      const strainGrid = document.querySelector(".strain-cards-grid");
      if (strainGrid && document.querySelector(".strain-product-card")) {
        gsap.from(".strain-product-card", {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: strainGrid, start: "top 82%", once: true },
        });
      }



    /* ── Process steps ── */
    if (hasScrollTrigger) {
      gsap.utils.toArray(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".process-steps",
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }

    /* ── Lab metric cards ── */
    if (
      hasScrollTrigger &&
      document.querySelector(".lab-verify-metrics") &&
      document.querySelector(".lab-metric-card")
    ) {
      gsap.from(".lab-metric-card", {
        opacity: 0,
        scale: 0.92,
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".lab-verify-metrics",
          start: "top 85%",
          once: true,
        },
      });
    }

    /* ── Vault nav cards ── */
    if (
      hasScrollTrigger &&
      document.querySelector(".vault-nav-grid") &&
      document.querySelector(".vault-nav-card")
    ) {
      gsap.from(".vault-nav-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vault-nav-grid",
          start: "top 85%",
          once: true,
        },
      });
    }

    /* ── Flavor / Purity bars ── */
    if (
      hasScrollTrigger &&
      document.querySelector(".flavor-bar-group, .purity-bars")
    ) {
      ScrollTrigger.create({
        trigger: ".flavor-bar-group, .purity-bars",
        start: "top 85%",
        once: true,
        onEnter: () => {
          document.querySelectorAll(".flavor-bar-fill").forEach((bar, i) => {
            const tw = (bar.dataset.width || 0) + "%";
            gsap.to(bar, {
              width: tw,
              duration: 1.4,
              delay: i * 0.12,
              ease: "power3.out",
            });
          });
        },
      });
    }

    /* ── Apply section crown ── */
    const applyCrown = document.querySelector(".apply-crown");
    if (applyCrown && hasScrollTrigger) {
      gsap.from(applyCrown, {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: "#apply-section",
          start: "top 70%",
          once: true,
        },
      });
    }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FILTER SYSTEM
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  const productCards = document.querySelectorAll(
    ".strain-product-card[data-type]",
  );

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Filter cards with GSAP animation
      productCards.forEach((card) => {
        const match = filter === "all" || card.dataset.type === filter;
        if (match) {
          card.classList.remove("hidden");
          if (hasGsap) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            );
          }
        } else {
          if (hasGsap) {
            gsap.to(card, {
              opacity: 0,
              y: -10,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => card.classList.add("hidden"),
            });
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SORT SELECT
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const grid =
        document.getElementById("strain-cards-grid") ||
        document.getElementById("concentrate-cards-grid");
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll(".strain-product-card"));
      const val = sortSelect.value;

      cards.sort((a, b) => {
        if (val === "thc") {
          const aThc =
            parseFloat(a.querySelector(".spc-thc")?.textContent) || 0;
          const bThc =
            parseFloat(b.querySelector(".spc-thc")?.textContent) || 0;
          return bThc - aThc;
        }
        if (val === "name") {
          const aName = a.querySelector(".spc-name")?.textContent.trim() || "";
          const bName = b.querySelector(".spc-name")?.textContent.trim() || "";
          return aName.localeCompare(bName);
        }
        if (val === "rarity") {
          const rarityScore = { ultra: 3, rare: 2, common: 1 };
          const aRar =
            rarityScore[a.querySelector(".spc-rarity")?.classList[1]] || 0;
          const bRar =
            rarityScore[b.querySelector(".spc-rarity")?.classList[1]] || 0;
          return bRar - aRar;
        }
        return 0;
      });

      cards.forEach((card, i) => {
        grid.appendChild(card);
        if (hasGsap) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: i * 0.06,
              ease: "power2.out",
            },
          );
        }
      });
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SMOOTH ANCHOR SCROLLING
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (hasGsap) {
        gsap.to(window, {
          duration: 1.1,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power3.inOut",
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const navLinksEl = document.querySelector(".nav-links");
      if (navLinksEl) navLinksEl.classList.remove("mobile-open");
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     VAULT CARD 3D TILT
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document
    .querySelectorAll(".strain-product-card, .vault-nav-card, .tier-card")
    .forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        if (hasGsap) {
          gsap.to(card, {
            rotationY: dx * 5,
            rotationX: -dy * 3,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
      card.addEventListener("mouseleave", () => {
        if (hasGsap) {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        }
      });
    });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     LOAD MORE BUTTON (cosmetic pulse)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const loadMoreBtns = document.querySelectorAll(".load-more-btn");
  loadMoreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (hasGsap) {
        gsap.fromTo(
          btn,
          { scale: 0.96 },
          { scale: 1, duration: 0.4, ease: "elastic.out(1.5, 0.5)" },
        );
      }
      // In production this would trigger a members-only modal or pagination
      btn.innerHTML = `Members Only — <a href="index.html#cta-banner" style="color:var(--gold-base);text-decoration:none;">Apply for Access</a> &nbsp;<i class="fa-solid fa-lock"></i>`;
      btn.disabled = true;
    });
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     TIER CARD HOVER GLOW
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document
    .querySelectorAll(".tier-card:not(.tier-featured)")
    .forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (hasGsap) {
          gsap.to(card, {
            boxShadow: "0 0 40px rgba(212,175,55,0.1)",
            borderColor: "rgba(212,175,55,0.3)",
            duration: 0.3,
          });
        }
      });
      card.addEventListener("mouseleave", () => {
        if (hasGsap) {
          gsap.to(card, {
            boxShadow: "none",
            borderColor: "rgba(212,175,55,0.1)",
            duration: 0.4,
          });
        }
      });
    });
}); // end DOMContentLoaded
