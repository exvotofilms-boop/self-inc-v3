/* =====================================================
   Self.inc V3 — main.js
   Counter, carousel, FAQ, mobile nav
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ————— MOBILE NAV ————— */
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ————— FAQ ACCORDIONS ————— */
  const faqList = document.getElementById('faq-list');
  if (faqList) {
    faqList.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        // Close all first
        faqList.querySelectorAll('.faq-question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.classList.remove('open');
        });
        // Toggle clicked
        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          btn.nextElementSibling.classList.add('open');
        }
      });
    });
  }

  /* ————— QUOTE CAROUSEL ————— */
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let autoTimer;

  function showSlide(n) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === n);
    });
    current = n;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startAuto() {
    autoTimer = setInterval(nextSlide, 5000);
  }

  if (slides.length > 0) {
    dots.forEach(d => {
      d.addEventListener('click', () => {
        clearInterval(autoTimer);
        showSlide(Number(d.dataset.slide));
        startAuto();
      });
    });
    startAuto();
  }

  /* ————— MEMBER COUNTER (Animate on scroll) ————— */
  const counterEl = document.getElementById('member-counter');
  if (counterEl) {
    const target = 4640567;
    let counted = false;

    function animateCounter() {
      if (counted) return;
      counted = true;
      const duration = 2000;
      const start = performance.now();
      const startVal = 4000000;

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(startVal + (target - startVal) * eased);
        counterEl.textContent = val.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    // IntersectionObserver for scroll trigger
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCounter();
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(counterEl);
    } else {
      animateCounter();
    }
  }

});
