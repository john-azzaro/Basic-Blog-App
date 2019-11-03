'use strict';

const express = require('express');                                                      // 2.1 - Import Express
const mongoose = require('mongoose');                                                    // 3.1 - Import Mongoose 

mongoose.Promise = global.Promise;                                                       // 3.2 - Configure Mongoose to use ES6 Promises

const { DATABASE_URL, PORT } = require('./config');                                      // 3.5 - Import DATABASE_URL and PORT from config.js file

const app = express();                                                                   // 2.1 - Instantiate the app using Express.





let server; 
        
function runServer(databaseUrl, port=PORT) {  
    return new Promise((resolve, reject) => {    
        mongoose.connect(databaseUrl, err => { 
            if (err) {          
                return reject(err);  
            }       

            server = app.listen(port, () => {    
                console.log(`Listening on port ${port}`);  
                resolve();   
            })
            .on('error', err => {  
                mongoose.disconnect();  
                reject(err);  
            });
        });
    });
}  


