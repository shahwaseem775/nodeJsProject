 
const EventEmitter = require("events");
const Logger = require('./logger');
const logger = new Logger();
logger.on("messageLogged",(arg)=>{
    console.log('this is the event and the url is',arg);
})
logger.log("message");