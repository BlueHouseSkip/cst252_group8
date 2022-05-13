//button in the footer that brings the user to the top of the page
$("#scroll_button").click(function () {
  window.scrollTo(0,0);
});


setInterval(rainbows, 10);

function rainbows () {
  let newColor = $("#description").css("background-color");
  $(".bg-custom").css("background-color", newColor);
}
