const { Router } = require('express');
const { registerUser, getUsers, getUser, deleteUser, updateUser, loginUser } = require('../models/usersAccessDataService');
const auth = require('../../auth/authService');
const { handleError } = require('../../utils/handleErrors');
const { validateRegistration, validateLogin } = require("../validation/userValidationService")


const router = Router();
// create a new user
router.post('/', async (req, res) => {
    try {
        const error = validateRegistration(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        const user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
})


// get all users

router.get('/', auth, async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
})


// get a user by id
router.get('/:id', auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        if (userInfo._id !== id && !userInfo.isAdmin) {
            return handleError(res, 401, "You can't get other user's data")
        }

        const user = await getUser(id);
        res.send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
})

// delete a user by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
}
)

// update a user by id
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await updateUser(id, req.body);
        res.send(user);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
})

// login a user
router.post("/login", async (req, res) => {
    try {
        const error = validateLogin(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        return handleError(res, 400, error.message)
    }
});


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



