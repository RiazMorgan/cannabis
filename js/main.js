/*!
 * DANKERY CARTEL — Main JavaScript
 * GSAP-powered animations, parallax, interactions
 * v1.0
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AGE GATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initAgeGate() {
  const gate = document.getElementById('age-gate');
  const btnYes = document.getElementById('age-yes');
  const btnNo = document.getElementById('age-no');
  if (!gate) return;

  // Animate gate in
  gsap.fromTo('#age-gate .age-gate-inner',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
  );

  function closeGate() {
    gsap.to(gate, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => { gate.style.display = 'none'; initPage(); }
    });
  }

  btnYes.addEventListener('click', closeGate);
  btnNo.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
})();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE INIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initPage() {

  /* ── Custom Cursor ──────────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.innerWidth > 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    });

    // Ring follows with lag
    gsap.ticker.add(() => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
    });

    // Expand on interactive elements
    document.querySelectorAll('a, button, .vault-card, .accordion-trigger').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
    });
  }

  /* ── Navbar Scroll ──────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Hamburger Mobile ───────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ── Hero Entrance ──────────────────────────────── */
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .fromTo('.hero-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    .fromTo('.hero-title',
      { opacity: 0, y: 60, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' }, '-=0.6')
    .fromTo('.hero-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
    .fromTo('.hero-ctas .btn-primary',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero-ctas .btn-secondary',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.7')
    .fromTo('.hero-scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }, '-=0.3');

  /* ── Hero Parallax & Mouse Float ───────────────── */
  const heroBg     = document.querySelector('.hero-bg');
  const heroTitle  = document.querySelector('.hero-title');
  const smokeParticles = document.querySelectorAll('.smoke-particle');

  // Scroll-based parallax for hero bg
  gsap.to(heroBg, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Mouse tracking parallax
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    const { innerWidth: W, innerHeight: H } = window;
    mouseX = (e.clientX / W - 0.5) * 2; // -1 to 1
    mouseY = (e.clientY / H - 0.5) * 2;
  });

  // Animate smoke particles with different lag factors
  const particleData = Array.from(smokeParticles).map((el, i) => ({
    el,
    lag: 0.04 + i * 0.015,
    strength: 20 + i * 8,
    cx: 0, cy: 0
  }));

  gsap.ticker.add(() => {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Gentle title float
    if (heroTitle) {
      gsap.set(heroTitle, {
        x: targetX * 12,
        y: targetY * 6,
        rotationX: targetY * -3,
        rotationY: targetX * 5
      });
    }

    // Smoke particles float
    particleData.forEach(p => {
      p.cx += (mouseX - p.cx) * p.lag;
      p.cy += (mouseY - p.cy) * p.lag;
      gsap.set(p.el, {
        x: p.cx * p.strength,
        y: p.cy * (p.strength * 0.6)
      });
    });
  });

  /* ── Scroll-triggered Animations ───────────────── */

  // Section fade-ups
  gsap.utils.toArray('.fade-up').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Fade ins
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Scale ins
  gsap.utils.toArray('.scale-in').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  /* ── Manifesto Section ──────────────────────────── */
  gsap.from('#manifesto .manifesto-img-wrap', {
    opacity: 0,
    x: 60,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#manifesto',
      start: 'top 70%',
      once: true
    }
  });

  gsap.from('#manifesto .manifesto-badge', {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    delay: 0.4,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: '#manifesto',
      start: 'top 70%',
      once: true
    }
  });

  /* ── Vault Cards Stagger ────────────────────────── */
  gsap.from('.vault-card', {
    opacity: 0,
    y: 60,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#vault .vault-grid',
      start: 'top 80%',
      once: true
    }
  });

  /* ── Flavor Bars Animation ──────────────────────── */
  ScrollTrigger.create({
    trigger: '.flavor-bar-group',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.flavor-bar-fill').forEach((bar, i) => {
        const targetWidth = (bar.dataset.width || 0) + '%';
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.4,
          delay: i * 0.15,
          ease: 'power3.out'
        });
      });
    }
  });

  /* ── Stats Counter ──────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const decimals = counter.dataset.decimals || 0;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo({ val: 0 }, { val: target }, {
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: function() {
            counter.textContent = parseFloat(this.targets()[0].val).toFixed(decimals) + suffix;
          }
        });
      }
    });
  });

  /* ── Stat Cards Stagger ─────────────────────────── */
  gsap.from('.stat-card', {
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top 80%',
      once: true
    }
  });

  /* ── Terpene Rows Stagger ───────────────────────── */
  gsap.from('.terpene-row', {
    opacity: 0,
    x: -30,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.terpene-table',
      start: 'top 80%',
      once: true
    }
  });

  /* ── FAQ Accordion ──────────────────────────────── */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // Open clicked if wasn't open
      if (!isOpen) {
        item.classList.add('open');
        gsap.from(item.querySelector('.accordion-answer'), {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  });

  /* ── Review Slider ──────────────────────────────── */
  const track  = document.querySelector('.reviews-track');
  const slides = document.querySelectorAll('.review-slide');
  const dots   = document.querySelectorAll('.review-dot');
  const btnPrev = document.getElementById('review-prev');
  const btnNext = document.getElementById('review-next');
  let current = 0;

  function goToSlide(idx) {
    current = (idx + slides.length) % slides.length;
    gsap.to(track, {
      x: `-${current * 100}%`,
      duration: 0.7,
      ease: 'power3.inOut'
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goToSlide(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goToSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Auto-advance slider
  setInterval(() => goToSlide(current + 1), 6000);

  /* ── CTA Banner Entrance ────────────────────────── */
  gsap.from('#cta-banner .cta-crown', {
    opacity: 0,
    scale: 0,
    duration: 0.8,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: '#cta-banner',
      start: 'top 70%',
      once: true
    }
  });

  gsap.from('#cta-banner .cta-heading', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#cta-banner',
      start: 'top 70%',
      once: true
    }
  });

  gsap.from('.countdown-unit', {
    opacity: 0,
    scale: 0.8,
    stagger: 0.1,
    duration: 0.7,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.countdown',
      start: 'top 85%',
      once: true
    }
  });

  /* ── Countdown Timer ────────────────────────────── */
  // Target: 7 days from now (next exclusive drop)
  const dropDate = new Date();
  dropDate.setDate(dropDate.getDate() + 7);
  dropDate.setHours(20, 0, 0, 0);

  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');

  function updateCountdown() {
    const now  = new Date();
    const diff = dropDate - now;
    if (diff <= 0) return;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (cdDays)  cdDays.textContent  = String(d).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
    if (cdMins)  cdMins.textContent  = String(m).padStart(2, '0');
    if (cdSecs)  cdSecs.textContent  = String(s).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── Gold Particles Background (CTA) ───────────── */
  createGoldParticles();

  /* ── Ambient Light Glow on Scroll ──────────────── */
  gsap.to('.hero-bg-overlay', {
    background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.14) 0%, transparent 70%)',
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

} // end initPage

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GOLD PARTICLE SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function createGoldParticles() {
  const canvas = document.getElementById('gold-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PARTICLE_COUNT = 60;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.2),
      alpha: Math.random() * 0.6 + 0.1,
      decay: Math.random() * 0.003 + 0.001
    });
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y < 0) {
        p.x     = Math.random() * canvas.width;
        p.y     = canvas.height + 5;
        p.alpha = Math.random() * 0.5 + 0.1;
        p.vx    = (Math.random() - 0.5) * 0.4;
        p.vy    = -(Math.random() * 0.5 + 0.2);
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = `hsl(${42 + Math.random() * 15}, 90%, 60%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(tick);
  }

  tick();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GSAP PLUGIN REGISTRATION (must happen before any usage)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
// Note: final registration is done inline in HTML after scripts load

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VAULT CARD 3D TILT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.vault-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const cx      = rect.left + rect.width / 2;
      const cy      = rect.top + rect.height / 2;
      const dx      = (e.clientX - cx) / (rect.width / 2);
      const dy      = (e.clientY - cy) / (rect.height / 2);

      gsap.to(card, {
        rotationY: dx * 6,
        rotationX: -dy * 4,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0, rotationX: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SMOOTH ANCHOR SCROLLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 80 },
      ease: 'power3.inOut'
    });
    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.remove('mobile-open');
  });
});
