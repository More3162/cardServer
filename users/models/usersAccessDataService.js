const User = require('./Users');

// Create a new user
const registerUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user = await user.save();
        return newUser;
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

const updateUser = async (userId, newUser) => {
    try {
        let user = await User.findByIdAndUpdate(userId, newUser, { new: true });
        return user;
    }
    catch (error) {
        throw new Error("mongoDB Error: " + error.message);
    }
}

module.exports = {
    registerUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
};