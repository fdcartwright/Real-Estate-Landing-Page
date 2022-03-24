
// Your project must include 4 of the 6 following features (but may include more):
// One or more Classes (must use static methods and/or prototype methods)
// Sets, updates, or changes local storage


// API fetch requeest


//  Jasmine unit test


// Banner in
function bannerInOut() {
    setTimeout(() => {
        document.getElementById('banner').innerHTML = 'Talk To A Realtor About Our Special Pricing Today!';
    }, 8000);
}
bannerInOut();

//Validate first name

const formEl = document.getElementsByName('form');
const firstName = document.getElementById("firstname");

function fNameValidation() {
    const fName = /^[A-Za-z\s]+$/.test(firstName.value);
    if (fName === true) {
        firstName.classList.remove('invalid');
        firstName.classList.add('valid');
    } else if (fName === false) {
        firstName.classList.remove('valid');
        firstName.classList.add('invalid');
    } else {
    }
}

firstName.addEventListener('change', fNameValidation);

// Validate last name

const lastName = document.getElementById("lastname");

function lNameValidation() {
    const lName = /^[A-Za-z\s]+$/.test(lastName.value);
    if (lName === true) {
        lastName.classList.remove('invalid');
        lastName.classList.add('valid');
    } else if (lName === false) {
        lastName.classList.remove('valid');
        lastName.classList.add('invalid');
    } else {
    }
}
lastName.addEventListener('change', lNameValidation);

//Validate email

const eMail = document.getElementById("email");

function EmailValidation() {
    const eMailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(eMail.value);
    if (eMailVal === true) {
        eMail.classList.remove('invalid');
        eMail.classList.add('valid');
    } else if (eMailVal === false) {
        eMail.classList.remove('valid');
        eMail.classList.add('invalid');
    } else {
    }
}
eMail.addEventListener('change', EmailValidation);

//Validate phone number

const phoneNumber = document.getElementById("phonenumber");

function phoneValidation() {
    const phoneVal = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(phoneNumber.value);
    if (phoneVal === true) {
        phoneNumber.classList.remove('invalid');
        phoneNumber.classList.add('valid');
    } else if (phoneVal === false) {
        phoneNumber.classList.remove('valid');
        phoneNumber.classList.add('invalid');
    } else {
    }
}
phoneNumber.addEventListener('change', phoneValidation);

//Address google places auto complete

const streetAddress = document.getElementById('streetaddress');
const stateEl = document.getElementById('stateselect');
const cityEl = document.getElementById('cityselect');
const zipEl = document.getElementById('zipselect');

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

    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                address1 += component.short_name;
                break;
            }

            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case "locality":
                document.getElementById('cityselect').value = component.long_name;
                break;
            case "administrative_area_level_1": {
                document.getElementById('stateselect').value = component.short_name;
                break;
            }
        }

        address1Field.value = address1;
        postalField.value = postcode;

        address2Field.focus();
        addressValidation();
    }

//Address validation 

    function addressValidation() {
        const addressVal = /^\d{1,}\s((\D+\s+)|(\d+\D+\s+))/.test(streetAddress.value);
        if (addressVal === true) {
            streetAddress.classList.remove('invalid');
            stateEl.classList.remove('invalid');
            cityEl.classList.remove('invalid');
            zipEl.classList.remove('invalid');
            streetAddress.classList.add('valid');
            stateEl.classList.add('valid');
            cityEl.classList.add('valid');
            zipEl.classList.add('valid');
        } else if (addressVal === false) {
            streetAddress.classList.remove('valid');
            stateEl.classList.remove('valid');
            cityEl.classList.remove('valid');
            zipEl.classList.remove('valid');
            streetAddress.classList.add('invalid');
            stateEl.classList.add('invalid');
            cityEl.classList.add('invalid');
            zipEl.classList.add('invalid');
        } else {
        }
    };
};


function addressValidationFirst() {
    const addressVal = /^\d{1,}\s((\D+\s+)|(\d+\D+\s+))/.test(streetAddress.value);
    if (addressVal === true) {
        streetAddress.classList.remove('invalid');
        stateEl.classList.remove('invalid');
        cityEl.classList.remove('invalid');
        zipEl.classList.remove('invalid');
        streetAddress.classList.add('valid');
        stateEl.classList.add('valid');
        cityEl.classList.add('valid');
        zipEl.classList.add('valid');
    } else if (addressVal === false) {
        streetAddress.classList.remove('valid');
        stateEl.classList.remove('valid');
        cityEl.classList.remove('valid');
        zipEl.classList.remove('valid');
        streetAddress.classList.add('invalid');
        stateEl.classList.add('invalid');
        cityEl.classList.add('invalid');
        zipEl.classList.add('invalid');
    } else {
    }
};

streetAddress.addEventListener('change', addressValidationFirst);

//Google autocomplete temp https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform 

