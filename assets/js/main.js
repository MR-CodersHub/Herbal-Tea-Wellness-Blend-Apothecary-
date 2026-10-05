/* ============================================================
   VERDANA APOTHECARY — Global JavaScript
   ============================================================ */

'use strict';

// ─── THEME MANAGEMENT ───
const ThemeManager = (() => {
  const KEY = 'verdana-theme';
  // NOTE: buttons are queried fresh every time (navbar is injected
  // dynamically on DOMContentLoaded — a cached NodeList would stay empty
  // and the toggle would silently do nothing).
  function btns() { return document.querySelectorAll('[data-theme-toggle]'); }

  function get()       { return localStorage.getItem(KEY) || 'light'; }
  function set(theme)  { localStorage.setItem(KEY, theme); apply(theme); }
  function apply(theme){
    document.documentElement.setAttribute('data-theme', theme);
    const sunSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px;"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    const moonSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px;"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    btns().forEach(btn => {
      btn.innerHTML = theme === 'dark' ? sunSVG : moonSVG;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }
  function toggle() { set(get() === 'dark' ? 'light' : 'dark'); }

  function init() {
    apply(get());
    btns().forEach(btn => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', toggle);
    });
  }
  return { init, toggle, get };
})();

// ─── RTL SUPPORT ───
const RTLManager = (() => {
  const KEY = 'verdana-dir';
  function get()      { return localStorage.getItem(KEY) || 'ltr'; }
  function apply(dir) {
    document.documentElement.setAttribute('dir', dir);
    const isRTL = dir === 'rtl';
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(isRTL));
      btn.setAttribute('aria-label', isRTL ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
      btn.classList.toggle('is-active', isRTL);
      const label = btn.querySelector('.rtl-label');
      if (label) label.textContent = isRTL ? 'LTR' : 'RTL';
    });
  }
  function toggle()   {
    const next = get() === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem(KEY, next);
    apply(next);
  }
  function init() {
    apply(get());
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn =>
      btn.addEventListener('click', toggle)
    );
  }
  return { init };
})();

// ─── NAVBAR ───
const NavbarManager = (() => {
  function init() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hamburger
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay    = document.querySelector('.mobile-overlay');
    const closeBtn   = document.querySelector('.mobile-close');

    function openMenu() {
      hamburger?.classList.add('open');
      mobileMenu?.classList.add('open');
      overlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      overlay?.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
      mobileMenu?.classList.contains('open') ? closeMenu() : openMenu();
    });
    overlay?.addEventListener('click', closeMenu);
    closeBtn?.addEventListener('click', closeMenu);

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    // Active link
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
  }
  return { init };
})();

// ─── SCROLL ANIMATIONS ───
const ScrollAnimator = (() => {
  let observer;

  function init() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger children
          const children = entry.target.querySelectorAll('[data-stagger]');
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 100);
          });
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-aos], .img-reveal').forEach(el => {
      observer.observe(el);
    });
  }
  return { init };
})();

// ─── COUNTER ANIMATION ───
const CounterAnimation = (() => {
  function animateCounter(el, target, duration = 2000) {
    const start    = 0;
    const step     = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value    = Math.floor(progress * (target - start) + start);
      el.textContent = value.toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
    };
    let startTime;
    requestAnimationFrame(step);
  }

  function init() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target, parseInt(entry.target.dataset.counter));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
  }
  return { init };
})();

// ─── ACCORDION ───
const AccordionManager = (() => {
  function init() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item   = header.closest('.accordion-item');
        const parent = item.closest('.accordion-wrap');
        const isOpen = item.classList.contains('open');

        // Close siblings if exclusive
        if (parent?.dataset.exclusive !== 'false') {
          parent?.querySelectorAll('.accordion-item.open').forEach(i => {
            if (i !== item) i.classList.remove('open');
          });
        }
        item.classList.toggle('open', !isOpen);
      });
    });
  }
  return { init };
})();

// ─── HERO SLIDER ───
const HeroSlider = (() => {
  function init() {
    const slides  = document.querySelectorAll('.hero-slide');
    const dots    = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function goTo(idx) {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    }
    function autoplay() {
      timer = setInterval(() => goTo(current + 1), 5500);
    }
    function reset() {
      clearInterval(timer);
      autoplay();
    }

    goTo(0);
    autoplay();

    prevBtn?.addEventListener('click', () => { goTo(current - 1); reset(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); reset(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); reset(); }));
  }
  return { init };
})();

