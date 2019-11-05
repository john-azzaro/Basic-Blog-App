'use strict';

const mongoose = require('mongoose');                       // 5.2 - Reference mongoose.
mongoose.Promise = global.Promise;                          // 5.3 - Configure Mongoose to use ES6 promises.

const blogPostSchema = mongoose.Schema({                    // 5.5 - Blog post schema.
    author: { 
        firstName: String,
        lastName: String
    },
    title: {type: String, required: true}, 
    content: {type: String}, 
    created: {type: Date, default: Date.now}
});

