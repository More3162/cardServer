const express = require("express");

const cardsRouterController = require("../cards/routes/cardsRestController");

const usersRouterController = require("../users/routes/userRestController");

const router = express.Router();

// middleware to route the request - בודק לאיזה נתיב הבקשה מתאימה
router.use("/cards", cardsRouterController);

// middleware to route the request - בודק לאיזה נתיב הבקשה מתאימה
router.use("/users", usersRouterController);


// middleware to route the request - אם זו לא בקשת משתמש או כרטיס את זה יתן הודעת שגיאה
router.use((req, res) => {
    res.status(404).send("Path not found");
});

module.exports = router;