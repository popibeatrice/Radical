import '../styles/index.css';
import '../styles/slider.css';
import '../styles/tailwind.css';

import { Loader } from '@googlemaps/js-api-loader';
import ScrollReveal from 'scrollreveal';

// MENIU
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});

// SCROLL REVEAL
ScrollReveal().reveal('.h1-animation', {
  origin: 'left',
  distance: '100px',
  opacity: 0,
  delay: 250,
  duration: 850,
});
ScrollReveal().reveal('.info-pop', {
  opacity: 0,
  delay: 550,
  duration: 950,
});
ScrollReveal().reveal('#arrow', {
  opacity: 0,
  delay: 1250,
  duration: 750,
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
