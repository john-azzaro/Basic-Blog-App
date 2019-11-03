'use strict';

const express = require('express');                                                      // 2.1 - Import Express
const mongoose = require('mongoose');                                                    // 3.1 - Import Mongoose 

mongoose.Promise = global.Promise;                                                       // 3.2 - Configure Mongoose to use ES6 Promises

const { DATABASE_URL, PORT } = require('./config');                                      // 3.5 - Import DATABASE_URL and PORT from config.js file

const app = express();                                                                   // 2.1 - Instantiate the app using Express.



