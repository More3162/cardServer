const config = require("config");
const DB = config.get("DB");

const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Cards");

// Create a new card
const createCard = async (newCard) => {
    if (DB === "mongodb") {
        try {
            let card = new Card(newCard);
            card = await card.save();
            return newCard;
        } catch (error) {
            return createError("Mongoose", error);
        }
    }
    const error = new Error("ther is not other db for this request");
    error.status = 500;
    return createError("DB", error);
}

// Get all cards
const getCards = async () => {
    try {
        let cards = await Card.find();
        return cards;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

// Get a card by id
const getCard = async (id) => {
    try {
        let card = await Card.findById(id);
        return card;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

// Get all cards by user id
const getMyCards = async (user_id) => {
    try {
        let cards = await Card.find({ user_id: user_id });
        return cards;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

// Update a card by id
const updateCard = async (cardId, newCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true });
        return card;
    } catch (error) {
        return createError("Mongoose", error);
    }
}

// Delete a card by id
const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    } catch (error) {
        return createError("Mongoose", error);
    }
}

// Like a card by id
const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId); // משכתי את הכרטיס מהמאגר
        if (!card) {
            const error = new Error(
                "A card with this ID cannot be found in the database"
            );
            error.status = 404;
            return createError("Mongoose", error);
        }
        if (card && card.likes.includes(userId)) { // מביא את המערך של הכרטיס עם כל היוזר איידי שאהב את הכרטיס
            let newLikesAeeay = card.likes.filter((id) => id != userId); // מסנן את כל הלייקים של הכרטיסים ומוחק את היוזר שלחץ לייק
            card.likes = newLikesAeeay; // מעדכן את המערך של הלייקים בכרטיס
        } else {
            card.likes.push(userId); // מוסיף למערך של הלייקים את היוזר שלחץ לייק
        }
        await card.save(); // שומר את הכרטיס במאגר
        return card; // מחזיר את הכרטיס
    } catch (error) {
        return createError("Mongoose", error);
    }
}


module.exports = {
    createCard,
    getCards,
    getCard,
    getMyCards,
    updateCard,
    deleteCard,
    likeCard
};
