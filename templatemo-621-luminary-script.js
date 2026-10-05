/*
TemplateMo 621 Luminary
https://templatemo.com/tm-621-luminary
*/

// ── Smooth Scroll (JS-driven, overrides CSS) ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ── Reveal ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(el => io.observe(el));

// ── Nav scroll ──
const topNav = document.getElementById('topNav');
window.addEventListener('scroll', () => topNav.classList.toggle('scrolled', scrollY > 60), { passive: true });

// ── Active nav + Side panels ──
const navAnchors = document.querySelectorAll('.nav-links a');
const sectionEls = document.querySelectorAll('section[id]');
const leftTrack = document.getElementById('leftTrack');
const rightTrack = document.getElementById('rightTrack');

function updateNavAndPanels() {
  const y = scrollY + innerHeight * 0.4;
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  const pct = Math.min(scrollY / maxScroll, 1);

  // Active nav link
  let id = '', activeIndex = 0;
  sectionEls.forEach((s, i) => { if (y >= s.offsetTop) { id = s.id; activeIndex = i; } });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));

  // Side panel tracks
  const trackPct = (pct * 100).toFixed(0);
  if (leftTrack) leftTrack.style.height = trackPct + '%';
  if (rightTrack) rightTrack.style.height = trackPct + '%';
}

window.addEventListener('scroll', updateNavAndPanels, { passive: true });
updateNavAndPanels();

// ── Mobile menu ──
const toggle = document.getElementById('navToggle'), menu = document.getElementById('mobileMenu');
const menuLinks = menu.querySelectorAll('.mobile-menu-link');
let menuOpen = false;
function openMenu() { menuOpen=true; toggle.classList.add('active'); toggle.setAttribute('aria-expanded','true'); menu.classList.add('open'); document.body.classList.add('menu-open'); }
function closeMenu() { if(!menuOpen) return; menuOpen=false; toggle.classList.remove('active'); toggle.setAttribute('aria-expanded','false'); menu.classList.remove('open'); document.body.classList.remove('menu-open'); }
toggle.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
menuLinks.forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (innerWidth > 1024) closeMenu(); });

