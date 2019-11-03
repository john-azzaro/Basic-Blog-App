'use strict';

const express = require('express');                                                      // 2.1 - Import Express.
const mongoose = require('mongoose');                                                    // 3.1 - Import Mongoose.

mongoose.Promise = global.Promise;                                                       // 3.2 - Configure Mongoose to use ES6 Promises.

const { DATABASE_URL, PORT } = require('./config');                                      // 3.5 - Import DATABASE_URL and PORT from config.js file.

const app = express();                                                                   // 2.1 - Instantiate the app using Express.




// Server and Database connection...

let server;                                                                               // 3.6 - Declare server outside runServer.
        
function runServer(databaseUrl, port=PORT) {                                              // 3.7 - Connect to database and run HTTP server.
    return new Promise((resolve, reject) => {    
        mongoose.connect(databaseUrl, { useNewUrlParser: true,  useUnifiedTopology: true }, err => { 
            if (err) {          
                return reject(err);  
            }       

            server = app.listen(port, () => {    
                console.log(`Listening on port ${port}...`);  
                resolve();   
            })
            .on('error', err => {  
                mongoose.disconnect();  
                reject(err);  
            });
        });
    });
}  

function closeServer() {                                                                    // 3.8 - Close server (for integration tests).
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }


if (require.main === module) {                                                              // 3.9 - In case server.js is called directly. 
    runServer(DATABASE_URL).catch(err => console.error(err));
}
  


//   module.exports = { runServer, app, closeServer };