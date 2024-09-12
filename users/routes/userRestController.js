const { Router } = require('express');
const { registerUser, getUsers, getUser, deleteUser, updateUser } = require('../models/usersAccessDataService');
const auth = require('../../auth/authService');

const router = Router();

router.post('/', async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUser(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await updateUser(id, req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;


/*
// create a new user
app.post('/users', async (req, res) => {
    try {
        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all users
app.get('/users', async (req, res) => {
    try {
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get a user by id
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

*/



