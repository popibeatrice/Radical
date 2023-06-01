import "../styles/index.css";
import "../styles/slider.css";
import "../styles/tailwind.css";

import { Loader } from "@googlemaps/js-api-loader";
import ScrollReveal from "scrollreveal";

const body = document.body;
let lastScroll = 0;

// BURGUR
const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
const html = document.querySelector("html");
const menuWrap = document.querySelector("#menu_wrap");
const logo = document.querySelector("#logo");
const trasee = document.querySelector("#trasee");
const traseeBtn = document.querySelector("#trasee button");
const traseeOptions = document.querySelector("#trasee-options");
const header = document.querySelector("header");
const headerChild = document.querySelector("#header-child");
let traseeOpen = false;

menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
        menuOpen = true;
        header.style.transition = "none";
        body.classList.remove("scroll-up");
        menuBtn.classList.add("open");
        html.classList.add("overflow-y-hidden");
        menuWrap.classList.add("translate-x-[-100vw]");
        logo.classList.add("hidden");
        headerChild.classList.remove("justify-between");
        headerChild.classList.add("justify-end");
        headerChild.classList.remove("grid-cols-[1fr_50px]");
        headerChild.classList.add("grid-cols-1");
        header.classList.remove("left-0");
        header.classList.add("right-[5%]");
        header.classList.remove("w-screen");
    } else {
        menuOpen = false;
        if (window.pageYOffset > 0) body.classList.add("scroll-up");
        header.style.transition = "all";
        header.classList.remove("resize-animation-stopper");
        menuBtn.classList.remove("open");
        menuWrap.classList.remove("translate-x-[-100vw]");
        html.classList.remove("overflow-y-hidden");
        logo.classList.remove("hidden");
        headerChild.classList.add("justify-between");
        headerChild.classList.remove("justify-end");
        headerChild.classList.add("grid-cols-[1fr_50px]");
        headerChild.classList.remove("grid-cols-1");
        header.classList.add("left-0");
        header.classList.remove("right-[5%]");
        header.classList.add("w-screen");
    }
});

let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1280) {
        menuOpen = false;
        menuBtn.classList.remove("open");
        menuWrap.classList.remove("translate-x-[-100vw]");
        html.classList.remove("overflow-y-hidden");
        logo.classList.remove("hidden");
        headerChild.classList.add("justify-between");
        headerChild.classList.remove("justify-end");
        headerChild.classList.add("grid-cols-[1fr_50px]");
        headerChild.classList.remove("grid-cols-1");
        header.classList.add("left-0");
        header.classList.remove("right-[5%]");
        header.classList.add("w-screen");
        if (traseeOpen) {
            traseeOpen = false;
            traseeOptions.classList.add("hidden");
        }
    }
});

trasee.addEventListener("click", () => {
    console.log(traseeBtn);
    if (!traseeOpen) {
        traseeBtn.classList.add("text-green-500");
        traseeBtn.classList.remove("text-white");
        traseeOptions.classList.add("flex");
        traseeOptions.classList.remove("hidden");
        traseeOpen = true;
    } else {
        traseeBtn.classList.remove("text-green-500");
        traseeBtn.classList.add("text-white");
        traseeOpen = false;
        traseeOptions.classList.add("hidden");
        traseeOptions.classList.remove("flex");
    }
});

// SHOW / HIDE HEADER

window.addEventListener("scroll", () => {
    if (!body.classList.contains("resize-animation-stopper")) {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            body.classList.remove("scroll-up");
            body.classList.remove("scroll-down");
            return;
        }

        if (
            currentScroll > lastScroll &&
            !body.classList.contains("scroll-down")
        ) {
            body.classList.remove("scroll-up");
            body.classList.add("scroll-down");
        } else if (
            currentScroll < lastScroll &&
            body.classList.contains("scroll-down")
        ) {
            body.classList.remove("scroll-down");
            body.classList.add("scroll-up");
        }
        lastScroll = currentScroll;
    }
});

//

const introductiveText = document.querySelectorAll(".text-introductiv");
const photoGallery = document.querySelectorAll(".photo_gal");

// introductiveText.forEach((text, index) => {
//     text.classList.add("opacity-10", "scale-100");
// });

// window.addEventListener("scroll", () => {
//     introductiveText.forEach((text, index) => {
//         if (text.getBoundingClientRect().top < window.innerHeight / 2 + 100) {
//             text.classList.remove("opacity-10", "scale-100");
//             text.classList.add("opacity-100", "scale-105");
//         } else if (
//             text.getBoundingClientRect().top < window.innerHeight / 3 - 100 ||
//             text.getBoundingClientRect().top > window.innerHeight / 3 - 100
//         ) {
//             text.classList.add("opacity-10", "scale-100");
//             text.classList.remove("opacity-100", "scale-105");
//         }
//     });
// });

window.addEventListener("scroll", () => {
    introductiveText.forEach((text, index) => {
        const textRect = text.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        // Check if the text is at the top or bottom of the screen
        const isAtTop = textRect.top < 0 && textRect.bottom < screenHeight;
        const isAtBottom = textRect.top > 0 && textRect.bottom > screenHeight;

        if (isAtTop || isAtBottom) {
            // Fade out the text
            text.style.opacity = "0.1";
        } else {
            // Fade in the text when it's not at the top or bottom
            text.style.opacity = "1";
        }
    });
});

// SCROLL REVEAL
ScrollReveal().reveal(".h1-animation", {
    origin: "left",
    distance: "225px",
    opacity: 0,
    delay: 250,
    duration: 1000,
});
ScrollReveal().reveal(".info-pop", {
    opacity: 0,
    delay: 600,
    duration: 1000,
});
ScrollReveal().reveal("#arrow", {
    opacity: 0,
    delay: 1300,
    duration: 1000,
    reset: true,
});
ScrollReveal().reveal(".card-section", {
    opacity: 0,
    delay: 450,
    duration: 1000,
    origin: "top",
    distance: "100px",
    viewFactor: 0.5,
});
ScrollReveal().reveal("#weather", {
    origin: "right",
    distance: "200px",
    opacity: 0,
    delay: 150,
    duration: 1000,
});
