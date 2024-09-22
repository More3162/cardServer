const { createError, handleError } = require("../utils/handleErrors");

//const SECRET_WORD = require("../auth/providers/jwt").SECRET_WORD;

const { verifyToken } = require("../auth/providers/jwt");

// קריאה לקובץ הקונפיגורציה
const config = require("config");
const tokenGenerator = config.get("TOKEN_GENERATOR");


const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            // בדיקה אם קיים טוקן בכותרת הבקשה שנשלחה
            const tokenFromClient = req.header("x-auth-token");
            //אם אין טוקן בכותרת הבקשה נזרוק שגיאה
            if (!tokenFromClient) {
                const error = new Error("Please Login");
                error.status = 401;
                return createError("Authentication", error);
            }
            // בדיקת תקינות הטוקן
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                // אם הטוקן לא תקין נזרוק שגיאה
                const error = new Error("Unauthorized user");
                error.status = 401;
                return createError("Authentication", error);
            }
            // אם הטוקן תקין נוסיף את המידע שנמצא בטוקן ל-req
            req.user = userInfo;
            return next();
        } catch (error) {
            return handleError(res, 401, error.message);
        }
    }
    return handleError(res, 500, "you did not use valid token generator")
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