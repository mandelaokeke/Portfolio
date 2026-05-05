// Theme toggle 
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const pref = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  if(pref === 'light') root.classList.add('light');
  btn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  // Scroll reveal
  const revealItems = document.querySelectorAll('.reveal-section, .reveal');

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      })
    : null;

  revealItems.forEach((item) => {
    if (revealObserver) {
      revealObserver.observe(item);
    } else {
      item.classList.add('is-visible');
    }
  });

  // Projects expand/collapse
  const toggleProjectsBtn = document.getElementById('toggleProjects');
  const extraProjects = document.querySelectorAll('.extra-project');

  if (toggleProjectsBtn && extraProjects.length) {
    toggleProjectsBtn.addEventListener('click', () => {
      const isExpanded = toggleProjectsBtn.getAttribute('aria-expanded') === 'true';

      extraProjects.forEach((project) => {
        project.hidden = isExpanded;
        if (!isExpanded) {
          project.classList.add('is-visible');
        }
      });

      toggleProjectsBtn.setAttribute('aria-expanded', String(!isExpanded));
      toggleProjectsBtn.textContent = isExpanded ? 'View more projects' : 'View fewer projects';
    });
  }

// --- Safety: make sure the mobile menu toggles on phones ---
(function () {
    const btn = document.getElementById('menuToggle');
    const nav = document.getElementById('primaryNav');
    if (!btn || !nav) return;
  
    // Avoid double-binding if your earlier code already ran
    if (btn.__menuBound) return;
  
    function closeMenu() {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
    function openMenu() {
      nav.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
    }
  
    // Click (desktop + many mobiles)
    btn.addEventListener('click', () => {
      nav.classList.contains('open') ? closeMenu() : openMenu();
    }, { passive: true });
  
    // Touchstart (fixes the “non-responsive on iOS” edge case)
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault(); // stop double-trigger
      nav.classList.contains('open') ? closeMenu() : openMenu();
    }, { passive: false });
  
    // Close when a nav link is tapped
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeMenu, { passive: true })
    );
  
    // Close on Escape and when resizing to desktop
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); }, { passive: true });
    const mq = window.matchMedia('(min-width: 701px)');
    (mq.addEventListener ? mq.addEventListener : mq.addListener).call(mq, 'change', e => { if (e.matches) closeMenu(); });
  
    btn.__menuBound = true;
  })();
