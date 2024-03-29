'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/basic-blog-app';          //3.4 - Database_URL variable set to either .env specified variable OR local mongoDB database.
exports.PORT = process.env.PORT || 3000;                                                          //3.4 - PORT is set to .env specified port OR port 3000.