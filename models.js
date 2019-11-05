'use strict';

const mongoose = require('mongoose');                       //
mongoose.Promise = global.Promise;                          //

const blogPostSchema = mongoose.Schema({                    //
    author: { 
        firstName: String,
        lastName: String
    },
    title: {type: String, required: true}, 
    content: {type: String}, 
    created: {type: Date, default: Date.now}
});

