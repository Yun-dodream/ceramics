const bookingForm = document.querySelector('#booking-form');
const formAlert = document.querySelector('#form-alert');

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
