function citySuggestions () {

    const options = {
        types: ['(cities)'],
        componentRestrictions: {country: "pl"}
       };

    const input = document.getElementById('autocomplete');
    new google.maps.places.Autocomplete(input, options);
}

google.maps.event.addDomListener(window, 'load', citySuggestions);