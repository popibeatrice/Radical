import '../styles/index.css';
import '../styles/slider.css';
import '../styles/tailwind.css';

// Import iconite
import sunny from '../assets/sun-senin.png';
import clear from '../assets/moon-senin.png';
import cloudy from '../assets/cloud.png';
import semiCloudy from '../assets/sun-cloud.png';
import rainy from '../assets/hard-rain.png';
import semiRainy from '../assets/sun-rain.png';
import snowy from '../assets/hard-snow.png';

import ScrollReveal from 'scrollreveal';
import axios from 'axios';

const body = document.body;
let lastScroll = 0;

// EN SWITCH
const enSwitchs = document.querySelectorAll('.en-switch');

enSwitchs.forEach((enSwitch) => {
  enSwitch.addEventListener('click', () => {
    console.log(location.origin);
    location.href = location.origin + '/en';
  });
});

// GPT REQ
const gptForm = document.querySelector('form');
const gptSpit = document.querySelector('.gpt-spit');
const gptSpitContent = document.querySelector('.gpt-spit span');
const gptSpinner = document.querySelector('.spinner');

gptForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = gptForm.prompt.value;

  // UI CHANGE
  gptSpitContent.textContent = '';
  gptSpinner.classList.remove('hidden');

  const promptObject = {
    prompt: prompt,
  };
  try {
    const respons = await axios.post('/gpt/ro', promptObject);
    gptSpinner.classList.add('hidden');
    gptSpit.classList.remove('items-center', 'justify-center');
    gptSpit.classList.add('items-start', 'justify-start');
    gptSpitContent.textContent = respons.data.completion.content;
  } catch (error) {
    console.log(error);
  }
  gptForm.reset();
});

// LINIE
const linie = document.querySelector('.linie');

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('scroll', () => {
  const isVisible = isElementInViewport(linie);
  if (isVisible === true) {
    linie.classList.remove('w-0');
    linie.classList.add('w-[105%]');
  }
});

const isVisible = isElementInViewport(linie);
if (isVisible === true) {
  linie.classList.remove('w-0');
  linie.classList.add('w-[105%]');
}

// BURGUR
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const html = document.querySelector('html');
const menuWrap = document.querySelector('#menu_wrap');
const logo = document.querySelector('#logo');
const trasee = document.querySelector('#trasee');
const traseeBtn = document.querySelector('#trasee button');
const traseeOptions = document.querySelector('#trasee-options');
const header = document.querySelector('header');
const headerChild = document.querySelector('#header-child');
let traseeOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuOpen = true;
    header.style.transitionProperty = 'none';
    body.classList.remove('scroll-up');
    menuBtn.classList.add('open');
    html.classList.add('overflow-y-hidden');
    menuWrap.classList.add('translate-x-[-100vw]');
    logo.classList.add('hidden');
    headerChild.classList.remove('justify-between');
    headerChild.classList.add('justify-end');
    headerChild.classList.remove('grid-cols-[1fr_50px]');
    headerChild.classList.add('grid-cols-1');
    header.classList.remove('left-0');
    header.classList.add('right-[5%]');
    header.classList.remove('w-screen');
  } else {
    menuOpen = false;
    if (window.pageYOffset > 0) body.classList.add('scroll-up');
    header.style.transitionProperty = 'all';
    header.classList.remove('resize-animation-stopper');
    menuBtn.classList.remove('open');
    menuWrap.classList.remove('translate-x-[-100vw]');
    html.classList.remove('overflow-y-hidden');
    logo.classList.remove('hidden');
    headerChild.classList.add('justify-between');
    headerChild.classList.remove('justify-end');
    headerChild.classList.add('grid-cols-[1fr_50px]');
    headerChild.classList.remove('grid-cols-1');
    header.classList.add('left-0');
    header.classList.remove('right-[5%]');
    header.classList.add('w-screen');
  }
});

let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1280) {
    menuOpen = false;
    menuBtn.classList.remove('open');
    menuWrap.classList.remove('translate-x-[-100vw]');
    html.classList.remove('overflow-y-hidden');
    logo.classList.remove('hidden');
    headerChild.classList.add('justify-between');
    headerChild.classList.remove('justify-end');
    headerChild.classList.add('grid-cols-[1fr_50px]');
    headerChild.classList.remove('grid-cols-1');
    header.classList.add('left-0');
    header.classList.remove('right-[5%]');
    header.classList.add('w-screen');
    if (traseeOpen) {
      traseeOpen = false;
      traseeOptions.classList.add('hidden');
    }
  }
});

trasee.addEventListener('click', () => {
  console.log(traseeBtn);
  if (!traseeOpen) {
    traseeBtn.classList.add('text-green-500');
    traseeBtn.classList.remove('text-white');
    traseeOptions.classList.add('flex');
    traseeOptions.classList.remove('hidden');
    traseeOpen = true;
  } else {
    traseeBtn.classList.remove('text-green-500');
    traseeBtn.classList.add('text-white');
    traseeOpen = false;
    traseeOptions.classList.add('hidden');
    traseeOptions.classList.remove('flex');
  }
});

// SHOW / HIDE HEADER
window.addEventListener('scroll', () => {
  if (!body.classList.contains('resize-animation-stopper')) {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove('scroll-up');
      body.classList.remove('scroll-down');
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-up');
      body.classList.add('scroll-down');
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains('scroll-down')
    ) {
      body.classList.remove('scroll-down');
      body.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  }
});

