'use strict';

const mongoose = require('mongoose');                       // 5.2 - Reference mongoose.
mongoose.Promise = global.Promise;                          // 5.3 - Configure Mongoose to use ES6 promises.

const blogPostSchema = mongoose.Schema({                    // 5.5 - Blog post schema.
    author: { 
        firstName: String,
        lastName: String
    },
    title: {
        type: String, 
        required: true
    }, 
    content: {
        type: String
    }, 
    created: {
        type: Date, 
        default: Date.now
    }
});

blogPostSchema.virtual('authorName').get(function() {                      // 5.8 - Create a virtual to manipulate blogPostSchema properties
    return `$(this.author.firstName) $(this.author.lastName)`.trim();
});

blogPostSchema.methods.serialize = function() {                             // 5.9 - Add an instance method that serializes the schema shown to clients.
    return { 
        id: this._id,
        author: this.authorName,
        content: this.content,
        title: this.title,
        created: this.created                   
    };
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);        // 5.6 - Create a BlogPost model.

module.exports = {BlogPost};                                        // 5.7 - Export Blogpost for use in server.js.

