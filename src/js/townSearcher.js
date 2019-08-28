function citySuggestions () {

    const options = {
        types: ['(cities)'],
        componentRestrictions: {country: "pl"}
       };

    const input = document.getElementById('autocomplete');
    const autocomplete = new google.maps.places.Autocomplete(input, options);
}