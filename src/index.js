import "./scss/main.scss";

import "./js/townSearcher"
import "./js/loadingScreen"

import getMeteoData from "./js/meteoData"

const getMeteoDataTest = async () => {
    const weather = await getMeteoData("Warszawa")
    console.log(weather)
}

getMeteoDataTest()