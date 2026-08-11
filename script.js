// keep --header-h in sync with the real (sticky) header height,
// so the hero can fill exactly one screen's worth of space below it
const header = document.querySelector('header');
function setHeaderHeight() {
  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
}
setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);

// one-time reveal for regular sections (about, projects, socials, contact)
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// re-triggerable reveal for the hero: plays again every time you
// scroll back up and it re-enters view, not just once on load
const heroReveals = document.querySelectorAll('.hero-reveal');
const heroIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    e.target.classList.toggle('in', e.isIntersecting);
  });
}, { threshold: 0.2 });
heroReveals.forEach(el => heroIo.observe(el));