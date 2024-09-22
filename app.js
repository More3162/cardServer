const express = require("express");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const app = express();
const coreFunction = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const chalk = require("chalk");
const morgan = require("morgan");
const loggerMiddleware = require("./logger/loggerService");
require("dotenv").config();

const PORT = 8181;

// middleware to log the request	- יתן לי הודעה בטרמניל על כל בקשה שנשלחה	
app.use(loggerMiddleware());

// middleware to serve static files
app.use(express.static("./public"));

// middleware to parse incoming request
app.use(express.json());

// middleware to handle CORS
app.use(coreFunction);

// זה יתן לי אינדיקציה על איזה משתנה סביבה אני רץ
app.get("/", (req, res) => {
    //זה ימשוך את הנתונים מתוך קובץ הסביבה .env
    const myPassword = process.env.PASSWORD2;
    res.send(myPassword);
    //res.send(process.env.NODE_ENV + " " + myPassword);
})


// middleware to route the request - בודק לאיזה נתיב הבקשה מתאימה
app.use(router);

// middleware to handle errors  - כל שגיאה שבטעות לא נתתי לה יחס תתפס פה
app.use((err, req, res, next) => {
    const message = err.message || "internal server error";
    return handleError(res, 500, message); // כל שגיאה שתקרה תקבל תשובה של שגיאה פנימית
});


app.listen(PORT, () => {
    console.log(chalk.blue("app is listening to port " + PORT));
    connectToDb();
});



//יתן הודעה בטרמינל על כל בקשה שנשלחת עם הסטטוס זמן וסוג הבקשה
/* app.use(morgan("tiny")) */


// middleware to log the request - יתן לי הודעה בטרמניל על כל בקשה שנשלחה
/* app.use((req, res, next) => {
    console.log(chalk.bgBlueBright(
        `request URL: ${req.url}| Method: ${req.method} | Time: ${new Date()}`
    ));
    next();
}) */