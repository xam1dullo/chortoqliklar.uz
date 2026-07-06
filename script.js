(() => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const backToTop = document.querySelector('.back-to-top');
  const toast = document.querySelector('.toast');
  const form = document.querySelector('#community-form');
  const year = document.querySelector('#current-year');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = new Date().getFullYear();

  const closeNav = () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  const handleScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 24);
    backToTop?.classList.toggle('visible', y > 650);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const formatNumber = (value, decimals) => new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);

  const animateCounter = (element) => {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';

    const target = Number(element.dataset.count || 0);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const decimals = String(target).includes('.') ? 1 : 0;

    if (prefersReducedMotion) {
      element.textContent = `${prefix}${formatNumber(target, decimals)}${suffix}`;
      return;
    }

    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      element.textContent = `${prefix}${formatNumber(current, decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.4] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  };

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput?.value.trim() || '';
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      emailInput?.focus();
      showToast('Email manzilni to‘g‘ri kiriting.');
      return;
    }

    try {
      localStorage.setItem('chortoqliklar-community-email', email);
    } catch (_) {
      // Local storage is optional; the demo should still work without it.
    }

    form.reset();
    showToast('Rahmat! Demo ro‘yxatga muvaffaqiyatli qo‘shildingiz.');
  });
})();
