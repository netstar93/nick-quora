var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../env.json');
let db_url =  config.development.database;

var topicModel = require('../models/topicModel');
mongoose.connect(db_url,{useNewUrlParser: true});

var saveTopic = function(data,callback) {
    data.followers = 1;//log(data);
    var topic= topicModel(data);
      topic.save(function(err,responce){
        callback(err,responce);
      });
}
var getTopics = function(filter,callback) {
    callback.topics = topicModel.find({});
}

module.exports = {
    save : saveTopic
}