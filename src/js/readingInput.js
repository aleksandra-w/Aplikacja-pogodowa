import { showMeteoData } from "./showMeteoData"
import { getLocation} from "./geolocation"

const input = document.querySelector('.leftAsideBox__chooseCity--input')
const inputButton = document.querySelector('.leftAsideBox__chooseCity--button')

const findButton = document.querySelector('.leftAsideBox__findCity--button')

const cityString = () => {
    const inputValue =input.value.toString()
    const inputArray =  inputValue.split(", ");
    return inputArray[0];
}

function showInput () {
    const city = cityString();
    showMeteoData(city);
    input.value = ""
}

inputButton.onclick = showInput;
findButton.onclick = getLocation;

