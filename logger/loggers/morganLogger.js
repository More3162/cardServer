const morgan = require("morgan");
const currentTime = require("../../utils/timeService");
const chalk = require("chalk");


const morganLogger = morgan(function (tokens, req, res) {

    const { year, month, day, hours, minutes, seconds } = currentTime();

    let message = [
        `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        "-",
        tokens['response-time'](req, res), 'ms'
    ].join(" ");

    // if the status code is greater than 400, the color will be red, otherwise it will be green
    if (res.statusCode >= 400) return chalk.red(message);
    else return chalk.cyan(message);
});

module.exports = morganLogger;


//tokens.date(req, res, 'web'),
//we can use the built format or make our own - here we use our format