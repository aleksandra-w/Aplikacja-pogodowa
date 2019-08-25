const btnPos = document
    .querySelector('.leftAsideBox__findCity--button')
    .addEventListener('click', getLocation);
const btnWeather = document
    .querySelector('.leftAsideBox__ChooseCity--button')
    .addEventListener('click', getWeather);
const divPos = document.querySelector(".main__box1--header");
const divWeather = document.querySelector(".main__box1--paragraph");

let inputCity;
let lat;
let lon;
let myRes;

// Get location of navigator
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error);
  } else { 
    divPos.innerHTML = "Geolocation is not supported by this browser.";
  }
};

async function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=307b855de38a960270e1caa9d305240a`;
  await fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    result=JSON.stringify(response);
    myRes=JSON.parse(result);
  });
  divPos.innerHTML = `Your location: ${myRes.name}<br>
  Latitude: ${lat}<br>
  Longitude: ${lon}`;
  divWeather.innerHTML = `
    the weather in ${myRes.name} is: ${myRes.weather[0].main},
    temp: ${Math.round(myRes.main.temp-273,3)} C,
    wind: ${myRes.wind.speed},
    clouds: ${myRes.clouds.all}`;  
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

getLocation();

// Get city from input
async function getCity (){
  inputCity = document.querySelector('.leftAsideBox__ChooseCity--input').value;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&APPID=307b855de38a960270e1caa9d305240a`;
  await fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    result=JSON.stringify(response);
    myRes=JSON.parse(result);
  });
};

// Get weather for city from input
async function getWeather(){
  await getCity();
  divWeather.innerHTML = `
    the weather in ${myRes.name} is: ${myRes.weather[0].main},
    temp: ${Math.round(myRes.main.temp-273,3)} C,
    wind: ${myRes.wind.speed},
    clouds: ${myRes.clouds.all}`;
};

