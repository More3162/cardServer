const express = require("express");

const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const app = express();
const coreFunction = require("./middlewares/cors");

const PORT = 8181;

// middleware to handle CORS
app.use(coreFunction);

// middleware to parse incoming request
app.use(express.json());

// middleware to log the request - יתן לי הודע בטרמניל על כל בקשה שנשלחה
app.use((req, res, next) => {
    console.log(
        `request URL: ${req.url}| Method: ${req.method} | Time: ${new Date()}`
    );
    next();
})


// middleware to route the request - בודק לאיזה נתיב הבקשה מתאימה
app.use(router);



app.listen(PORT, () => {
    console.log("app is listening to port " + PORT);
    connectToDb();
});