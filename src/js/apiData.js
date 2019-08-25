/* 
  W dużym skrócie metoda getApiData zwraca 6 elementowa tablice [każdy element odpowiada 1 dniowi], każdy element jest obiektem który zawiera informacje odnośnie pogody,
  każdy element ma takie pola :
    date - data w postaci stringa,
    temp - temperatura(w prognozach na nastepne 5 dni jest to srednia danych z całego dnia(8 pomiarów zazwyczaj))
    temp_min - temperatura minimalna (w prognozach jest to minimalna temperatura ze wszystkich minimalnych temperatur pomiarów)
    temp_max - ta samo co wyżej
    weather - pogoda opisana za pomoca stringa (np. "Clouds") - w prognozach podałem to co wystepuje najczesciej ale to mozna ewentualnie zmienic
    desciption - nie wiem czy ta informacja była potrzebna jest to rozszerzenie informacji weather, rowniez brałem najczęsciej występującą
    icon - tutaj też nie wiedziałem czy się przyda ale jak coś jest
    wind_speed - prędkość wiatru (w prognozach średnia z całego dnia zaokrąglona)
    pressure -  ciśnienie (w prognozach jak wyżej)
    humidity - wilgotność (również)
  W razie niepewności albo błędów/niedopatrzeń z mojej strony z chęcią przyjmę krytykę i postaram się to naprawić
*/


async function getApiData(cityName){
  const current = await  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=70e6060b22d5d79f05a17ef7fadfdbda`);
  const forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=70e6060b22d5d79f05a17ef7fadfdbda`);
  const textCurrent = await current.text();
  const textForecast = await forecast.text();
  const jsonCurrent = JSON.parse(textCurrent);
  const jsonForecast = JSON.parse(textForecast);
  const resultArray = [];
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;
  const meteo = toMeteoObject(dateTime,Math.floor(jsonCurrent.main.temp),Math.floor(jsonCurrent.main.temp_min), Math.floor(jsonCurrent.main.temp_max), jsonCurrent.weather[0].main, jsonCurrent.weather[0].description, jsonCurrent.weather[0].icon, jsonCurrent.wind.speed, jsonCurrent.main.pressure, jsonCurrent.main.humidity);
  resultArray.push(meteo);
  const dividedArray = divideArray(jsonForecast.list);
  for(let i = 1; i < dividedArray.length; i++){
      resultArray.push(transformToObject(dividedArray[i]));
  }
  return resultArray;
}


function divideArray(meteoArr){
  var dayArray = [];
  var dividedArray = [];

  let data1 = new Date(meteoArr[0].dt_txt);
  data1 = data1.getDay();
  dayArray.push(meteoArr[0])

  for(let i = 1; i < meteoArr.length; i++){
      let data2 = new Date(meteoArr[i].dt_txt);
      data2 = data2.getDay();
      if(data1 == data2){
          dayArray.push(meteoArr[i])
      }
      else {
          dividedArray.push(dayArray);
          dayArray = [];
          dayArray.push(meteoArr[i]);
      }
      data1 = data2;

  }
  dividedArray.push(dayArray);
  return dividedArray;
}

function transformToObject(dayArray){
  let date = dayArray[0].dt_txt;
  let temp_min = dayArray[0].main.temp_min;
  let temp_max = dayArray[0].main.temp_max;
  let weatherArray = [dayArray[0].weather[0].main];
  let descriptionArray = [dayArray[0].weather[0].description];
  let iconArray = [dayArray[0].weather[0].icon];
  let sumTemp = 0;
  let sumHumidity = 0;
  let sumPressure = 0;
  let sumWindSpeed = 0;
  for(let i = 1; i < dayArray.length; i++){
      if(dayArray[i].main.temp_min < temp_min)
          temp_min = dayArray[i].main.temp_min;
      if(dayArray[i].main.temp_max > temp_max)
          temp_max = dayArray[i].main.temp_max;
      weatherArray.push(dayArray[i].weather[0].main);
      descriptionArray.push(dayArray[i].weather[0].description);
      iconArray.push(dayArray[i].weather[0].icon);
      sumTemp += dayArray[i].main.temp;
      sumHumidity += dayArray[i].main.humidity;
      sumPressure += dayArray[i].main.pressure;
      sumWindSpeed += dayArray[i].wind.speed;
  }
  let weather = mostCommonInArray(weatherArray);
  let description = mostCommonInArray(descriptionArray);
  let icon = mostCommonInArray(iconArray);
  let temp = Math.floor(sumTemp / dayArray.length);
  let humidity = Math.floor(sumHumidity / dayArray.length);
  let pressure = Math.floor(sumPressure / dayArray.length);
  let windSpeed = Math.floor(sumWindSpeed / dayArray.length);

  return toMeteoObject(date,temp,Math.floor(temp_min),Math.floor(temp_max),weather,description,icon,windSpeed,pressure,humidity);
}


function toMeteoObject(date,temp,temp_min,temp_max,weather, description,icon,wind_speed, pressure, humidity){
  const object = {
      weather: weather,
      description: description,
      icon: icon,
      temp_min: temp_min,
      temp_max: temp_max,
      wind_speed: wind_speed,
      pressure: pressure,
      humidity: humidity,
      date: date,
      temp: temp,
  }
  return object;
}

function mostCommonInArray(array){
  array.sort();
  let count = 0;
  let maxCount = 0;
  let element = array[0];
  for(let i = 0; i < array.length ; i++){
      count++;
      if(i != array.length - 1 && array[i] != array[i+1]){
          if(count > maxCount){
              maxCount = count;
              count = 0;
              element = array[i];
          }
      }
  }
  return element;
}

export default getApiData;
