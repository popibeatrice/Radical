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
    header.style.transition = 'none';
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
    header.style.transition = 'all';
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

//

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
  delay: 450,
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

console.log('pipi');

(function () {
  var slidersContainer = document.querySelector('.sliders-container');

  // Initializing the numbers slider
  var msNumbers = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--numbers',
    range: [1, 4],
    rangeContent: function (i) {
      return '0' + i;
    },
    style: {
      transform: [{ scale: [0.4, 1] }],
      opacity: [0, 1],
    },
    interactive: false,
  });

  // Initializing the titles slider
  var titles = [
    'King of the Ring Fight',
    'Sound of Streets',
    'Urban Fashion',
    'Windy Sunset',
  ];
  var msTitles = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--titles',
    range: [0, 3],
    rangeContent: function (i) {
      return '<h3>' + titles[i] + '</h3>';
    },
    vertical: true,
    reverse: true,
    style: {
      opacity: [0, 1],
    },
    interactive: false,
  });

  // Initializing the links slider
  var msLinks = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--links',
    range: [0, 3],
    rangeContent: function () {
      return '<a class="ms-slide__link">View Case</a>';
    },
    vertical: true,
    interactive: false,
  });

  // Get pagination items
  var pagination = document.querySelector('.pagination');
  var paginationItems = [].slice.call(pagination.children);

  // Initializing the images slider
  var msImages = new MomentumSlider({
    // Element to append the slider
    el: slidersContainer,
    // CSS class to reference the slider
    cssClass: 'ms--images',
    // Generate the 4 slides required
    range: [0, 3],
    rangeContent: function () {
      return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
    },
    // Syncronize the other sliders
    sync: [msNumbers, msTitles, msLinks],
    // Styles to interpolate as we move the slider
    style: {
      '.ms-slide__image': {
        transform: [{ scale: [1.5, 1] }],
      },
    },
    // Update pagination if slider change
    change: function (newIndex, oldIndex) {
      if (typeof oldIndex !== 'undefined') {
        paginationItems[oldIndex].classList.remove('pagination__item--active');
      }
      paginationItems[newIndex].classList.add('pagination__item--active');
    },
  });

  // Select corresponding slider item when a pagination button is clicked
  pagination.addEventListener('click', function (e) {
    if (e.target.matches('.pagination__button')) {
      var index = paginationItems.indexOf(e.target.parentNode);
      msImages.select(index);
    }
  });
})();