var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../env.json');
let db_url =  config.local.database;

var topicModel = require('../models/topicModel');
mongoose.connect(db_url,{useNewUrlParser: true});

var saveTopic = function(data,callback) {
    data.followers = 1;
    var topic= topicModel(data);
      topic.save();
}
var getTopics = function(filter,callback) {
    callback.topics = topicModel.find({});
}

module.exports = {
    save : saveTopic
}