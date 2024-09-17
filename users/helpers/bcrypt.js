const bcrypt = require("bcryptjs")

//פונקציה שתיצור סיסמא למשתמש
const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

//פונקציה שמבצעת השוואה בין הסיסמאות ומפענת
const comprePassword = (password, cryptPassword) => {
    bcrypt.compare(password, cryptPassword);
};

module.exports = { generateUserPassword, comprePassword }