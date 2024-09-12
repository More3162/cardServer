const SECRET_WORD = require("../auth/providers/jwt").SECRET_WORD;
const tokenGenerator = "jwt";


const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");

            if (!tokenFromClient) {
                throw new Error("Authentication Error: Please Login");
            }

            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                throw new Error("Authentication Error: unauthorized user");
            }
            req.user = userInfo;
            return next();
        } catch (error) {
            return res.status(401).send(error.message);
        }
    }
    return res.status(500).send("you did not use valid token generator");
}

module.exports = auth;

/* 
const auth3 = (req, res, next) => {
    // בדיקה אם tokenGenerator שווה ל-"jwt"
    if (tokenGenerator !== "jwt") {
        return res.status(500).send("you did not use jwt");
    }

    // בדיקה אם קיים טוקן
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Authentication Error: Please Login");
    }

    // בדיקת תקינות הטוקן
    try {
        const decoded = jwt.verify(token, SECRET_WORD);
        req.user = decoded; // הוספת המידע שנמצא בטוקן ל-req
        next();
    }
    catch (error) {
        return res.status(401).send(error.message);
    }
} */



/* const auth2 = (req, res, next) => {
    if (req.header("x-auth-token")) {
        console.log("This USER is valid");
        next();
    } else {
        console.log("This USER IS NOT valid");
        res.status(401).send("USER is not Unauthorized - login first");
    }
}; */