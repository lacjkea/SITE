// alert("hey");

const cartIconEl = document.querySelector(".cart-icon");
const cartEl = document.querySelector(".cart");

cartIconEl.addEventListener("click", toggleMenu);

function toggleMenu(e) {
  cartEl.classList.toggle("show");
}
/* window.addEventListener("resize", reportWindowSize);
function reportWindowSize() {
  // Create a media condition that targets viewports at least 768px wide
  const mediaQuery500 = window.matchMedia("(min-width: 500px)");

  // Check if the media query is true
  if (mediaQuery500.matches) {
    // Then trigger an alert
    // alert("Media Query Matched!");
    cartEl.classList.remove("show");
  }
}
 */
