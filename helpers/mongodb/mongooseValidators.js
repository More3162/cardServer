// how to define  url
// how to define  email
// default schema object
// how to define  phone number

const URL = {
    type: String,
    trim: true, // remove whitespace
    lowercase: true, // convert to lowercase
    match: RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),// url validation

}

const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
    lowercase: true,
    trim: true,
}

const EMAIL = {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),	// email validation
    lowercase: true,
    trim: true,
    unique: true,
}

const PHONE = {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),	// phone number validation
}

// export the URL, EMAIL, DEFAULT_VALIDATION
module.exports = { URL, EMAIL, DEFAULT_VALIDATION, PHONE }