'use strict';

                                                                                         // Imports etc.:
const express = require('express');                                                      // 2.1 - Import Express.
const mongoose = require('mongoose');                                                    // 3.1 - Import Mongoose.
const morgan = require('morgan');                                                        // 4.2 - Import Morgan.
mongoose.Promise = global.Promise;                                                       // 3.2 - Configure Mongoose to use ES6 Promises.

                                                                                         // Imports from other files:
const { DATABASE_URL, PORT } = require('./config');                                      // 3.5 - Import DATABASE_URL and PORT from config.js file.
const { BlogPost } = require('./models.js');                                             // 5.8 - Import BlogPost from models.js
  
                                                                                         // Instantiate the app:
const app = express();                                                                   // 2.1 - Instantiate the app using Express.

                                                                                         // Middleware:
app.use(express.json());                                                                 // 4.1 - Install built-in middleware like express.json.
app.use(morgan('common'));                                                               // 4.2 - Install third-party middleware like morgan        (note: phase 5 is in models.js).

                                                                                         // Routes:
app.get('/posts', (req, res) => {                                                        // 6.1 - Get a request at the /posts endpoint.

});
 
app.get('/posts/:id', (req, res) => {                                                    // 6.1 - Get a request by id at the /posts endpoint.
  res.send(req.params.id);
});

app.post('/posts', (req, res) => {                                                       // 6.1 - Post a request (create a post) at the /posts endpoint.

});

app.put('/posts/:id', (req, res) => {                                                    // 6.1 - Modify a document by id at the .posts endpoint.

});

app.delete('posts/:id', (req, res) => {                                                  // 6.1 - Delete a document by id at the /posts endpoint.

});

app.use('*', (req, res) => {                                                             // 6.2 - If nothing else responds, assume 404 Not Found.
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


// module.exports = { runServer, app, closeServer };                                        // 