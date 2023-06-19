import "./vreme";
import "./header";
import "../styles/header.css";
import "../styles/evenimente.css";
import "../styles/tailwind.css";
import axios from "axios";

// EN SWITCH
const enSwitchs = document.querySelectorAll(".en-switch");

enSwitchs.forEach((enSwitch) => {
    enSwitch.addEventListener("click", () => {
        location.href = location.origin + "/en";
    });
});

const gridCont = document.querySelector(".cont");

const RenderEvent = (id) => {
    const img = document.createElement("img");

    img.classList.add("object-contain", "w-full");
    img.src = `https://visitvaslui.fra1.digitaloceanspaces.com/${id}/poster.jpg`;

    gridCont.appendChild(img);
};

const GetEvents = async () => {
    try {
        const res = await axios.get("/evenimente/events");
        const sights = res.data.events;
        if (sights.length !== 0) {
            gridCont.innerHTML = "";
            gridCont.classList.add("grid-cont");
            sights.forEach((event) => {
                RenderEvent(event._id);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

GetEvents();

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
