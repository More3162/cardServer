

const auth = (req, res, next) => {
    if (req.header("x-auth-token")) { //האם לבקשה יש האדר של טוקן
        console.log("This USER is valid");
        next();
    } else {
        console.log("This USER IS NOT valid");
        res.status(401).send("USER is not Unauthorized - login first");
    }
};

module.exports = auth;