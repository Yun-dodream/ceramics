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

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    if (!bookingForm.checkValidity()) {
      event.preventDefault();
      formAlert.hidden = false;
      formAlert.focus();
      bookingForm.querySelector(':invalid').focus();
    }
  });
  bookingForm.addEventListener('input', () => {
    if (bookingForm.checkValidity()) formAlert.hidden = true;
  });
}
