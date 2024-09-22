const cors = require("cors");

// middleware to handle CORS

const coreFunction = cors({
    origin: ["http://127.0.0.1:5500",
        "http://localhost:5173",
        "http://localhost:5173/fav-cards",
        "http://localhost:5173/my-cards",

    ], // the origin of the request
})

module.exports = coreFunction;