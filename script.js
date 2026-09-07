const bookingForm = document.querySelector('#booking-form');
const formAlert = document.querySelector('#form-alert');

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
