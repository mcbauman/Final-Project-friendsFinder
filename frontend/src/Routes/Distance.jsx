

let map, markerA, markerB;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    markerA = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: 'A'
    });
    markerB = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: 'B'
    });
}