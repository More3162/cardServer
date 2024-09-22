const Card = require('../models/mongodb/Cards');
const _ = require('lodash');

const generateBizNumber = async () => {
    let cardsCount = await Card.countDocuments();
    if (cardsCount === 9_000_000) {
        const error = new Error("The maximum number of cards has been reached");
        error.status = 409;
        return createError("mongoose", error);
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isBizNumberExists(random));
    return random;
};


const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        error.status = 500;
        return createError("Mongoose", error);
    }
};

module.exports = { generateBizNumber };


/* 
const isBixNumberExists = async () => {
    // Get all the numbers from the database
    const bizNumbers = await cards.find({}, { bizNumber: 1 });
    return bizNumbers;
}

const generateBizNumber = async (bizNumbers) => {
    // Generate a random number between 1000000 and
    const bizNumber = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    let existingBiz = await isBixNumberExists();

    try {
        // Check if the number is already in use
        if (existingBiz.includes(bizNumber)) {
            // If it is, call the function again to generate a new number
            return generateBizNumber();
        }
        // If it is not, return the number
        return bizNumber;
    }
    catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
} */