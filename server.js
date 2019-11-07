'use strict';

                                                                                         // Imports etc.:
const express = require('express');                                                      // 2.1 - Import Express.
const mongoose = require('mongoose');                                                    // 3.1 - Import Mongoose.
const morgan = require('morgan');                                                        // 4.2 - Import Morgan.
mongoose.Promise = global.Promise;                                                       // 3.2 - Configure Mongoose to use ES6 Promises.

                                                                                         // Imported from files:
const { DATABASE_URL, PORT } = require('./config');                                      // 3.5 - Import DATABASE_URL and PORT from config.js file.

                                                                                         // Instantiate the app:
const app = express();                                                                   // 2.1 - Instantiate the app using Express.

                                                                                         // Middleware:
app.use(express.json());                                                                 // 4.1 - Install built-in middleware like express.json.
app.use(morgan('common'));                                                               // 4.2 - Install third-party middleware like morgan        (note: phase 5 is in models.js).

                                                                                         // Routes:
app.get('/posts', (req, res) => {                                                        // 

});
 
app.get('/posts/:id', (req, res) => {                                                    //

});

app.post('/posts', (req, res) => {                                                       //

});

app.put('/posts/:id', (req, res) => {                                                    //

});

app.delete('posts/:id', (req, res) => {                                                  //

});

app.use('*', (req, res) => {                                                             //
    res.status(404).json({ message: 'Not Found' });
});








                                                                                         // Server and Database connection...
let server;                                                                              // 3.6 - Declare server outside runServer.
        
function runServer(databaseUrl, port=PORT) {                                             // 3.7 - Connect to database and run HTTP server.
    return new Promise((resolve, reject) => {    
        mongoose
            .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => { 
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

function closeServer() {                                                                 // 3.8 - Close server (for integration tests).
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

if (require.main === module) {                                                           // 3.9 - In case server.js is called directly. 
    runServer(DATABASE_URL).catch(err => console.error(err));
}


//   module.exports = { runServer, app, closeServer };