// ─── FORM VALIDATION ───
const FormValidator = (() => {
  const rules = {
    required: v => v.trim() !== '',
    email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone:    v => /^\+?[\d\s\-()]{7,}$/.test(v),
    minLen:   (v, l) => v.trim().length >= parseInt(l),
  };

  function validate(field) {
    const value = field.value;
    let valid   = true;
    let msg     = '';

    if (field.hasAttribute('required') && !rules.required(value)) {
      valid = false; msg = 'This field is required.';
    } else if (field.type === 'email' && value && !rules.email(value)) {
      valid = false; msg = 'Enter a valid email address.';
    } else if (field.dataset.minLen && !rules.minLen(value, field.dataset.minLen)) {
      valid = false; msg = `Minimum ${field.dataset.minLen} characters required.`;
    }

    const feedback = field.parentElement.querySelector('.invalid-feedback');
    field.classList.toggle('is-invalid', !valid);
    field.classList.toggle('is-valid',    valid && value !== '');
    if (feedback) feedback.textContent = msg;
    return valid;
  }

  function init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      const fields = form.querySelectorAll('input, textarea, select');

      fields.forEach(field => {
        field.addEventListener('blur', () => validate(field));
        field.addEventListener('input', () => {
          if (field.classList.contains('is-invalid')) validate(field);
        });
      });

      form.addEventListener('submit', e => {
        e.preventDefault();
        let allValid = true;
        fields.forEach(field => { if (!validate(field)) allValid = false; });
        if (allValid) {
          showToast('Message sent successfully! We\'ll be in touch soon.', 'success');
          form.reset();
          fields.forEach(f => f.classList.remove('is-valid', 'is-invalid'));
        }
      });
    });
  }
  return { init };
})();

// ─── TOAST NOTIFICATIONS ───
function showToast(message, type = 'success', duration = 4000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

// ─── SCROLL TO TOP ───
const ScrollTop = (() => {
  function init() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  return { init };
})();

// ─── PROGRESS BARS (animate on scroll) ───
const ProgressBars = (() => {
  function init() {
    const bars = document.querySelectorAll('.progress-bar[data-width]');
    if (!bars.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(bar => obs.observe(bar));
  }
  return { init };
})();

// ─── IMAGE LAZY LOADING ───
const LazyLoader = (() => {
  function init() {
    if ('loading' in HTMLImageElement.prototype) return; // native support
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src   = img.dataset.src || img.src;
          obs.unobserve(img);
        }
      });
    });
    imgs.forEach(img => obs.observe(img));
  }
  return { init };
})();

// ─── TAB SWITCHER ───
const TabManager = (() => {
  function init() {
    document.querySelectorAll('[data-tabs]').forEach(wrap => {
      const triggers = wrap.querySelectorAll('[data-tab]');
      const panels   = wrap.querySelectorAll('[data-panel]');

      function activate(idx) {
        triggers.forEach((t, i) => t.classList.toggle('active', i === idx));
        panels.forEach((p, i) => p.classList.toggle('active', i === idx));
      }
      triggers.forEach((t, i) => t.addEventListener('click', () => activate(i)));
      activate(0);
    });
  }
  return { init };
})();

