
import {sortByDistance} from 'sort-by-distance'


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    };
    
    function success(pos) {
    const crd = pos.coords;
    
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
    
    
    
    const points = [
    { longitude: 36.821945 , latitude: -1.292066 },
    { longitude: 13.436060 , latitude: 52.487620 },
    { longitude: 9.922429 , latitude: 53.751110}
    
    ]
    
    const opts = {
    yName: 'latitude',
    xName: 'longitude'
    }
    
    const origin = { longitude: 10.0368384, latitude: 53.5658496}
    
    console.log(sortByDistance(origin, points, opts))   
