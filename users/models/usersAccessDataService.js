const { generateAuthToken } = require('../../auth/providers/jwt');
const User = require('./Users');
const _ = require('lodash');

// Create a new user
const registerUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user = await user.save();
        return _.pick(user, ['_id', 'name', 'email']);
    } catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
};

// Get all users
const getUsers = async () => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
};

// Get a user by id
const getUser = async (id) => {
    try {
        let user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
};

// Delete a user by id
const deleteUser = async (userId) => {
    try {
        let user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
}

// Update a user by id
const updateUser = async (userId, newUser) => {
    try {
        let user = await User.findByIdAndUpdate(userId, newUser, { new: true });
        return user;
    }
    catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
}

// Login a user
const loginUser = async (email, password) => {
    try {
        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            throw new Error("Authentication Error: Invalid email or password");
        }
        if (userFromDb.password !== password) {
            throw new Error("Authentication Error: Invalid email or password");
        }

        const token = generateAuthToken(userFromDb);
        return token;
    } catch (error) {
        throw new Error(error);
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