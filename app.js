const express = require("express");

const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const app = express();

const PORT = 8181;

// middleware to parse incoming request
app.use(express.json());

// middleware to route the request - בודק לאיזה נתיב הבקשה מתאימה
app.use(router);

app.listen(PORT, () => {
    console.log("app is listening to port " + PORT);
    connectToDb();
});