// ─── FILTER / ISOTOPE-LIKE ───
const FilterManager = (() => {
  function init() {
    document.querySelectorAll('[data-filter-wrap]').forEach(wrap => {
      const filters = wrap.querySelectorAll('[data-filter]');
      const items   = wrap.querySelectorAll('[data-category]');

      filters.forEach(btn => {
        btn.addEventListener('click', () => {
          filters.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.dataset.filter;

          items.forEach(item => {
            if (cat === '*' || item.dataset.category === cat) {
              item.style.display = '';
              item.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  }
  return { init };
})();

// ─── PARALLAX LITE ───
const Parallax = (() => {
  function init() {
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
      els.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.3;
        const rect   = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }
  return { init };
})();

// ─── CHART SPARKLINES (admin) ───
const Charts = (() => {
  function drawLine(canvasId, data, color = '#6B8F71') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const max = Math.max(...data), min = Math.min(...data);
    const step = W / (data.length - 1);

    ctx.clearRect(0, 0, W, H);

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, color + '40');
    grad.addColorStop(1, color + '00');

    ctx.beginPath();
    data.forEach((val, i) => {
      const x = i * step;
      const y = H - ((val - min) / (max - min || 1)) * (H - 10) - 5;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.strokeStyle = color;
    ctx.lineWidth   = 2.5;
    ctx.lineJoin    = 'round';
    ctx.stroke();

    // Fill
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function init() {
    drawLine('revenueChart',  [120,180,150,220,195,280,240,310,270,350,320,410], '#C9A84C');
    drawLine('bookingsChart', [20,35,28,42,38,55,48,62,57,70,65,80], '#6B8F71');
    drawLine('usersChart',    [80,120,100,160,140,200,180,240,220,280,260,320], '#8B7BA8');
    drawLine('salesChart',    [50,80,65,95,85,120,105,140,130,165,155,190], '#C4786E');
  }
  return { init };
})();

// ─── STAR RATING (interactive) ───
const StarRating = (() => {
  function init() {
    document.querySelectorAll('.star-rating-input').forEach(wrap => {
      const stars = wrap.querySelectorAll('.star-btn');
      const input = wrap.querySelector('input[type="hidden"]');

      stars.forEach((star, i) => {
        star.addEventListener('click', () => {
          input.value = i + 1;
          stars.forEach((s, j) => s.classList.toggle('filled', j <= i));
        });
        star.addEventListener('mouseenter', () => {
          stars.forEach((s, j) => s.classList.toggle('hover', j <= i));
        });
      });
      wrap.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
    });
  }
  return { init };
})();

// ─── COUNTDOWN TIMER ───
function startCountdown(targetDateStr, el) {
  if (!el) return;
  function update() {
    const diff = new Date(targetDateStr) - Date.now();
    if (diff <= 0) { el.textContent = 'Launched!'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.querySelectorAll('.countdown-val').forEach((v, i) => {
      v.textContent = [d, h, m, s][i].toString().padStart(2, '0');
    });
  }
  update();
  setInterval(update, 1000);
}

// ─── INIT ALL ───
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  NavbarManager.init();
  ScrollAnimator.init();
  CounterAnimation.init();
  AccordionManager.init();
  HeroSlider.init();
  FormValidator.init();
  ScrollTop.init();
  ProgressBars.init();
  LazyLoader.init();
  TabManager.init();
  FilterManager.init();
  Parallax.init();
  Charts.init();
  StarRating.init();

  // Countdown (Coming Soon page)
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) startCountdown('2026-12-01T00:00:00', countdownEl);

  console.log('%cVerdana Apothecary — Loaded', 'color:#6B8F71;font-size:14px;font-weight:bold;');
});

// ─── CSS ANIMATIONS ───
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .hero-slide { position:absolute; inset:0; opacity:0; transition:opacity 1s ease; }
  .hero-slide.active { opacity:1; position:relative; }
  .tab-panel, [data-panel] { display:none; }
  .tab-panel.active, [data-panel].active { display:block; animation:fadeIn 0.4s ease; }
  [data-tab] { cursor:pointer; }
  .star-btn { cursor:pointer; font-size:1.5rem; color:#ddd; transition:color 0.15s; }
  .star-btn.filled, .star-btn.hover { color:#C9A84C; }
`;
document.head.appendChild(style);

// NOTE: Accordion behaviour is handled solely by AccordionManager above.
// (A duplicate click-handler here previously cancelled the toggle,
// leaving FAQ items stuck and the icon unrotated — removed.)

// ─── PROGRESS BAR ANIMATION (AOS hook) ───
(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
})();

// ─── CHART BAR ANIMATION ───
(function initChartBars() {
  const bars = document.querySelectorAll('.chart-bar-fill');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.width = e.target.style.width; obs.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  bars.forEach(b => { const w = b.style.width; b.style.width = '0'; setTimeout(() => b.style.width = w, 200); obs.observe(b); });
})();

// ─── CLICKABLE BLOG CARDS → blog-detail page ───
(function initBlogCards() {
  function savePost(card) {
    try {
      const img = card.querySelector('img');
      const title = card.querySelector('.blog-title');
      sessionStorage.setItem('verdana-post', JSON.stringify({
        img: img ? img.currentSrc || img.src : '',
        alt: img ? (img.alt || 'Wellness article') : 'Wellness article',
        title: title ? title.textContent.trim() : ''
      }));
    } catch (e) { /* storage unavailable — detail page keeps defaults */ }
  }
  document.querySelectorAll('.blog-card').forEach(card => {
    const target = card.querySelector('a[href*="blog-detail"]');
    if (!target || card.dataset.cardLinked) return;
    card.dataset.cardLinked = '1';
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    const title = card.querySelector('.blog-title');
    if (title) card.setAttribute('aria-label', 'Read article: ' + title.textContent.trim());
    target.addEventListener('click', () => savePost(card));
    const go = () => { savePost(card); location.href = target.getAttribute('href'); };
    card.addEventListener('click', e => {
      if (e.target.closest('a,button')) return; // let inner links behave normally
      go();
    });
    card.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a,button')) {
        e.preventDefault();
        go();
      }
    });
  });
})();

// ─── BLOG DETAIL: show the clicked card's image + title ───
(function initBlogDetailDynamic() {
  const heroImg = document.querySelector('section[aria-label="Article hero"] img');
  if (!heroImg) return; // not on the detail page
  try {
    const data = JSON.parse(sessionStorage.getItem('verdana-post') || 'null');
    if (!data) return;
    if (data.img) heroImg.src = data.img.replace('w=800', 'w=1600');
    if (data.alt) heroImg.alt = data.alt;
    const h1 = document.querySelector('section[aria-label="Article hero"] h1');
    if (h1 && data.title) h1.textContent = data.title;
  } catch (e) { /* keep default hero content */ }
})();

// ─── FILTER BUTTONS ───
(function initFilters() {
  document.querySelectorAll('[data-filter-wrap]').forEach(wrap => {
    const btns = wrap.querySelectorAll('[data-filter]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        const parent = wrap.closest('section') || document;
        const grids = new Set();
        parent.querySelectorAll('[data-category]').forEach(card => {
          const show = filter === '*' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
          card.style.opacity = show ? '' : '0';
          if (card.parentElement) grids.add(card.parentElement);
        });
        // Collapse empty tracks so filtered rows centre instead of
        // leaving a vast gap beside the remaining cards
        grids.forEach(g => g.classList.toggle('is-filtered', filter !== '*'));
      });
    });
  });
})();

// ─── FORM VALIDATION ───
(function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required],[data-min-len]').forEach(field => {
        const fb = field.closest('.form-group')?.querySelector('.invalid-feedback') ||
                   field.nextElementSibling?.classList.contains('invalid-feedback') ? field.nextElementSibling : null;
        field.classList.remove('error');
        const minLen = parseInt(field.dataset.minLen || '0');
        let msg = '';
        if (field.required && !field.value.trim()) msg = 'This field is required.';
        else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) msg = 'Please enter a valid email.';
        else if (minLen && field.value.trim().length < minLen) msg = `Minimum ${minLen} characters required.`;
        if (msg) { valid = false; field.classList.add('error'); if (fb) { fb.textContent = msg; fb.style.display = 'block'; } }
        else if (fb) { fb.style.display = 'none'; }
      });
      if (valid) {
        const btn = form.querySelector('[type=submit]');
        const orig = btn ? btn.innerHTML : '';
        if (btn) { btn.innerHTML = 'Sent! Thank you.'; btn.disabled = true; }
        setTimeout(() => { if (btn) { btn.innerHTML = orig; btn.disabled = false; } form.reset(); }, 3000);
      }
    });
  });
})();

// ─── DATA-AOS OBSERVER ───
(function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;
  const style = document.createElement('style');
  style.textContent = `
    [data-aos]{opacity:0;transform:translateY(24px);transition:opacity 0.6s cubic-bezier(0.25,1,0.5,1),transform 0.6s cubic-bezier(0.25,1,0.5,1);}
    [data-aos="fade-right"]{transform:translateX(-32px);}
    [data-aos="fade-left"]{transform:translateX(32px);}
    [data-aos].aos-in{opacity:1!important;transform:none!important;}
  `;
  document.head.appendChild(style);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.aosDelay ? parseInt(e.target.dataset.aosDelay) : 0;
        setTimeout(() => e.target.classList.add('aos-in'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

