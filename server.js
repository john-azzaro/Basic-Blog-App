'use strict';

const express = require('express');                                                      //2.1
const mongoose = require('mongoose');                                                    //2.2

const app = express();                                                                   //2.1


app.listen(3000, function() {
    console.log(`Your app is listening on port 3000`);
});

