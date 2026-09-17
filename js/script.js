// ---------- Sticky header ----------
const header = document.getElementById('masthead');
const goTop = document.getElementById('go-to-top');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  header.classList.toggle('is-sticky', scrolled);
  goTop.classList.toggle('is-visible', window.scrollY > 400);
}, { passive: true });

// ---------- Mobile menu ----------
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('site-navigation');
mobileMenu.addEventListener('click', () => {
  const open = mainNav.classList.toggle('is-open');
  mobileMenu.classList.toggle('is-open', open);
});
mainNav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
  });
});

// ---------- Go to top ----------
goTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Smooth-scroll for in-page anchors ----------
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------- Hero slider ----------
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const slideCurrentEl = document.getElementById('slide-number-current');
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  slides[currentSlide].classList.remove('is-active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('is-active');
  slideCurrentEl.textContent = currentSlide + 1;
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

function startAutoplay() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 10000);
}

document.getElementById('slider-arrow-right').addEventListener('click', () => { nextSlide(); startAutoplay(); });
document.getElementById('slider-arrow-left').addEventListener('click', () => { prevSlide(); startAutoplay(); });

startAutoplay();

// ---------- Count-up stats + skill bar fill on scroll into view ----------
const countEls = document.querySelectorAll('.fact-number, .bar-timer');
const barEls = document.querySelectorAll('.line-active');

function animateCount(el) {
  const to = parseInt(el.dataset.to, 10) || 0;
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * to);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = to;
  }
  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (el.classList.contains('fact-number') || el.classList.contains('bar-timer')) {
        animateCount(el);
      }
      if (el.classList.contains('line-active')) {
        const to = parseInt(el.dataset.to, 10) || 0;
        el.style.width = to + '%';
      }
      obs.unobserve(el);
    }
  });
}, { threshold: 0.4 });

countEls.forEach((el) => observer.observe(el));
barEls.forEach((el) => observer.observe(el));

// ---------- Contact form (no backend on static hosting: falls back to mailto) ----------
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const captcha = document.getElementById('cf-captcha').value.trim();
  const resultEl = document.querySelector('#contact-form-result span');
  if (captcha !== '3') {
    resultEl.textContent = 'Please check your math (2 + 1 = ?).';
    return;
  }
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const phone = document.getElementById('cf-phone').value;
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value;

  const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
  const mailto = `mailto:dave@davidcliu.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  resultEl.textContent = 'Opening your email client…';
});