const introductiveText = document.querySelectorAll('.text-introductiv');

window.addEventListener('scroll', () => {
  introductiveText.forEach((text) => {
    if (
      text.getBoundingClientRect().top > window.innerHeight / 2 + 180 ||
      text.getBoundingClientRect().top < window.innerHeight / 3 - 180
    ) {
      text.classList.add('opacity-10', 'scale-100');
      text.classList.remove('opacity-100', 'scale-105');
    } else {
      text.classList.remove('opacity-10', 'scale-100');
      text.classList.add('opacity-100', 'scale-105');
    }
  });
});

// SCROLL REVEAL
ScrollReveal().reveal('.h1-animation', {
  origin: 'left',
  distance: '225px',
  opacity: 0,
  delay: 250,
  duration: 1000,
});
ScrollReveal().reveal('.info-pop', {
  opacity: 0,
  delay: 600,
  duration: 1000,
});
ScrollReveal().reveal('#arrow', {
  opacity: 0,
  delay: 1300,
  duration: 1000,
  reset: true,
});
ScrollReveal().reveal('.card-section', {
  opacity: 0,
  delay: 350,
  duration: 1000,
  origin: 'top',
  distance: '100px',
  viewFactor: 0.5,
});
ScrollReveal().reveal('#weather', {
  origin: 'right',
  distance: '200px',
  opacity: 0,
  delay: 150,
  duration: 1000,
  viewFactor: 0.7,
});
ScrollReveal().reveal('#cur', {
  origin: 'right',
  distance: '200px',
  opacity: 0,
  delay: 1000,
  duration: 1000,
  viewFactor: 1,
});
ScrollReveal().reveal('#cur', {
  origin: 'right',
  distance: '200px',
  opacity: 0,
  delay: 1000,
  duration: 1000,
  viewFactor: 1,
});

// VREME + ORA
const temp = document.querySelector('.temp');
const oras = document.querySelectorAll('.ora');
const iconVreme = document.querySelector('#vreme-icon');
const pmAM = document.querySelectorAll('.pm-am');

function updateLocalTime() {
  const targetTimezone = 'Europe/Bucharest';

  const date = new Date();

  const options = {
    timeZone: targetTimezone,
    hour12: true,
  };
  const timeString = date.toLocaleTimeString('ro-RO', options);

  const [hours, minutes, seconds] = timeString.split(':');

  oras[0].textContent = `${hours}:${minutes}:${seconds.split(' ')[0]}`;
  oras[1].textContent = `${hours}:${minutes}:${seconds.split(' ')[0]}`;
  pmAM[0].textContent = `${seconds.split(' ')[1]}`;
  pmAM[1].textContent = `${seconds.split(' ')[1]}`;
}

window.onload = async () => {
  updateLocalTime();
  try {
    const vremeInfo = await axios.get('/vreme');
    temp.textContent = `${vremeInfo.data.temp}`;
    if (vremeInfo.data.text === 'Sunny') iconVreme.src = sunny;
    else if (vremeInfo.data.text === 'Clear') iconVreme.src = clear;
    else if (
      vremeInfo.data.text === 'Cloudy' ||
      vremeInfo.data.text === 'Fog' ||
      vremeInfo.data.text === 'Freezing fog' ||
      vremeInfo.data.text === 'Mist' ||
      vremeInfo.data.text === 'Overcast'
    )
      iconVreme.src = cloudy;
    else if (vremeInfo.data.text === 'Partly cloudy') {
      iconVreme.src = semiCloudy;
    } else if (
      vremeInfo.data.text === 'Thundery outbreaks possible' ||
      vremeInfo.data.text === 'Moderate rain at times' ||
      vremeInfo.data.text === 'Moderate rain' ||
      vremeInfo.data.text === 'Heavy rain at times' ||
      vremeInfo.data.text === 'Heavy rain' ||
      vremeInfo.data.text === 'Heavy rain' ||
      vremeInfo.data.text === 'Light freezing rain' ||
      vremeInfo.data.text === 'Moderate or heavy freezing rain' ||
      vremeInfo.data.text === 'Patchy light rain with thunder' ||
      vremeInfo.data.text === 'Moderate or heavy rain with thunder'
    )
      iconVreme.src = rainy;
    else if (
      vremeInfo.data.text === 'Patchy rain possible' ||
      vremeInfo.data.text === 'Patchy light drizzle' ||
      vremeInfo.data.text === 'Light drizzle' ||
      vremeInfo.data.text === 'Patchy light rain' ||
      vremeInfo.data.text === 'Light rain' ||
      vremeInfo.data.text === 'Light rain shower' ||
      vremeInfo.data.text === 'Moderate or heavy rain shower' ||
      vremeInfo.data.text === 'Torrential rain shower' ||
      vremeInfo.data.text === 'Patchy light rain with thunder' ||
      vremeInfo.data.text === 'Moderate or heavy rain with thunder'
    )
      iconVreme.src = semiRainy;
    else iconVreme.src = snowy;
  } catch (error) {
    console.log(error);
  }
};

setInterval(updateLocalTime, 1000);

// TRASEE
var TrandingSlider = new Swiper('.swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
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
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
