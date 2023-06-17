import '../styles/header.css';
import '../styles/routes_onfeet.css';
import '../styles/tailwind.css';
import './vreme';
import './header';

// RO SWITCH
const roSwitchs = document.querySelectorAll('.ro-switch');

roSwitchs.forEach((roSwitch) => {
  roSwitch.addEventListener('click', () => {
    location.href = location.origin;
  });
});

const mapOptions1 = {
  center: { lat: 46.638361, lng: 27.732389 },
  zoom: 15,
  minZoom: 8,
  maxZoom: 16,
};
const mapOptions2 = {
  center: { lat: 46.226581, lng: 27.669327 },
  zoom: 15,
  minZoom: 8,
  maxZoom: 16,
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
    travelMode: google.maps.TravelMode.WALKING, // Adjust the travel mode as needed
  };

  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
};

function initMap() {
  var map1 = new google.maps.Map(document.getElementById('map'), mapOptions1);
  var map2 = new google.maps.Map(document.getElementById('map2'), mapOptions2);
  // Valui
  const locations1 = [
    {
      title: 'sf ion',
      location: { lat: 46.633615, lng: 27.730998 },
    },
    {
      title: 'teatru de vara',
      location: { lat: 46.638249, lng: 27.733471 },
    },
    {
      title: 'muzeu',
      location: { lat: 46.638471, lng: 27.73058 },
    },
    {
      title: 'secu',
      location: { lat: 46.638589, lng: 27.729738 },
    },
    {
      title: 'copou',
      location: { lat: 46.645721, lng: 27.728384 },
    },

    // Add more locations as needed
  ];

  // Barlad
  const locations2 = [
    {
      title: 'zoo',
      location: { lat: 46.243636, lng: 27.67573 },
    },
    {
      title: 'gradina publica',
      location: { lat: 46.24117, lng: 27.67465 },
    },
    {
      title: 'm. emin',
      location: { lat: 46.23649, lng: 27.670933 },
    },
    {
      title: 'muzeu ',
      location: { lat: 46.230642, lng: 27.671987 },
    },
    {
      title: 'muzeu + planetariu',
      location: { lat: 46.231498, lng: 27.669679 },
    },
    {
      title: 'casa sturza',
      location: { lat: 46.23036, lng: 27.673468 },
    },
    {
      title: 'casa sturza',
      location: { lat: 46.222861, lng: 27.683799 },
    },
    // Add more locations as needed
  ];
  EditMap(map1, locations1);
  EditMap(map2, locations2);
}
initMap();

// swiper fastaci
