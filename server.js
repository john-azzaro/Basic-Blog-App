'use strict';

const express = require('express');                                                      //2.1
const mongoose = require('mongoose');                                                    //3.1

const app = express();                                                                   //2.1


mongoose.Promise = global.Promise;                                                       //3.2
