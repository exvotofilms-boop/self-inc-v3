// Self.inc V2 - main.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-item').forEach(other => {
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer')?.classList.remove('open');
      });
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('open', !isOpen);
    });
  });

  // Quote carousel
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoplayInterval;
  const goToSlide = (index) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  };
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index, 10));
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  });
  if (slides.length > 0) {
    autoplayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  // Member counter
  const counterEl = document.getElementById('member-counter');
  if (counterEl) {
    const target = parseInt(counterEl.dataset.target, 10) || 4640741;
    const startValue = target - 500000;
    const duration = 2000;
    const start = performance.now();
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counterEl.textContent = Math.round(startValue + (target - startValue) * eased).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(counterEl);
  }

  // Hero form
  const heroForm = document.getElementById('hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('hero-email')?.value;
      if (email) alert(`Thanks! We'll send info to ${email}`);
    });
  }

  // CTA form
  const ctaForm = document.getElementById('cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('cta-email')?.value;
      if (email) alert(`Thanks! We'll send info to ${email}`);
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
