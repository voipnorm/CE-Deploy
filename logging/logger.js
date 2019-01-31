'use strict';
//Logging configuration
const winston = require('winston');
//const myTransport = require('./myTransport');
const env = process.env.NODE_ENV;
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf, colorize} = format;
const fs = require('fs');

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});


const logger  =
    winston.createLogger({
        format: combine(
            format.splat(),
            colorize({ all: true }),
            timestamp(),
            myFormat
        ),
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log`
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: './logs/combined.log' }),
        ],
        exceptionHandlers: [
            new winston.transports.File( {
                filename: 'logs/exceptions.log'
            } ),
            new winston.transports.Console( {
                colorize: true
            } ),
        ]
    });

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (env !== 'production') {
    logger.add(new winston.transports.Console());
}


//logger.info('Hello, this is a logging event with a custom pretty print',  { 'foo': 'bar' });
//logger.info('Hello, this is a logging event with a custom pretty print2', { 'foo': 'bar' });

module.exports = logger;

