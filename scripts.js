// ==========================================
// SAMPLE MASALA COMPANY — scripts.js
// Scroll Animations | Navbar | Counter | Slider
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ====== NAVBAR SCROLL ======
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ====== MOBILE MENU ======
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileClose.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ====== INTERSECTION OBSERVER — SCROLL ANIMATIONS ======
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
  const allRevealEls = document.querySelectorAll(revealClasses.join(','));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  allRevealEls.forEach(el => revealObserver.observe(el));

  // ====== COUNTER ANIMATION ======
  const counters = document.querySelectorAll('[data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
    }, 16);
  }

  // ====== TESTIMONIALS SLIDER ======
  const track = document.querySelector('.testimonials-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (track && cards.length) {
    let currentIndex = 0;
    let autoplayInterval;

    const getVisibleCount = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1100 ? 2 : 3;

    function goTo(index) {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visibleCount);
      currentIndex = Math.max(0, Math.min(index, maxIndex));

      let cardWidth;
      if (window.innerWidth <= 768) {
        cardWidth = cards[0].offsetWidth + 24;
      } else {
        cardWidth = cards[0].offsetWidth + 24;
      }

      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn && prevBtn.addEventListener('click', () => {
      goTo(currentIndex - 1);
      resetAutoplay();
    });

    nextBtn && nextBtn.addEventListener('click', () => {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visibleCount);
      goTo(currentIndex < maxIndex ? currentIndex + 1 : 0);
      resetAutoplay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        resetAutoplay();
      });
    });

    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(0, cards.length - visibleCount);
        goTo(currentIndex < maxIndex ? currentIndex + 1 : 0);
      }, 4000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();
    window.addEventListener('resize', () => goTo(currentIndex), { passive: true });
  }

  // ====== HERO PARALLAX ======
  const heroSection = document.getElementById('hero');
  const heroImg = document.querySelector('.hero-img-main');

  if (heroImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ====== SMOOTH SCROLL FOR NAV LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const offsetTop = target.offsetTop - navbarHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ====== PRODUCT CARD ADD ANIMATION ======
  document.querySelectorAll('.product-add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const original = this.innerHTML;
      this.innerHTML = '✓';
      this.style.background = 'linear-gradient(135deg, #28a745, #1e7e34)';
      setTimeout(() => {
        this.innerHTML = original;
        this.style.background = '';
      }, 1200);
    });
  });

  // ====== NEWSLETTER FORM ======
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('.newsletter-input');
      const btn = this.querySelector('.btn-white');
      const originalText = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#28a745';
      btn.style.color = 'white';
      input.value = '';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    });
  }

  // ====== STAGGER DELAY FOR GRID ITEMS ======
  document.querySelectorAll('.products-grid .product-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.stats-inner .stat-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.12}s`;
  });

  document.querySelectorAll('.why-features .why-feature').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });

});
