const bookingForm = document.querySelector('#booking-form');
const formAlert = document.querySelector('#form-alert');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const primaryNavigation = document.querySelector('.primary-nav');

if (mobileMenuToggle && primaryNavigation) {
  const closeMobileMenu = () => {
    primaryNavigation.classList.remove('is-open');
    mobileMenuToggle.classList.remove('is-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = primaryNavigation.classList.toggle('is-open');
    mobileMenuToggle.classList.toggle('is-open', isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}

const courseConfig = window.courseConfig;

if (courseConfig) {
  document.querySelectorAll('[data-course]').forEach((element) => {
    const value = element.dataset.course.split('.').reduce((item, key) => item?.[key], courseConfig);
    if (value !== undefined) element.textContent = Array.isArray(value) ? value.join(', ') : value;
  });
}

if (bookingForm && formAlert) {
  const submitButton = bookingForm.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton?.textContent || 'Send';

  const showFormMessage = (message, type, allowLinks = false) => {
    formAlert.hidden = false;
    formAlert.className = `form-alert is-${type}`;
    formAlert.setAttribute('role', type === 'error' ? 'alert' : 'status');

    if (allowLinks) {
      formAlert.innerHTML = message;
    } else {
      formAlert.textContent = message;
    }
  };

  const hideFormMessage = () => {
    formAlert.hidden = true;
    formAlert.className = 'form-alert';
    formAlert.textContent = '';
  };

  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      showFormMessage('Please fill out all required fields.', 'error');
      bookingForm.querySelector(':invalid')?.focus();
      return;
    }

    hideFormMessage();
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }
    bookingForm.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(bookingForm.action, {
        method: bookingForm.method || 'POST',
        body: new FormData(bookingForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Form service returned ${response.status}`);
      }

      bookingForm.reset();
      showFormMessage('Thank you — your booking request has been sent. We will get back to you soon.', 'success');
    } catch (error) {
      showFormMessage(
        'We could not send your request right now. Please try again shortly, or contact us directly at <a href="mailto:dodreamceramic@gmail.com">dodreamceramic@gmail.com</a> or <a href="tel:+17788682264">+1 (778) 868-2264</a>.',
        'error',
        true
      );
    } finally {
      bookingForm.removeAttribute('aria-busy');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });

  bookingForm.addEventListener('input', () => {
    if (formAlert.classList.contains('is-error')) hideFormMessage();
  });
}
