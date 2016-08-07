$(document).ready(function() {
  lightsOut();
});

function lightsOut() {
  setTimeout(function() {
    $('body').addClass('lights-out');
  }, 4000);
}
