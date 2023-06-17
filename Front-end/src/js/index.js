import "../styles/header.css";
import "../styles/index.css";
import "../styles/tailwind.css";
import "./vreme";
import "./header";

import ScrollReveal from "scrollreveal";
import axios from "axios";

// EN SWITCH
const enSwitchs = document.querySelectorAll(".en-switch");

enSwitchs.forEach((enSwitch) => {
    enSwitch.addEventListener("click", () => {
        location.href = location.origin + "/en";
    });
});

// GPT REQ
const gptForm = document.querySelector("form");
const gptSpit = document.querySelector(".gpt-spit");
const gptSpitContent = document.querySelector(".gpt-spit span");
const gptSpinner = document.querySelector(".spinner");

gptForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = gptForm.prompt.value;

    // UI CHANGE
    gptSpitContent.textContent = "";
    gptSpinner.classList.remove("hidden");
    gptSpit.classList.add("items-center", "justify-center");
    gptSpit.classList.remove("items-start", "justify-start");

    const promptObject = {
        prompt: prompt,
    };
    try {
        const respons = await axios.post("/gpt/ro", promptObject);
        gptSpinner.classList.add("hidden");
        gptSpit.classList.remove("items-center", "justify-center");
        gptSpit.classList.add(
            "items-start",
            "justify-start",
            "overflow-y-auto"
        );
        gptSpitContent.textContent = respons.data.completion.content;
    } catch (error) {
        console.log(error);
    }
    gptForm.reset();
});

// LINIE
const linie = document.querySelector(".linie");

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener("scroll", () => {
    const isVisible = isElementInViewport(linie);
    if (isVisible === true) {
        linie.classList.remove("w-0");
        linie.classList.add("w-[105%]");
    }
});

const isVisible = isElementInViewport(linie);
if (isVisible === true) {
    linie.classList.remove("w-0");
    linie.classList.add("w-[105%]");
}

const introductiveText = document.querySelectorAll(".text-introductiv");

window.addEventListener("scroll", () => {
    introductiveText.forEach((text) => {
        if (
            text.getBoundingClientRect().top > window.innerHeight / 2 + 180 ||
            text.getBoundingClientRect().top < window.innerHeight / 3 - 180
        ) {
            text.classList.add("opacity-10", "scale-100");
            text.classList.remove("opacity-100", "scale-105");
        } else {
            text.classList.remove("opacity-10", "scale-100");
            text.classList.add("opacity-100", "scale-105");
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
    mobile: false,
});
ScrollReveal().reveal(".info-pop", {
    opacity: 0,
    delay: 600,
    duration: 1000,
    mobile: false,
});
ScrollReveal().reveal("#arrow", {
    opacity: 0,
    delay: 1300,
    duration: 1000,
    reset: true,
    mobile: false,
});
ScrollReveal().reveal(".card-section", {
    opacity: 0,
    delay: 350,
    duration: 1000,
    origin: "top",
    distance: "100px",
    viewFactor: 0.5,
    mobile: false,
});
ScrollReveal().reveal("#weather", {
    origin: "right",
    distance: "200px",
    opacity: 0,
    delay: 150,
    duration: 1000,
    viewFactor: 0.7,
    mobile: false,
});
ScrollReveal().reveal("#cur", {
    origin: "right",
    distance: "200px",
    opacity: 0,
    delay: 1000,
    duration: 1000,
    viewFactor: 1,
    mobile: false,
});

// TRASEE

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 80,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
    },
    allowTouchMove: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
