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
class meteoObject{
    constructor(date, temp, temp_min, temp_max, weather, description, icon, wind_speed, pressure, humidity){
        this.date = date;
        this.temp = temp;
        this.temp_min = temp_min;
        this.temp_max = temp_max;
        this.weather = weather;
        this.description = description;
        this.icon = icon;
        this.wind_speed = wind_speed;
        this.pressure = pressure;
        this.humidity = humidity;
    }
}

 async function getMeteoData(cityName){
    const currentWeatherObject = await toDataObject(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=70e6060b22d5d79f05a17ef7fadfdbda`); 
    const forecastWeatherObject = await toDataObject(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=70e6060b22d5d79f05a17ef7fadfdbda`);

    const resultArray = [];
    const dateTime  = todayDate();

    const meteo = new meteoObject(dateTime, Math.floor(currentWeatherObject.main.temp), Math.floor(currentWeatherObject.main.temp_min), 
      Math.floor(currentWeatherObject.main.temp_max), currentWeatherObject.weather[0].main, currentWeatherObject.weather[0].description, 
      currentWeatherObject.weather[0].icon, currentWeatherObject.wind.speed, currentWeatherObject.main.pressure, currentWeatherObject.main.humidity);

    resultArray.push(meteo);
    const dividedArray = divideArray(forecastWeatherObject.list);
    for(let i = 1; i < dividedArray.length; i++){
        resultArray.push(transformToObject(dividedArray[i]));
    }

    return resultArray;
  }

  //funkcja pobiera dane z api i zamienia w obiekt 

  async function toDataObject(fetchLink){
    const fetchedData = await fetch(fetchLink); //pobieranie danych z API
    const stringData = await fetchedData.text(); //konwersja pobranych danych w obiekt zapisany w postaci stringa
    const dataObject = JSON.parse(stringData); //konwersja obiektu zapisanego w postaci stringa w prawdziwy obiekt
  
    return dataObject;
  }

  //todayDate zwraca obecna date

  function todayDate(){ 
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
  }
  
  /* 
    Funkcja divideArray służy mi do tego aby podzielić 40 elementową tablice zawierającą prognozy pogody co 3 godziny na 6 elementową, w której każdy element
    reprezentuje zbiór tablic prognoz odnoszących się do 1 dnia, ułatwia to póżniejsza przemiane tych tablic na dane odnośnie prognoz na dany dzień
  */
  function divideArray(meteoArr){
    let dayArray = [];
    const dividedArray = [];
  
    let data1 = new Date(meteoArr[0].dt_txt);
    data1 = data1.getDay();
    dayArray.push(meteoArr[0])

    for(let i = 1; i < meteoArr.length; i++){//for w tym miejscu ponieważ zaczynam od drugiego elementu, a z tego co kojarzę wszystkie iteratory obejmują wszystkie elementy
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

  //transformToObject pzyjmuje jako parametr tablice zawierajaca dane prognoz pogody na dany dzien(co 3 godziny) i zamienia w obiekt (meteoObject) 

  function transformToObject(dayArray){
    const date = dayArray[0].dt_txt;
    let temp_min = dayArray[0].main.temp_min;
    let temp_max = dayArray[0].main.temp_max;
    const weatherArray = [dayArray[0].weather[0].main];
    const descriptionArray = [dayArray[0].weather[0].description];
    const iconArray = [dayArray[0].weather[0].icon];
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
    const weather = mostCommonInArray(weatherArray);
    const description = mostCommonInArray(descriptionArray);
    const icon = mostCommonInArray(iconArray);
    const temp = Math.floor(sumTemp / dayArray.length);
    const humidity = Math.floor(sumHumidity / dayArray.length);
    const pressure = Math.floor(sumPressure / dayArray.length);
    const windSpeed = Math.floor(sumWindSpeed / dayArray.length);
  
    return new meteoObject(date, temp, Math.floor(temp_min), Math.floor(temp_max), weather, description, icon, windSpeed, pressure, humidity);
  }
  
  /*mostCommonInArray - szuka najczestszych wystapien w tablicy, wykorzystuje to przy np. weather, jako że prognozy są co 3 godziny często się to pole zmienia
    dlatego szukam jaka wartość pojawiała się najczęściej
  */
 
  function mostCommonInArray(array){
    const arrayCopy = [...array];
    arrayCopy.sort();

    let count = 0;
    let maxCount = 0;
    let element = arrayCopy[0];

    for(let i = 0; i < array.length ; i++){
        count++;
        if(i != arrayCopy.length - 1 && arrayCopy[i] != arrayCopy[i+1]){
            if(count > maxCount){
                maxCount = count;
                count = 0;
                element = array[i];
            }
        }
    }

    return element;
  }
  
  export default getMeteoData;
  