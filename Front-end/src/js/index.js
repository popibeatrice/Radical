import '../styles/index.css';
import '../styles/slider.css';
import '../styles/tailwind.css';

import { Loader } from '@googlemaps/js-api-loader';
import ScrollReveal from 'scrollreveal';

const body = document.body;
let lastScroll = 0;

// BURGUR
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const html = document.querySelector('html');
const menuWrap = document.querySelector('#menu_wrap');
const logo = document.querySelector('#logo');
const trasee = document.querySelector('#trasee');
const traseeOptions = document.querySelector('#trasee-options');
const header = document.querySelector('header');
const headerChild = document.querySelector('#header-child');
let traseeOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuOpen = true;
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
  if (!traseeOpen) {
    traseeOptions.classList.remove('hidden');
    traseeOpen = true;
  } else {
    traseeOpen = false;
    traseeOptions.classList.add('hidden');
  }
});

// SHOW / HIDE HEADER

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove('scroll-up');
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

// GOOGLE MAPS
const loader = new Loader({
  apiKey: 'AIzaSyDk4l13atzv3uO55ilho7vzc3XYb1Cpgcc',
  version: 'weekly',
  libraries: ['places'],
});
const mapOptions = {
  center: {
    lat: 46.6333,
    lng: 27.7333,
  },
  zoom: 12,
  minZoom: 9,
  maxZoom: 18,
  restriction: {
    latLngBounds: {
      north: 47.07, // Set the northern latitude boundary
      south: 46.0, // Set the southern latitude boundary
      east: 28.58, // Set the eastern longitude boundary
      west: 27.04, // Set the western longitude boundary
    },
    strictBounds: true, // Restrict the map to the defined bounds
  },
  mapId: '5b88a2eb555cabb2',
};

loader
  .load()
  .then((google) => {
    new google.maps.Map(document.getElementById('map'), mapOptions);
  })
  .catch((e) => {
    console.log(e);
  });
