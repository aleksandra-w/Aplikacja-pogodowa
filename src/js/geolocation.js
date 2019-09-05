const btnPos = document
    .querySelector(".leftAsideBox__findCity--button")
    .addEventListener('click', getLocation);
const btnWeather = document
    .querySelector(".leftAsideBox__ChooseCity--button")
    .addEventListener('click', getWeather);
// Prevent form submit
document.querySelector(".leftAsideBox__ChooseCity--button").addEventListener('click',(event)=>event.preventDefault());
const divPos = document.querySelector(".main__box1--header");
const divWeather = document.querySelector(".main__box1--paragraph");

let myRes;

// Get location of navigator
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error);
  } else { 
    const main = document.querySelector(".main");
    const node = document.createElement("div");
    const textnode = document.createTextNode("Geolocation is not supported by this browser.");
    const child = document.querySelector(".main__box1"); 
    node.classList.add("no-connection") 
    node.appendChild(textnode);                        
    main.insertBefore(node, child);
  }
};

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=307b855de38a960270e1caa9d305240a`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      myRes=data;
      divPos.innerHTML =`Twoje miasto: ${myRes.name}<br>
      Szerokość geograficzna (Latitude): ${lat}<br>
      Długość geograficzna (Longitude): ${lon}`;
      divWeather.innerHTML = `
      The weather in ${myRes.name} is: ${myRes.weather[0].main}`
    })
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
    const main = document.querySelector(".main");
    const node = document.createElement("div");
    const textnode = document.createTextNode("geolokalizacja niedostępna");
    const child = document.querySelector(".main__box1"); 
    node.classList.add("no-connection") 
    node.appendChild(textnode);                        
    main.insertBefore(node, child); 
};

// Get city from input
async function getCity(){
  const inputCity = document.querySelector('.leftAsideBox__ChooseCity--input').value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&APPID=307b855de38a960270e1caa9d305240a`;
  const response = await fetch(url);
  const result = await response.json();
  myRes=result;
};

// Get weather for city from input
async function getWeather(){
  await getCity();
  divWeather.innerHTML = `
    The weather in ${myRes.name} is: ${myRes.weather[0].main}`;
};

getLocation();