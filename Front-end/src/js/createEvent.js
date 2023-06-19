import '../styles/header.css';

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
      location.href = location.origin + '/admin/login';
    }
  } catch (error) {
    location.href = location.origin + '/admin/login';
  }
};
IsLogged();

const form = document.querySelector('form');
const expirare = document.querySelector('#expirare');
const coperta = document.querySelector('#cover');
const copertaPreview = document.querySelector('.coperta-preview');

function updateMinDate() {
  const currentDate = new Date().toISOString().split('T')[0];
  expirare.min = currentDate;
}

// Update the min attribute immediately
updateMinDate();

// Schedule the function to run every day (in milliseconds)
setInterval(updateMinDate, 24 * 60 * 60 * 1000);

window.addEventListener('load', function () {
  // Reset the form fields
  form.reset();
});

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
  img.classList.add('object-contain', 'w-[100%]', 'max-w-[400px]');
  copertaPreview.appendChild(img);
}

coperta.addEventListener('change', handleSinglePhotoUpload);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Convert the main image file to base64
  const reader = new FileReader();
  reader.readAsDataURL(coperta.files[0]);
  reader.onload = async function () {
    const mainImageBase64 = reader.result; // No need to split the data URL
    try {
      const formData = {
        expirare: expirare.value,
        cover: mainImageBase64,
      };
      const res = await axios
        .post('/admin/evenimente/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      if (res.status === 200)
        location.href = location.origin + '/admin/evenimente';
    } catch (error) {
      console.log(error);
    }
  };
});
