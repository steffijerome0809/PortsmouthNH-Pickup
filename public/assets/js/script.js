/* eslint-disable linebreak-style */
$(document).ready(() => {
  $('#demo-carousel-auto').carousel();
  $('#demo-carousel-indicators').carousel({ fullWidth: true });
  setInterval(() => {
    $('#demo-carousel-auto').carousel('next');
  }, 2000);
});
