
//***Graded features have these stars***

const streetAddress = document.getElementById('streetaddress');
const stateEl = document.getElementById('stateselect');
const cityEl = document.getElementById('cityselect');
const zipEl = document.getElementById('zipselect');
const submitButton = document.getElementById('submitbutton');
const formEl = document.getElementsByName('form');
const firstName = document.getElementById("firstname");
const emailEl = document.getElementById('email');
const phoneNum = document.getElementById('phonenumber');
const address2 = document.getElementById('streetaddress2');
const googleTag = document.getElementById('google-tag');
const formText = document.getElementById('form-text');
let validated = 0;

// ***One timing function - Red "Talk to a Realtor" Banner***
function bannerInOut() {
    setTimeout(() => {
        document.getElementById('banner').innerHTML = 'Talk To A Realtor About Our Special Pricing Today!';
    }, 8000);
};

bannerInOut();

//***Form validatation - first name***
function fNameValidation() {
    const fName = /^[A-Za-z\s]+$/.test(firstName.value);
    if (fName) {
        firstName.classList.remove('invalid');
        firstName.classList.add('valid');
        //***Sets local storage first name***
        localStorage.setItem('first-name', firstName.value)
        validated++;
    } else if (!fName) {
        firstName.classList.remove('valid');
        firstName.classList.add('invalid');
    } else {
    };
};

firstName.addEventListener('change', fNameValidation);

//***Form validatation - last name*** 
const lastName = document.getElementById("lastname");

function lNameValidation() {
    const lName = /^[A-Za-z\s]+$/.test(lastName.value);
    if (lName) {
        lastName.classList.remove('invalid');
        lastName.classList.add('valid');
        validated++;
    } else if (!lName) {
        lastName.classList.remove('valid');
        lastName.classList.add('invalid');
    } else {
    };
};

lastName.addEventListener('change', lNameValidation);

//***Form validatation - e-mail*** 
const eMail = document.getElementById("email");

function EmailValidation() {
    const eMailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(eMail.value);
    if (eMailVal) {
        eMail.classList.remove('invalid');
        eMail.classList.add('valid');
        validated++;
    } else if (!eMailVal) {
        eMail.classList.remove('valid');
        eMail.classList.add('invalid');
    } else {
    };
};

eMail.addEventListener('change', EmailValidation);

//***Form validatation - phone number*** 
const phoneNumber = document.getElementById("phonenumber");

function phoneValidation() {
    const phoneVal = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(phoneNumber.value);
    if (phoneVal) {
        phoneNumber.classList.remove('invalid');
        phoneNumber.classList.add('valid');
        validated++;
    } else if (!phoneVal) {
        phoneNumber.classList.remove('valid');
        phoneNumber.classList.add('invalid');
    } else {
    };
};
phoneNumber.addEventListener('change', phoneValidation);

//Address Google Places autocomplete API (not a fetch API/not graded)
let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {

    address1Field = document.getElementById('streetaddress');
    address2Field = document.getElementById('streetaddress2');
    postalField = document.getElementById('zipselect');
    autocomplete = new google.maps.places.Autocomplete(
        streetAddress,
        {
            types: ['address'],
            componentRestrictions: { 'country': ['us', 'ca'] },
            fields: ['address_components', 'geometry']
        });

    streetAddress.focus();

    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {

    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";

    // *** 3rd party weather API fetch - sends weather data to local storage and from local storage to the text response once the form is completed and submitted (final function clearForm())***
    const lat = place.geometry.viewport.zb.h;
    const lon = place.geometry.viewport.Ua.h;
    // *** API Key Input [ALSO PLACE GOOGLE API KEY IN HTML DOC (these work together for longitude and latitude)]***
    const API_KEY = 'WEATHER_API_KEY_HERE';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            //***Sets local storage weather description***
            localStorage.setItem('weather', data.weather[0].description)
        });

    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            };

            case "route": {
                address1 += component.short_name;
                break;
            };

            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            };

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            };
            case "locality":
                document.getElementById('cityselect').value = component.long_name;
                //***Sets local storage city***
                localStorage.setItem('city', cityEl.value);
                break;
            case "administrative_area_level_1": {
                document.getElementById('stateselect').value = component.short_name;
                break;
            };
        };

        address1Field.value = address1;
        postalField.value = postcode;

        address2Field.focus();
        addressValidation();
    };

    //***Form validatation - address for the Google autocomplete*** 
    function addressValidation() {
        const addressVal = /^\d{1,}\s((\D+\s+)|(\d+\D+\s+))/.test(streetAddress.value);
        if (addressVal) {
            streetAddress.classList.remove('invalid');
            stateEl.classList.remove('invalid');
            cityEl.classList.remove('invalid');
            zipEl.classList.remove('invalid');
            streetAddress.classList.add('valid');
            stateEl.classList.add('valid');
            cityEl.classList.add('valid');
            zipEl.classList.add('valid');
            validated++;
        } else {
        };
    };
};

//***Form validatation - address prior to Google autocomplete*** 
function addressValidationFirst() {
    const addressVal = /^\d{1,}\s((\D+\s+)|(\d+\D+\s+))/.test(streetAddress.value);
    if (!addressVal) {
        streetAddress.classList.remove('valid');
        stateEl.classList.remove('valid');
        cityEl.classList.remove('valid');
        zipEl.classList.remove('valid');
        streetAddress.classList.add('invalid');
        stateEl.classList.add('invalid');
        cityEl.classList.add('invalid');
        zipEl.classList.add('invalid');
    } else {
    };
};

streetAddress.addEventListener('change', addressValidationFirst);
submitButton.addEventListener('click', clearForm);

//on submit button, form clear and add new text.
function clearForm(e) {
    e.preventDefault();
    if (validated >= 11) {
        document.getElementById('submit-error').hidden = true;
        //***Gets local storage weather, city, & first name***
        const dataWeather = localStorage.getItem('weather');
        const dataCity = localStorage.getItem('city');
        const dataName = localStorage.getItem('first-name');
        formText.hidden = true;
        firstName.hidden = true;
        lastName.hidden = true;
        emailEl.hidden = true;
        phoneNum.hidden = true;
        streetAddress.hidden = true;
        address2.hidden = true;
        stateEl.hidden = true;
        cityEl.hidden = true;
        zipEl.hidden = true;
        submitButton.hidden = true;
        googleTag.hidden = true;
        document.getElementById('new-form-text').removeAttribute('hidden');
        document.getElementById('new-form-text').innerHTML = `Thanks, ${dataName}!<br><br>
        It looks like ${dataWeather} in ${dataCity} right now with a chance of increased home values in the forecast!<br><br>
        Keep any eye out for an e-mail with your detailed home valuation.`

    } else {
        document.getElementById('submit-error').removeAttribute('hidden');
    };
};