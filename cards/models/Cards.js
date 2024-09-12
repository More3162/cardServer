const mongoose = require('mongoose');
const { PHONE, DEFAULT_VALIDATION, EMAIL, URL } = require('../../helpers/mongodb/mongooseValidators');
const Image = require('../../helpers/mongodb/image');
const Address = require('../../helpers/mongodb/Address');


const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        required: true,
        trim: true,
        min: 1000000,
        max: 9999999,
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;