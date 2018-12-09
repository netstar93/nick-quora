var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../env.json');
let db_url =  config.local.database;

var storyModel = require('../models/storyModel');
var topicModel = require('../models/topicModel');
mongoose.connect(db_url,{useNewUrlParser: true});

var save =  async function(data,req,res) {
    var story = new storyModel(data);
    story.save(function (err,response) {
        if(err) log(err);
        if(!err) {
                   topicModel.findOne({_id : data.topic}) .then(function (topic, fail) {
                       topic. stories. push (story ._id);
                       topic . save();
            })
        }
    });
}

module.exports = {
    save : save
}