
import {showMeteoData} from "./showMeteoData";
import { getLocation } from "./geolocation";

// saveLastInput wywoływane jest w showMeteoData, gdzie zczytuje ostatnie wyswietlane miasto
async function saveLastInput (cityToSave) {
    await window.localStorage.setItem("last searching", cityToSave); 
}
//jesli jest cos zapisane w local storage to wyswietla pogodę dla tego maista a jak nie to dla lokalizacji
async function getLastLocation () {
    if (localStorage.getItem("last searching") != null) {
        const last = await window.localStorage.getItem("last searching"); 
        document.getElementsByClassName("main__box1--header header").value = last;
    
        showMeteoData(last)
    } else { getLocation() }
}

window.onload = getLastLocation;
export { saveLastInput }


