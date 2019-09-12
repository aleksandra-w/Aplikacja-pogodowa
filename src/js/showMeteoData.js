import getMeteoData from "./meteoData"
import { saveLastInput } from "./localStorage"

const showMeteoData = async (city) => {
    try {
        const meteo = await getMeteoData(city);
        const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const month = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia"];
        // stan na obecny dzień
        document.getElementsByClassName("main__box1--header header")[0].innerHTML = city;
        document.getElementsByClassName("main__box2--temp header")[0].innerHTML = `${meteo[0].temp}&deg;C`;
        document.getElementsByClassName("main__box2--minTemp")[0].innerHTML = `temp. min. ${meteo[0].temp_min}&deg;C`;
        document.getElementsByClassName("main__box2--maxTemp")[0].innerHTML = `temp. max. ${meteo[0].temp_max}&deg;C`;
        document.getElementsByClassName("pressure")[0].textContent = `${meteo[0].pressure}hPa`;
        document.getElementsByClassName("humidity")[0].textContent = `${meteo[0].humidity}%`;
        document.getElementsByClassName("wind")[0].textContent = `${meteo[0].wind_speed}km/h`;
    
    // zapisuje ostatnio wyszukiwane miasto do localStorage
    saveLastInput(city);

        //stan na następne 5 dni
        const nextDays = document.querySelectorAll(".rightAside__forcast--day");
        const nextDaysDate = document.querySelectorAll(".rightAside__forcast--date");
        const nextDaysTempMin = document.querySelectorAll(".rightAside__forcast--minMax > p:first-child");
        const nextDaysTempMax = document.querySelectorAll(".rightAside__forcast--minMax > p:last-child");
        nextDays.forEach((element, i) => {
            let dateElement = new Date(meteo[i + 1].date);
            element.innerHTML = days[dateElement.getDay()];
        });
        nextDaysDate.forEach((element, i) => {
            let dateElement = new Date(meteo[i + 1].date);
            element.innerHTML = `${dateElement.getDate()} ${month[dateElement.getMonth()]}`;
        });
        nextDaysTempMin.forEach((element, i) => {
            element.innerHTML = `temp. min: ${meteo[i+1].temp_min}&deg;C`;
        });
        nextDaysTempMax.forEach((element, i) => {
            element.innerHTML = `temp. max: ${meteo[i+1].temp_max}&deg;C`;
        });
    
        //pokazywanie informacji pod miastem i ikon informujących o pogdzie
        const information = document.getElementsByClassName("main__box1--paragraph")[0];
        const mainIcon = document.getElementsByClassName("main__box1--icon")[0];
        const rightIcon = document.querySelectorAll(".rightAside__forcast--icon > img");
        meteo.forEach((day, i)=>{
            let icon = day.icon.substr(0,2);
            switch(icon){
                case "01":
                    if(i==0){
                        information.textContent = 'Nie pada, świeci piękne słoneczko!';
                        mainIcon.style.background = 'url("../src/icons/day.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/day.svg" alt="">';
                        break;
                    }
                case "02":
                    if(i==0){
                        information.textContent = 'Nie pada, ale są lekkie chmurki!';
                        mainIcon.style.background = 'url("../src/icons/cloudy_day_1.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/cloudy_day_1.svg" alt="">';
                        break;
                        }
                case "03":
                    if(i==0){
                        information.textContent = 'Nie pada, ale niebo jest zachmurzone!';
                        mainIcon.style.background = 'url("../src/icons/cloudy.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/cloudy.svg" alt="">';
                        break;
                        }
                case "04":
                    if(i==0){
                        information.textContent = 'Nie pada, ale na niebie grasują groźne chmurki!';
                        mainIcon.style.background = 'url("../src/icons/cloudy.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/cloudy.svg" alt="">';
                        break;
                        } 
                case "09":
                    if(i==0){
                        information.textContent = 'Ojoj pada, weź parasol!';
                        mainIcon.style.background = 'url("../src/icons/rainy_6.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/rainy_6.svg" alt="">';
                        break;
                        }
                case "10":
                    if(i==0){
                        information.textContent = 'Ojoj pada, weź parasol!';
                        mainIcon.style.background = 'url("../src/icons/rainy_3.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/rainy_3.svg" alt="">';
                        break;
                        }
                case "11":
                    if(i==0){
                        information.textContent = 'Burza, chowaj się kto może!';
                        mainIcon.style.background = 'url("../src/icons/rainy_6.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/rainy_6.svg" alt="">';
                        break;
                        }
                case "13":
                    if(i==0){
                        information.textContent = 'Pada śnieg, zaopatrz się w jakieś rękawiczki!';
                        mainIcon.style.background = 'url("../src/icons/snowy_6.svg") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/snowy_6.svg" alt="">';
                        break;
                        }
                case "50":
                    if(i==0){
                        information.textContent = 'Mgła';
                        mainIcon.style.background = 'url("../src/icons/") no-repeat center center/contain';
                        break;}
                    else{
                        rightIcon[i-1].outerHTML = '<img src="../src/icons/snowy_6.svg" alt="">';
                        break;
                        }
            }
        })
    }
    catch(err) {
        let autocomplete = document.getElementById('autocomplete');
        autocomplete.value = 'Błędna nazwa miasta';
        autocomplete.classList.add("redAlert");
        function before () {
            autocomplete.value = "";
            autocomplete.classList.remove("redAlert");
        }
        setTimeout(before, 2000);
    }
}
//showMeteoData("warszawa")
export {showMeteoData};