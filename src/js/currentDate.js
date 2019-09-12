function showDate() {
    let currentDate = new Date();
    let numberDay = currentDate.getDate();
    if (numberDay < 10) {
        numberDay = "0" + numberDay
    }
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let month;
    let day;

    switch (currentDate.getMonth()) {

        case 0:
            month = "styczeń";
            break;

        case 1:
            month = "luty";
            break;

        case 2:
            month = "marzec";
            break;

        case 3:
            month = "kwiecień";
            break;

        case 4:
            month = "maj";
            break;

        case 5:
            month = "czerwiec";
            break;

        case 6:
            month = "lipiec";
            break;

        case 7:
            month = "sierpień";
            break;

        case 8:
            month = "wrzesień";
            break;

        case 9:
            month = "październik";
            break;

        case 10:
            month = "listopad";
            break;

        case 11:
            month = "grudzień";
            break;

    }
    switch (currentDate.getDay()) {

        case 0:
            day = "Niedziela";
            break;

        case 1:
            day = "Poniedziałek";
            break;

        case 2:
            day = "Wtorek";
            break;

        case 3:
            day = "Środa";
            break;

        case 4:
            day = "Czwartek";
            break;

        case 5:
            day = "Piątek";
            break;

        case 6:
            day = "Sobota";
            break;

    }

    document.getElementsByClassName('showDate')[0].innerHTML = day + ", " + numberDay + " " + month + " " + year + " " + hours + ":" + minutes;
};
showDate();
setInterval(showDate, 1000);