import "../styles/index.css";
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
ScrollReveal().reveal(".font-title");
