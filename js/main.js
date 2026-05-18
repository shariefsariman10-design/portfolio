/* ===== Mobile Navigation Toggle ===== */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  links.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ===== Work Page — Project Filter ===== */
(function () {
  const filterContainer = document.getElementById('work-filters');
  const grid = document.getElementById('work-grid');

  if (!filterContainer || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.work-card'));
  const buttons = Array.from(filterContainer.querySelectorAll('.filter-btn'));

  filterContainer.addEventListener('click', function (e) {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    buttons.forEach(function (b) { b.classList.remove('filter-btn--active'); });
    btn.classList.add('filter-btn--active');

    const filter = btn.dataset.filter;

    cards.forEach(function (card) {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
})();

/* ===== Contact Form — Client-Side Validation ===== */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  function getField(id) {
    return document.getElementById(id);
  }

  function getError(id) {
    return document.getElementById(id + '-error');
  }

  function showError(id, message) {
    const input = getField(id);
    const error = getError(id);
    if (input) input.classList.add('has-error');
    if (error) error.textContent = message;
  }

  function clearError(id) {
    const input = getField(id);
    const error = getError(id);
    if (input) input.classList.remove('has-error');
    if (error) error.textContent = '';
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    let valid = true;
    const name = getField('name').value.trim();
    const email = getField('email').value.trim();
    const subject = getField('subject').value.trim();
    const message = getField('message').value.trim();

    clearError('name');
    clearError('email');
    clearError('subject');
    clearError('message');

    if (!name) {
      showError('name', 'Please enter your name.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Please enter your email address.');
      valid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject) {
      showError('subject', 'Please enter a subject.');
      valid = false;
    }

    if (!message) {
      showError('message', 'Please enter a message.');
      valid = false;
    } else if (message.length < 20) {
      showError('message', 'Message must be at least 20 characters.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) return;

    if (status) {
      status.textContent = 'Message sent! I\'ll get back to you soon.';
      status.className = 'form-status form-status--success';
    }

    form.reset();

    setTimeout(function () {
      if (status) {
        status.textContent = '';
        status.className = 'form-status';
      }
    }, 5000);
  });

  ['name', 'email', 'subject', 'message'].forEach(function (id) {
    const input = getField(id);
    if (!input) return;
    input.addEventListener('input', function () { clearError(id); });
  });
})();

/* ===== Scroll-reveal for cards ===== */
(function () {
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('.project-card, .work-card, .skills-list__item');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 400ms ease, transform 400ms ease';
    observer.observe(el);
  });
})();
