const { generateAuthToken } = require('../../auth/providers/jwt');
const User = require('./Users');
const _ = require('lodash');
const { createError } = require('../../utils/handleErrors');
const { generateUserPassword, comaprePasswords } = require('../helpers/bcrypt');

// Create a new user
const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password) // יעשה עיבוד סיסמא משתש - - הצפנה
        let user = new User(newUser);
        user = await user.save();

        return _.pick(user, ['_id', 'name', 'email']);
    } catch (error) {
        return createError("Mongoose", error);
    }
};

// Get all users
const getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

// Get a user by id
const getUser = async (id) => {
    try {
        let user = await User.findById(id);
        return user;
    } catch (error) {
        return createError("Mongoose", error);
    }
};

// Delete a user by id
const deleteUser = async (userId) => {
    try {
        let user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        return createError("Mongoose", error);
    }
}

// Update a user by id
const updateUser = async (userId, newUser) => {
    try {
        let user = await User.findByIdAndUpdate(userId, newUser, { new: true });
        return user;
    }
    catch (error) {
        return createError("Mongoose", error);
    }
}

// Login a user
const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!comaprePasswords(password, userFromDb.password)) {
            const error = new Error("Authentication Error: Invalid email or password");
            error.status = 401;
            return createError("Authentication", error);
        }
        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        return createError("Mongoose", error);
    }
};


module.exports = {
    registerUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
};