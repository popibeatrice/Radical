import "./vreme";
import "./header";
import "../styles/header.css";
import "../styles/evenimente.css";
import "../styles/tailwind.css";

// EN SWITCH
const enSwitchs = document.querySelectorAll(".en-switch");

enSwitchs.forEach((enSwitch) => {
    enSwitch.addEventListener("click", () => {
        location.href = location.origin + "/en";
    });
});
var swiperHero = new Swiper(".swiper-hero", {
    effect: "fade",
    autoplay: {
        delay: 1000,
    },
    speed: 1000,
});

const swiper = new Swiper(".swiper", {
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
    },
});
