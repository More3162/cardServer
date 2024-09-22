const { Router } = require('express');
const { createCard, getCards, getCard, getMyCards, updateCard, deleteCard, likeCard } = require('../models/cardsAccessDataService');
const auth = require('../../auth/authService');
const { normalizeCard } = require('../helpers/normalizeCard');
const Card = require('../models/mongodb/Cards');
const { handleError } = require('../../utils/handleErrors');
const validateCard = require('../validation/cardValidationService');

const router = Router();

// create a new card
router.post('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, 403, "Only business user can create a card")
        }
        const errorMessage = validateCard(req.body)
        if (errorMessage !== "") {
            return handleError(res, 400, "validation Error: " + errorMessage)
        }

        let card = await normalizeCard(req.body, userInfo._id);
        console.log(card)
        card = await createCard(card);
        return res.status(201).send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
})

router.get('/', async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
})

router.get('/my-cards', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, error.status || 403, "Only business user can get their cards");
        }
        let cards = await getMyCards(userInfo._id);
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 403, error.message);
    }
})

router.get(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        let card = await getCard(id);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
})

//update a card by id
router.put('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const newCard = req.body;

        const fullCardFromDeb = await Card(id);

        if (userInfo._id !== fullCardFromDeb.user_id.toString() && !userInfo.isAdmin) {
            return handleError(res, error.status || 403, "You can only update your own card")
        }

        const errorMessage = validateCard(req.body)
        if (errorMessage !== "") {
            return handleError(res, 400, "validation Error: " + errorMessage)
        }

        let card = await normalizeCard(id, newCard);
        card = await updateCard(id, card);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 403, error.message);
    }
})

//like a card by card id
router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        // Like Patching
        let card = await likeCard(id, userId);
        res.send(card);
    } catch (error) {
        return handleError(res, error.status || 403, error.message)
    }
}
);

//delete a card by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const fullCardFromDeb = await Card(id);

        if (userInfo._id !== fullCardFromDeb.user_id.toString() && !userInfo.isAdmin) {
            return handleError(res, 403, "You can only delete your own card")
        }

        let card = await deleteCard(id);
        res.send(card);
    } catch (error) {
        return handleError(res, error.status || 400, error.message)
    }
})

module.exports = router;


/* 

// create a new card
app.post('/cards', async (req, res) => {
    try {
        let card = await createCard(req.body); // req.body is the new card
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all cards
app.get('/cards', async (req, res) => { // get all cards from the Server
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all cards by user id
app.get('/cards/my-cards', async (req, res) => {
    try {
        const { id } = req.body;
        let cards = await getMyCards(id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/cards/:id', async (req, res) => { // get a card by id - query parameter
    try {
        const { id } = req.params; // get the id from the query parameter

        let card = await getCard(id); // get the card by id
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//update a card by id
app.put("/cards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newCard = req.body;
        let card = await updateCard(id, newCard);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//delete a card by id
app.delete("/cards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let card = await deleteCard(id);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//like a card by card id
app.patch("/cards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        let card = await likeCard(id, userId);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
*/