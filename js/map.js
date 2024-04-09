const showLocBtn = document.querySelector('#find-me');
const stat = document.querySelector('#status');
const coOrds = document.querySelector('#co-ords');

// console.log(showLocBtn);
// console.log(stat);
// console.log(coOrds);

showLocBtn.addEventListener('click', geoFindMe);


function geoFindMe(){
    stat.textContent = '';
    coOrds.textContent = '';
    

    function success(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        stat.textContent = '';
        coOrds.textContent = `Latitude: ${latitude}° Longitude: ${longitude}°`;
    }

    function error(){
        stat.textContent = 'Unable to find your location!';
    }

    if(!navigator.geolocation){
        stat.textContent = 'Geolocation is not supported by your browser!';
    }
    else{
        stat.textContent = 'Locating.....';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}