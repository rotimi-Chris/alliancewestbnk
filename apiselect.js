var config = {
    baseUrl: 'https://api.countrystatecity.in/v1',
    apiKey: 'TlpJNDNnYXpydUpMbG5BZnNhUmNYUHlLWjd4bEFuUUFzTWQ5QVRnTA==' // replace if needed
};

var countrySelect = document.querySelector('.country');
var stateSelect = document.querySelector('.state');
var citySelect = document.querySelector('.city');

// Load Countries
function loadCountries() {
    fetch(`${config.baseUrl}/countries`, {
        headers: { "X-CSCAPI-KEY": config.apiKey }
    })
    .then(res => res.json())
    .then(countries => {
        countries.forEach(country => {
            let opt = document.createElement('option');
            opt.value = country.iso2;
            opt.textContent = country.name;
            countrySelect.appendChild(opt);
        });
    })
    .catch(err => console.error('Error loading countries:', err));
}

// Load States for selected Country
function loadStates(countryCode) {
    stateSelect.innerHTML = '<option disabled selected>State</option>';
    citySelect.innerHTML = '<option disabled selected>City</option>';

    fetch(`${config.baseUrl}/countries/${countryCode}/states`, {
        headers: { "X-CSCAPI-KEY": config.apiKey }
    })
    .then(res => res.json())
    .then(states => {
        states.forEach(state => {
            let opt = document.createElement('option');
            opt.value = state.iso2;
            opt.textContent = state.name;
            stateSelect.appendChild(opt);
        });
    })
    .catch(err => console.error('Error loading states:', err));
}

// Load Cities for selected State
function loadCities(countryCode, stateCode) {
    citySelect.innerHTML = '<option disabled selected>City</option>';

    fetch(`${config.baseUrl}/countries/${countryCode}/states/${stateCode}/cities`, {
        headers: { "X-CSCAPI-KEY": config.apiKey }
    })
    .then(res => res.json())
    .then(cities => {
        cities.forEach(city => {
            let opt = document.createElement('option');
            opt.value = city.name;
            opt.textContent = city.name;
            citySelect.appendChild(opt);
        });
    })
    .catch(err => console.error('Error loading cities:', err));
}

// Event Listeners
countrySelect.addEventListener('change', function() {
    loadStates(this.value);
});

stateSelect.addEventListener('change', function() {
    loadCities(countrySelect.value, this.value);
});

// Init
window.onload = loadCountries;
