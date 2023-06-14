import "./vreme";
import "./header";
import "../styles/header.css";
import "../styles/routes_car.css";
import "../styles/tailwind.css";

const mapOptions = {
    center: {
        lat: 46.922713,
        lng: 27.669592,
    },
    zoom: 7,
    minZoom: 8,
    maxZoom: 14,
    mapId: "c9bed3fb4e324d65",
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
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING, // Adjust the travel mode as needed
    };

    directionsService.route(request, function (result, status) {
        if (status == "OK") {
            directionsRenderer.setDirections(result);
        }
    });
};

function initMap() {
    var map1 = new google.maps.Map(document.getElementById("map"), mapOptions);
    var map2 = new google.maps.Map(document.getElementById("map2"), mapOptions);
    var map3 = new google.maps.Map(document.getElementById("map3"), mapOptions);
    const locations1 = [
        // Change the coordinates and title as needed
        { title: "fastaci", location: { lat: 46.733398, lng: 27.450334 } },
        { title: "muzeu stefan", location: { lat: 46.638707, lng: 27.730938 } },
        { title: "cuza casa", location: { lat: 46.759646, lng: 27.786175 } },
        { title: "cuza mormant", location: { lat: 46.759893, lng: 27.78734 } },
        {
            title: "muzeu satu nou",
            location: { lat: 46.782874, lng: 27.798095 },
        },
        { title: "movila", location: { lat: 46.845844, lng: 27.805868 } },
        {
            title: "movila biserica",
            location: { lat: 46.847905, lng: 27.802326 },
        },
        {
            title: "emil racovita",
            location: { lat: 46.874464, lng: 27.682028 },
        },
        // Add more locations as needed
    ];
    const locations2 = [
        {
            title: "manastirea floresti",
            location: { lat: 46.554261, lng: 27.557337 },
        }, // Change the coordinates and title as needed
        {
            title: "manastirea Sfântului Ioan",
            location: { lat: 46.622377, lng: 27.413383 },
        },
        {
            title: "casa alexandru cuza",
            location: { lat: 46.222863, lng: 27.683793 },
        },
        {
            title: "podul doamnei",
            location: { lat: 46.445445, lng: 27.812372 },
        },
        {
            title: "manastirea moreni",
            location: { lat: 46.513267, lng: 27.732386 },
        },
        {
            title: "schitul ticlaoani",
            location: { lat: 46.509515, lng: 27.737904 },
        },
        {
            title: "statuia",
            location: { lat: 46.572284, lng: 27.788597 },
        },
        // Add more locations as needed
    ];
    const locations3 = [
        { title: "Location 1", location: { lat: 46.633457, lng: 27.731707 } }, // Change the coordinates and title as needed
        { title: "Location 2", location: { lat: 46.28297, lng: 27.851143 } },
        { title: "Location 2", location: { lat: 46.230729, lng: 27.671857 } },
        { title: "Location 2", location: { lat: 46.24372, lng: 27.675723 } },
        { title: "Location 2", location: { lat: 46.268875, lng: 28.122305 } },
        { title: "Location 2", location: { lat: 46.788583, lng: 27.989254 } },

        // Add more locations as needed
    ];
    EditMap(map1, locations1);
    EditMap(map2, locations2);
    EditMap(map3, locations3);
}
initMap();

// swiper fastaci
