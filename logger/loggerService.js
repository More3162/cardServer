const morgan = require("morgan")

const logger = morgan;

const middleware = (logger) => {
    if (!logger == morgan) {
        return morgan("tiny")
    }
}

module.exports = middleware;