
// Your project must include 4 of the 6 following features (but may include more):
// One or more Classes (must use static methods and/or prototype methods)
// Sets, updates, or changes local storage

// 1. Validate forms and address

// 2. google API fetch requeest to autocomplete address. set google logo

// 3. Timing function to show banner at top of the page for special - fade in/fade out.

// 4. Jasmine unit test


// Banner in
function bannerInOut() {
    setTimeout(() => {
        document.getElementById('banner').removeAttribute('hidden');
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

firstName.addEventListener('change',fNameValidation);

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
lastName.addEventListener('change',lNameValidation);

//Validate email

const eMail = document.getElementById("email");

function EmailValidation() {
    const eMailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(eMail.value);
    if (eMailVal === true) {
        eMail.classList.remove('invalid');
        eMail.classList.add('valid');
    } else if (eMailVal  === false) {
        eMail.classList.remove('valid');
        eMail.classList.add('invalid');
    } else {
    }
}
eMail.addEventListener('change',EmailValidation);

//Validate phone number

const phoneNumber = document.getElementById("phonenumber");

function phoneValidation() {
    const phoneVal = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(phoneNumber.value);
    if (phoneVal === true) {
        phoneNumber.classList.remove('invalid');
        phoneNumber.classList.add('valid');
    } else if (phoneVal  === false) {
        phoneNumber.classList.remove('valid');
        phoneNumber.classList.add('invalid');
    } else {
    }
}
phoneNumber.addEventListener('change',phoneValidation);

//Address google places auto complete

let autocomplete;
const streetAddress = document.getElementById('streetaddress');

function initAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(
        streetAddress,
        {
            types: ['address'],
            componentRestrictions: {'country': ['USA']},
            fields: ['formatted_address']
        });
        // let result = Autocomplete.getPlace();
        //     autocomplete.addListener('place_changed', addressValidation);
        //     console.log(result)

}

// Address validation 

function addressValidation() {
    console.log(result)
    const addressVal = /^\d{1,}\s((\D+\s+)|(\d+\D+\s+))/.test(streetAddress.value);
    if (addressVal === true) {
        streetAddress.classList.remove('invalid');
        streetAddress.classList.add('valid');
    } else if (addressVal  === false) {
        streetAddress.classList.remove('valid');
        streetAddress.classList.add('invalid');
        
    } else {
    }
}





