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

// socials wheel: clicking an icon on the ring updates the center
// preview (icon, name, handle) and the "Open X" button below
const wheelIcons = document.querySelectorAll('.wheel-icon');
const wheelCenterIcon = document.getElementById('wheelCenterIcon');
const wheelCenterName = document.getElementById('wheelCenterName');
const wheelCenterHandle = document.getElementById('wheelCenterHandle');
const wheelOpenBtn = document.getElementById('wheelOpenBtn');

function selectWheelIcon(btn) {
  wheelIcons.forEach(b => b.setAttribute('aria-pressed', 'false'));
  btn.setAttribute('aria-pressed', 'true');

  const { label, handle, url } = btn.dataset;
  
  // FIX: Use the actual icon from the clicked button instead of reconstructing URL from slug
  // This prevents 404 errors from Simple Icons (especially for LinkedIn)
  const iconImg = btn.querySelector('img');
  if (iconImg) {
    // Clone the image and apply center styling
    const newImg = iconImg.cloneNode(true);
    newImg.style.width = '28px';
    newImg.style.height = '28px';
    newImg.style.filter = 'brightness(0) invert(1)';
    
    // Clear and update center icon
    wheelCenterIcon.innerHTML = '';
    wheelCenterIcon.appendChild(newImg);
  }
  
  wheelCenterName.textContent = label;
  wheelCenterHandle.textContent = handle;
  wheelOpenBtn.href = url;
  wheelOpenBtn.textContent = `Open ${label} ↗`;
}

// Set initial state from the currently active icon
const activeIcon = document.querySelector('.wheel-icon[aria-pressed="true"]');
if (activeIcon) {
  selectWheelIcon(activeIcon);
}

// Add click listeners to all wheel icons
wheelIcons.forEach(btn => btn.addEventListener('click', () => selectWheelIcon(btn)));