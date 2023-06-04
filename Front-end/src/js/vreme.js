import axios from 'axios';

// Import iconite
import sunny from '../assets/sun-senin.png';
import clear from '../assets/moon-senin.png';
import cloudy from '../assets/cloud.png';
import semiCloudy from '../assets/sun-cloud.png';
import rainy from '../assets/hard-rain.png';
import semiRainy from '../assets/sun-rain.png';
import snowy from '../assets/hard-snow.png';

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
