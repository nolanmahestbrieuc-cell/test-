// ===== SCROLL: header shadow =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SMOOTH SCROLL for anchors =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ===== FORM SUBMIT =====
function handleSubmit(e) {
  e.preventDefault();
  const successEl = document.getElementById('form-success');
  successEl.classList.add('visible');
  e.target.reset();
  setTimeout(() => successEl.classList.remove('visible'), 5000);
}

// ===== INTERSECTION OBSERVER: fade-in on scroll =====
const observerOpts = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll(
  '.service-card, .spot-card, .testimonial-card, .gallery-item, .stat-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Re-attach observer styles via class for cleaner approach
  document.querySelectorAll(
    '.service-card, .spot-card, .testimonial-card, .gallery-item, .stat-item'
  ).forEach(el => {
    observer.observe(el);
  });
});

// Add visible class styles via JS
const style = document.createElement('style');
style.textContent = `
  .service-card.visible, .spot-card.visible, .testimonial-card.visible,
  .gallery-item.visible, .stat-item.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
