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
  // Simple scroll-reveal
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
},{ threshold:.12 }) : null;

document.querySelectorAll('.reveal').forEach(el => {
if(observer){ observer.observe(el); } else { el.classList.add('visible'); }
});

// --- Projects slider ---
(function(){
const track = document.getElementById('projTrack');
const viewport = track?.parentElement; // .slider-viewport
const prev = document.getElementById('projPrev');
const next = document.getElementById('projNext');
if(!track || !viewport || !prev || !next) return;

const slides = Array.from(track.children);
let index = 0;

// Click a faded card to center it; make slides focusable too
slides.forEach((s, i) => {
  s.setAttribute('tabindex', '0');
  s.addEventListener('click', () => go(i));
  s.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      go(i);
    }
    if(e.key === 'ArrowLeft'){ prev.click(); }
    if(e.key === 'ArrowRight'){ next.click(); }
  });
});

function getPeekPx(){
  const cs = getComputedStyle(viewport);
  return parseFloat(cs.paddingLeft) || 0; 
}
function setStates(){
  slides.forEach((s,i)=>{
    s.classList.toggle('active', i === index);
    s.classList.toggle('near', Math.abs(i - index) === 1);
  });
  prev.disabled = (index === 0);
  next.disabled = (index >= slides.length - 1);
  // update aria labels
  slides.forEach((s, i)=> s.setAttribute('aria-label', `${i+1} of ${slides.length}`));
}
function go(to){
  index = Math.max(0, Math.min(slides.length - 1, to));
  const target = slides[index];
  const peek = getPeekPx();
  const offset = target.offsetLeft; 
  track.style.transform = `translateX(${-(offset - peek)}px)`;
  setStates();
}
prev.addEventListener('click', ()=> go(index - 1));
next.addEventListener('click', ()=> go(index + 1));

// Keyboard support when arrows focused
[prev, next].forEach(btn=> btn.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowLeft'){ prev.click(); }
  if(e.key === 'ArrowRight'){ next.click(); }
}));

// Re-align on resize
let rAF = null;
function onResize(){
  if(rAF) cancelAnimationFrame(rAF);
  rAF = requestAnimationFrame(()=> go(index));
}
window.addEventListener('resize', onResize);

// init
go(0);
})();