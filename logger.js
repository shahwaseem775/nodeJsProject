const EventEmitter = require("events")
 

class Logger extends EventEmitter{
      log(message){
        console.log(message);
        this.emit("messageLogged",{id:1,url:"https://www.google.com "});
     }
}

module.exports = Logger;