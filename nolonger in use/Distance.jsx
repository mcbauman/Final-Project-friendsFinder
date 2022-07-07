import map from "./map.js"

// function getDistance($addressFrom, $addressTo, $unit = ''){
//     // Google API key
//     $apiKey = 'Your_Google_API_Key';
    
//     // Change address format
//     $formattedAddrFrom    = str_replace(' ', '+', $addressFrom);
//     $formattedAddrTo     = str_replace(' ', '+', $addressTo);
    
//     // Geocoding API request with start address
//     $geocodeFrom = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$formattedAddrFrom.'&sensor=false&key='.$apiKey);
//     $outputFrom = json_decode($geocodeFrom);
//     if(!empty($outputFrom->error_message)){
//         return $outputFrom->error_message;
//     }
    
//     // Geocoding API request with end address
//     $geocodeTo = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$formattedAddrTo.'&sensor=false&key='.$apiKey);
//     $outputTo = json_decode($geocodeTo);
//     if(!empty($outputTo->error_message)){
//         return $outputTo->error_message;
//     }
    
//     // Get latitude and longitude from the geodata
//     $latitudeFrom    = $outputFrom->results[0]->geometry->location->lat;
//     $longitudeFrom    = $outputFrom->results[0]->geometry->location->lng;
//     $latitudeTo        = $outputTo->results[0]->geometry->location->lat;
//     $longitudeTo    = $outputTo->results[0]->geometry->location->lng;
    
//     // Calculate distance between latitude and longitude
//     $theta    = $longitudeFrom - $longitudeTo;
//     $dist    = sin(deg2rad($latitudeFrom)) * sin(deg2rad($latitudeTo)) +  cos(deg2rad($latitudeFrom)) * cos(deg2rad($latitudeTo)) * cos(deg2rad($theta));
//     $dist    = acos($dist);
//     $dist    = rad2deg($dist);
//     $miles    = $dist * 60 * 1.1515;
    
//     // Convert unit and return distance
//     $unit = strtoupper($unit);
//     if($unit == "K"){
//         return round($miles * 1.609344, 2).' km';
//     }elseif($unit == "M"){
//         return round($miles * 1609.344, 2).' meters';
//     }else{
//         return round($miles, 2).' miles';
//     }
// }

let map, markerA, markerB;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat:52.487325, lng:13.436518 },
        zoom: 8
    });
    markerA = new google.maps.Marker({
        position: { lat:52.487325, lng:13.436518 },
        map: map,
        title: 'A'
    });
    markerB = new google.maps.Marker({
        position: { lat: 48.548580, lng: 8.727050 },
        map: map,
        title: 'B'
    });
}

