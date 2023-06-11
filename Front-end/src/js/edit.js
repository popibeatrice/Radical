import '../styles/edit.css';
import '../styles/tailwind.css';
import axios from 'axios';

const token = localStorage.getItem('token');
const IsLogged = async () => {
  try {
    const res = await axios.post(
      '/admin',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      location.href = location.origin + '/login.html';
    }
  } catch (error) {
    location.href = location.origin + '/login.html';
  }
};

IsLogged();

let map;
let infowindow;
let marker;
let Latitude;
let Longitude;

const form = document.querySelector('form');
const titluRO = document.querySelector('#titluRO');
const titluEN = document.querySelector('#titluEN');
const descpRO = document.querySelector('#descpRO');
const descpEN = document.querySelector('#descpEN');
const type = document.querySelector('#type');
const coperta = document.querySelector('#cover');
const imagini = document.querySelector('#imagini');
const copertaPreview = document.querySelector('.coperta-preview');
const imaginiPreview = document.querySelector('.imagini-preview');

window.addEventListener('load', function () {
  // Reset the form fields
  form.reset();
});

function initMap(latDef, lngDef) {
  let vasluiCounty = { lat: latDef, lng: lngDef };

  map = new google.maps.Map(document.getElementById('map'), {
    center: vasluiCounty,
    zoom: 18,
  });

  var input = document.getElementById('sight-search-input');
  var options = {
    componentRestrictions: { country: 'ro' },
    fields: ['formatted_address', 'geometry', 'name', 'photos'],
  };
  var autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert(
        'Nu sunt detalii disponibile pentru locatia: "' + place.name + '"'
      );
      return;
    }

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    // Move map to the selected location and zoom in
    map.setCenter({ lat: lat, lng: lng });
    map.setZoom(18);

    // Clear previous infowindow
    if (infowindow) {
      infowindow.close();
    }

    // Update marker position and title, or create a new marker
    if (marker) {
      marker.setPosition({ lat: lat, lng: lng });
      marker.setTitle(place.name);
    } else {
      marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: place.name,
      });
    }

    // Create and open infowindow when marker is clicked
    google.maps.event.addListener(marker, 'click', function () {
      if (infowindow) {
        infowindow.close();
      }
      infowindow = new google.maps.InfoWindow({
        content:
          '<div class="infowindow-content">' +
          '<img class="infowindow-photo" src="' +
          place.photos[0].getUrl() +
          '" alt="Place Photo">' +
          '<div class="infowindow-details">' +
          '<strong>' +
          place.name +
          '</strong><br>' +
          place.formatted_address +
          '</div></div>',
      });
      infowindow.open(map, marker);
    });

    // Do something with lat and lng, such as saving them to the database
    Latitude = lat;
    Longitude = lng;
  });
}

const GetDefInfo = async () => {
  // Get the URL query string
  const queryString = window.location.search;

  // Create an URLSearchParams object with the query string
  const params = new URLSearchParams(queryString);

  // Get the value of the 'variable' parameter
  const myVariable = params.get('variable');

  try {
    const res = await axios.get(`/admin/edit/${myVariable}`);
    const info = res.data.sight[0];
    titluRO.value = info.titleRo;
    titluEN.value = info.titleEn;
    descpRO.value = info.descpRo;
    descpEN.value = info.descpEn;
    type.value = info.type;
    const lat = parseFloat(info.lat['$numberDecimal']);
    const lng = parseFloat(info.lng['$numberDecimal']);
    initMap(lat, lng);
  } catch (error) {
    location.href = location.origin + '/admin';
  }
};
GetDefInfo();

function showError(message, container) {
  // Display the error message to the user
  const errorContainer = document.createElement('div');
  errorContainer.classList.add(
    'pointer-events-none',
    'bg-red-500',
    'rounded-lg',
    'px-4',
    'py-2',
    'bg-opacity-60',
    'text-white',
    'text-center',
    'transition-all',
    'duration-1000',
    'absolute',
    'z-30'
  );
  errorContainer.textContent = message;
  container.appendChild(errorContainer);
  setTimeout(() => {
    errorContainer.classList.add('opacity-0');
  }, 3000);
  setTimeout(() => {
    errorContainer.classList.add('hidden');
  }, 6000);
}

let selectedImages = [];

function handleMultiplePhotosUpload() {
  const files = imagini.files;
  if (files.length === 0) {
    showError('Selectati o fotografie!', imaginiPreview);
    return;
  }

  if (selectedImages.length + files.length > 4) {
    showError('Maximum 4 poze permise!', imaginiPreview);
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    selectedImages.push(file); // Store the selected file in the array

    const img = document.createElement('img');
    const wrap = document.createElement('div');
    const close = document.createElement('div');
    close.textContent = 'X';
    close.classList.add(
      'text-red-500',
      'absolute',
      'z-10',
      'w-10',
      'h-10',
      '-right-6',
      '-top-4',
      'text-4xl',
      'text-bold',
      'cursor-pointer'
    );
    close.addEventListener('click', () => {
      wrap.remove();
      const index = selectedImages.indexOf(file);
      if (index > -1) {
        selectedImages.splice(index, 1);
      }
      console.log(selectedImages);
    });
    wrap.classList.add('relative');
    img.classList.add(
      'object-contain',
      'border',
      'border-zinc-500',
      'object-center',
      'w-[100%]',
      'max-w-xl',
      'rounded-lg'
    );
    img.src = URL.createObjectURL(file);
    wrap.appendChild(img);
    wrap.appendChild(close);
    imaginiPreview.appendChild(wrap);
  }
}

function handleSinglePhotoUpload() {
  const files = coperta.files;
  if (files.length !== 1) {
    showError('Maximum o poza!', copertaPreview);
    return;
  }

  copertaPreview.innerHTML = ''; // Clear previous preview

  const file = files[0];
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.classList.add(
    'object-contain',
    'border',
    'border-zinc-500',
    'object-center',
    'w-[100%]',
    'max-w-xl',
    'rounded-lg'
  );
  copertaPreview.appendChild(img);
}

coperta.addEventListener('change', handleSinglePhotoUpload);
imagini.addEventListener('change', handleMultiplePhotosUpload);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Convert the main image file to base64
  const reader = new FileReader();
  reader.readAsDataURL(coperta.files[0]);
  reader.onload = async function () {
    const mainImageBase64 = reader.result; // No need to split the data URL

    const extraPhotosBase64Array = [];
    const extraPhotosPromises = Array.from(selectedImages).map((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      return new Promise((resolve) => {
        fileReader.onload = function () {
          const base64 = fileReader.result; // No need to split the data URL
          extraPhotosBase64Array.push(base64);
          resolve();
        };
      });
    });
    try {
      await Promise.all(extraPhotosPromises);
      const formData = {
        titluRo: titluRO.value,
        titluEn: titluEN.value,
        descpRo: descpRO.value,
        descpEn: descpEN.value,
        type: type.value,
        lat: Latitude,
        lng: Longitude,
        cover: mainImageBase64,
        extra: extraPhotosBase64Array,
      };
      const res = await axios
        .post('/admin/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      if (res.status === 200) location.href = location.origin + '/admin';
    } catch (error) {
      console.log(error);
    }
  };
});
