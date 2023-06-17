import './vreme';
import './header';
import '../styles/header.css';
import '../styles/trasee_bicicleta.css';
import '../styles/tailwind.css';

// RO SWITCH
const roSwitchs = document.querySelectorAll('.ro-switch');

roSwitchs.forEach((roSwitch) => {
  roSwitch.addEventListener('click', () => {
    location.href = location.origin;
  });
});

const mapOptions = {
  zoom: 13,
  mapId: 'c9bed3fb4e324d65',
};
const mapOptionsTroite = {
  zoom: 13,
  mapId: 'c9bed3fb4e324d65',
};

const EditMap = (map, locations) => {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  directionsRenderer.setMap(map);
  const waypoints = locations.map((location) => ({
    location: location.location,
    stopover: true,
  }));

  const origin = waypoints.shift().location;
  const destination = waypoints.pop().location;

  const request = {
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    travelMode: google.maps.TravelMode.DRIVING, // Adjust the travel mode as needed
  };

  directionsService.route(request, (result, status) => {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Valui
  var markerLabel = {
    text: 'C', // The letter "C" to be displayed on the marker
    color: '#FFFFFF', // Marker label color (white in this example)
    fontSize: '16px', // Marker label font size
  };

  // Create a marker and set its position
  var marker = new google.maps.Marker({
    position: { lat: 46.617416, lng: 27.651159 }, // Replace with the desired coordinates
    map: map, // Replace "map" with your Google Maps instance
    label: markerLabel, // Set the marker label
  });
  const locations1 = [
    {
      title: 'centru',
      location: { lat: 46.638353, lng: 27.732402 },
    },
    {
      title: 'teatru de vara',
      location: { lat: 46.608279, lng: 27.68106 },
    },

    // Add more locations as needed
  ];
  const locations2 = [
    {
      title: 'centru',
      location: { lat: 46.638353, lng: 27.732402 },
    },
    {
      title: 'teatru de vara',
      location: { lat: 46.652609, lng: 27.436876 },
    },

    // Add more locations as needed
  ];
  EditMap(map, locations1);
  map.addListener('tilesloaded', function () {
    var map_troite1 = new google.maps.Map(
      document.getElementById('map_troita1'),
      mapOptionsTroite
    );
    EditMap(map_troite1, locations2);
    new google.maps.Marker({
      position: { lat: 46.622223, lng: 27.413579 }, // Replace with the desired coordinates
      map: map_troite1, // Replace "map" with your Google Maps instance
      label: markerLabel, // Set the marker label
    });
    new google.maps.Marker({
      position: { lat: 46.627344, lng: 27.428829 }, // Replace with the desired coordinates
      map: map_troite1, // Replace "map" with your Google Maps instance
      label: {
        text: 'D', // The letter "C" to be displayed on the marker
        color: '#FFFFFF', // Marker label color (white in this example)
        fontSize: '16px', // Marker label font size
      }, // Set the marker label
    });
    new google.maps.Marker({
      position: { lat: 46.596536, lng: 27.447198 }, // Replace with the desired coordinates
      map: map_troite1, // Replace "map" with your Google Maps instance
      label: {
        text: 'E', // The letter "C" to be displayed on the marker
        color: '#FFFFFF', // Marker label color (white in this example)
        fontSize: '16px', // Marker label font size
      }, // Set the marker label
    });
    new google.maps.Marker({
      position: { lat: 46.566604, lng: 27.517594 }, // Replace with the desired coordinates
      map: map_troite1, // Replace "map" with your Google Maps instance
      label: {
        text: 'F', // The letter "C" to be displayed on the marker
        color: '#FFFFFF', // Marker label color (white in this example)
        fontSize: '16px', // Marker label font size
      }, // Set the marker label
    });
    new google.maps.Marker({
      position: { lat: 46.531703, lng: 27.620629 }, // Replace with the desired coordinates
      map: map_troite1, // Replace "map" with your Google Maps instance
      label: {
        text: 'G', // The letter "C" to be displayed on the marker
        color: '#FFFFFF', // Marker label color (white in this example)
        fontSize: '16px', // Marker label font size
      }, // Set the marker label
    });
    new google.maps.Marker({
      position: { lat: 46.621886, lng: 27.522859 }, // Replace with the desired coordinates
      map: map_troite1, // Replace "map" with your Google Maps instance
      label: {
        text: 'H', // The letter "C" to be displayed on the marker
        color: '#FFFFFF', // Marker label color (white in this example)
        fontSize: '16px', // Marker label font size
      }, // Set the marker label
    });
  });
}
initMap();

// swiper fastaci
const swiperFastaci = new Swiper('.swiper-fastaci', {
  effect: 'cards',
  grabCursor: true,
});
