import "../styles/index.css";
import "../styles/slider.css";
import "../styles/tailwind.css";

import ScrollReveal from "scrollreveal";

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
  }
});
ScrollReveal().reveal(".h1-animation", {
  origin: "left",
  distance: "100px",
  opacity: 0,
  delay: 150,
  duration: 750,
});
ScrollReveal().reveal(".info-pop", {
  opacity: 0,
  delay: 450,
  duration: 750,
});
ScrollReveal().reveal("#arrow", {
  opacity: 0,
  delay: 1000,
  duration: 750,
  reset: true,
});
