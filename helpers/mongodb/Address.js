const mongoose = require('mongoose');
const { DEFAULT_VALIDATION } = require('./mongooseValidators');

const Address = new mongoose.Schema({
    state: {
        type: String,
        maxlength: 255,
        trim: true,
    },
    country: DEFAULT_VALIDATION,
    city: DEFAULT_VALIDATION,
    street: DEFAULT_VALIDATION,
    houseNumber: {
        type: Number,
        required: true,
        min: 1,
    },
    zipCode: {
        type: Number,
        default: 0,
    },
});

module.exports = Address;