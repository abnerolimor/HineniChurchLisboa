document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('menuToggle') || document.getElementById('nav-toggle');
  const mainNav = document.getElementById('navLinks') || document.getElementById('main-nav');
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.innerWidth <= 800 && mainNav) mainNav.classList.remove('active');
        }
      }
    });
  });

  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.hidden = false;
      msg.textContent = 'Mensagem enviada. Obrigado!';
      form.reset();
      setTimeout(() => { msg.hidden = true; msg.textContent = ''; }, 4000);
    });
  }
  // set CSS variable for header height so body padding matches header size
  function updateHeaderHeight() {
    if (header) {
      const h = header.offsetHeight || 88;
      document.documentElement.style.setProperty('--header-height', h + 'px');
    }
  }

  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);

  // reveal sections when they enter the viewport
  const sections = document.querySelectorAll('section');
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(s => obs.observe(s));
  } else {
    // fallback: mark all visible
    sections.forEach(s => s.classList.add('visible'));
  }

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (scrollTopBtn) {
      if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});