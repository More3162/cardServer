const bcrypt = require("bcryptjs")

//פונקציה שתיצור סיסמא למשתמש
const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

//פונקציה שמבצעת השוואה בין הסיסמאות ומפענת
const comaprePasswords = (password, cryptPassword) => {
    return bcrypt.compareSync(password, cryptPassword);
};

module.exports = { generateUserPassword, comaprePasswords }

