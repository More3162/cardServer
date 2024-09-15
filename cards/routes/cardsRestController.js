const { Router } = require('express');
const { createCard, getCards, getCard, getMyCards, updateCard, deleteCard, likeCard } = require('../models/cardsAccessDataService');
const auth = require('../../auth/authService');
const { normalizeCard } = require('../helpers/normalizeCard');
const Card = require('../models/mongodb/Cards');

const router = Router();

// create a new card
router.post('/', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(401).send("Only business user can create a card");
        }

        let card = normalizeCard(req.body, userInfo._id);
        card = await createCard(card);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/my-cards', auth, async (req, res) => {
    try {
        const { user_id } = req.body;
        let cards = await getMyCards(user_id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get(`/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        let card = await getCard(id);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//update a card by id
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        let card = await updateCard(id, req.body);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//like a card by card id
router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        if (Object.keys(req.body).includes('bizNumber')) {
            // Biz Number Patching
            const { bizNumber } = req.body;
            let card = await changeBizNumer(id, bizNumber);
            res.send(card);
        } else {
            // Like Patching
            const { user_id } = req.body;
            let card = await likeCard(id, user_id);
            res.send(card);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//delete a card by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        let card = await deleteCard(id, user_id);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
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