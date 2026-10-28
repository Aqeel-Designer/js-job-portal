//in this file we will be defining some validations , and how to handle the errors if validation is unsuccessful

function isEmpty(value) {
    return !value || value.trim().length === 0;
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //checks email pattern
    return emailPattern.test(email.trim());
}

const minPhoneDigits = 11; //min phone digits
function isValidPhone(phone) {
    const digitsOnly = phone.replace(/\D/g, ""); //removes not digits with ""
    const allowedCharsPattern = /^[0-9+\-()\s]+$/; //accepts +,-,(,)
    return allowedCharsPattern.test(phone.trim()) && digitsOnly.length >= minPhoneDigits;  //requires at least 11 digits
}

const MinCoverLetterLength = 30;   //cover letter min length
function isValidCoverLetter(text) {
    return text.trim().length >= MinCoverLetterLength;
}

//this function will take object and return an object of errors. The form is valid if the returned objects have no keys
function validateApplyForm(formValues) {
    const errors = {};

    if (isEmpty(formValues.fullName)) {
        errors.fullName = "Please enter you full name";
    }
    if (isEmpty(formValues.email)) {
        errors.email = "Please enter you email address";
    } else if (!isValidEmail(formValues.email)) {
        errors.email = "Please enter a valid email address";
    }
    if (isEmpty(formValues.phone)) {
        errors.phone = "Please enter your phone number";
    } else if (!isValidPhone(formValues.phone)) {
        errors.phone = "Please enter a valid phone number";
    }
    if (isEmpty(formValues.coverLetter)) {
        errors.coverLetter = "Please write a short cover letter.";
    } else if (!isValidCoverLetter(formValues.coverLetter)) {
        errors.coverLetter = "Cover letter must be at least " + MinCoverLetterLength + " characters.";
    }
    if (isEmpty(formValues.cvFileName)) {
        errors.cv = "Please attach your CV.";
    }
    return errors;

}