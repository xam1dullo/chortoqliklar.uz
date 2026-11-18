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

  const devModal = document.querySelector('#dev-modal');
  const openDevModalBtn = document.querySelector('#open-dev-modal');
  const devCloseControls = document.querySelectorAll('[data-close-dev-modal]');
  let lastFocused = null;

  const openDevModal = () => {
    if (!devModal) return;
    lastFocused = document.activeElement;
    devModal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      devModal.classList.add('open');
      devModal.querySelector('.dev-modal-close')?.focus();
    });
  };

  const closeDevModal = () => {
    if (!devModal || devModal.hidden) return;
    devModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    window.setTimeout(() => {
      devModal.hidden = true;
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    }, prefersReducedMotion ? 0 : 220);
  };

  openDevModalBtn?.addEventListener('click', openDevModal);
  devCloseControls.forEach((el) => el.addEventListener('click', closeDevModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && devModal && !devModal.hidden) closeDevModal();
  });

  if (document.body.dataset.devPopup === 'auto') {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', openDevModal);
    } else {
      openDevModal();
    }
  }

  const satelliteData = {
    '2014': {
      release: '10',
      date: '2014-02-20',
      title: '2014-yil: Chortoqsoy va dastlabki urbanizatsiya',
      desc: 'Esri Wayback arxivining ilk tasvirlari. Chortoq shahri markazi, Chortoqsoy o‘zani va atrofdagi bog‘lar.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=0.78'
    },
    '2016': {
      release: '388',
      date: '2016-04-20',
      title: '2016-yil: Bahorgi yashil qoplam va sanoat bosqichi',
      desc: 'Intensiv bog‘lar kengayishi va mineral suv ishlab chiqarish infratuzilmasi rivojlangan davr.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=0.83'
    },
    '2018': {
      release: '239',
      date: '2018-11-29',
      title: '2018-yil: Yangi yo‘llar va mahalla hududlari',
      desc: 'Shahar atrofidagi turar-joy massivlari va yo‘l tarmoqlarining kengayishi.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=0.89'
    },
    '2020': {
      release: '29260',
      date: '2020-12-16',
      title: '2020-yil: Ziyoratgoh va shahar obodonlashuvi',
      desc: 'Chortoq markazi, sanatoriy atrofi va yangilangan ichki ko‘chalar ko‘rinishi.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=0.94'
    },
    '2022': {
      release: '45134',
      date: '2022-12-14',
      title: '2022-yil: Yangi qurilishlar va bog‘dorchilik',
      desc: 'Intensiv bog‘lar, issiqxonalar va shahar markazidagi yangi ijtimoiy obyektlar.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=0.98'
    },
    '2024': {
      release: '16453',
      date: '2024-12-12',
      title: '2024-yil: Kengaygan shahar chegaralari',
      desc: 'Chortoq va Qoroskon yo‘nalishidagi yangi turar-joy va tadbirkorlik hududlari.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=1.00'
    },
    '2026': {
      release: '43291',
      date: '2026-10-29',
      title: '2026-yil: Zamonaviy sun’iy yo‘ldosh tasviri',
      desc: 'Chortoq shahri, Chortoqsoy vodiysi, sanatoriy hududi va yangilangan turar-joy massivlari.',
      timelapse: 'https://earthengine.google.com/timelapse#v=41.0692,71.8237,11.5,latLng&t=1.00'
    }
  };

  const satGrid = document.querySelector('#satellite-grid');
  const satYearBtns = [...document.querySelectorAll('[data-sat-year]')];
  const satZoomBtns = [...document.querySelectorAll('[data-sat-zoom]')];
  const satAutoBtn = document.querySelector('#sat-autoplay');
  const satBadgeYear = document.querySelector('#sat-badge-year');
  const satYearTitle = document.querySelector('#sat-year-title');
  const satYearDesc = document.querySelector('#sat-year-desc');
  const satTimelapseLink = document.querySelector('#sat-timelapse-link');

  const tileCenters = {
    14: { cols: [11459, 11460, 11461], rows: [6138, 6139] },
    13: { cols: [5729, 5730, 5731], rows: [3068, 3069] }
  };

  let currentSatYear = '2026';
  let currentSatZoom = 14;
  let autoplayTimer = null;

  const renderSatellite = () => {
    const entry = satelliteData[currentSatYear];
    const center = tileCenters[currentSatZoom];
    if (!satGrid || !entry || !center) return;

    const fragment = document.createDocumentFragment();
    center.rows.forEach((row) => {
      center.cols.forEach((col) => {
        const img = document.createElement('img');
        img.src = `https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/${entry.release}/${currentSatZoom}/${row}/${col}`;
        img.alt = `Chortoq sun’iy yo‘ldosh tasviri, ${currentSatYear}-yil`;
        img.loading = 'lazy';
        fragment.appendChild(img);
      });
    });

    satGrid.replaceChildren(fragment);

    satYearBtns.forEach((btn) => {
      const active = btn.dataset.satYear === currentSatYear;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    satZoomBtns.forEach((btn) => {
      const active = Number(btn.dataset.satZoom) === currentSatZoom;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    if (satBadgeYear) satBadgeYear.textContent = `${currentSatYear} · ${entry.date}`;
    if (satYearTitle) satYearTitle.textContent = entry.title;
    if (satYearDesc) satYearDesc.textContent = entry.desc;
    if (satTimelapseLink) satTimelapseLink.href = entry.timelapse;
  };

  const stopAutoplay = () => {
    if (!autoplayTimer) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
    if (satAutoBtn) {
      satAutoBtn.classList.remove('active');
      satAutoBtn.setAttribute('aria-pressed', 'false');
      satAutoBtn.textContent = 'Avto-ko‘rish';
    }
  };

  satYearBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      stopAutoplay();
      currentSatYear = btn.dataset.satYear || '2026';
      renderSatellite();
    });
  });

  satZoomBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentSatZoom = Number(btn.dataset.satZoom) || 14;
      renderSatellite();
    });
  });

  satAutoBtn?.addEventListener('click', () => {
    if (autoplayTimer) {
      stopAutoplay();
      return;
    }
    const years = Object.keys(satelliteData);
    satAutoBtn.classList.add('active');
    satAutoBtn.setAttribute('aria-pressed', 'true');
    satAutoBtn.textContent = 'To‘xtatish';
    autoplayTimer = window.setInterval(() => {
      const nextIdx = (years.indexOf(currentSatYear) + 1) % years.length;
      currentSatYear = years[nextIdx];
      renderSatellite();
    }, 1800);
  });

  if (satGrid) renderSatellite();
})();
