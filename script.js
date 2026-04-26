const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const fields = ['name', 'email', 'company', 'message'];
    const missing = fields.some((field) => !String(data.get(field)).trim());

    if (missing) {
      feedback.textContent = 'Please complete all required fields before submitting.';
      feedback.className = 'form-feedback error';
      return;
    }

    feedback.textContent = 'Thanks! Your pilot request is ready for review.';
    feedback.className = 'form-feedback success';
    form.reset();
  });
}
