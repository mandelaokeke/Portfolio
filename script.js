const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  root.classList.add('dark');
}

function syncTheme() {
  const isDark = root.classList.contains('dark');
  themeButton?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  if (themeMeta) themeMeta.content = isDark ? '#11130f' : '#f3f0e8';
}

themeButton?.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', root.classList.contains('dark') ? 'dark' : 'light');
  syncTheme();
});

syncTheme();

const menuButton = document.getElementById('menuToggle');
const navigation = document.getElementById('primaryNav');

function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  navigation?.classList.toggle('is-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 721px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isCurrent = item === button;
      item.classList.toggle('is-active', isCurrent);
      item.setAttribute('aria-pressed', String(isCurrent));
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category?.split(' ') ?? [];
      card.hidden = filter !== 'all' && !categories.includes(filter);
    });
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
