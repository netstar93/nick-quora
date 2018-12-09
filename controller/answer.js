var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../env.json');
let db_url =  config.local.database;

var answerModel = require('../models/answerModel');
var storyModel = require('../models/storyModel');
mongoose.connect(db_url,{useNewUrlParser: true});

var save = async function(data,callback) {
    var story = await storyModel.findOne({_id : data.story});
    log(story);
    var answer = answerModel(data);
    answer.save(function(data) {
        story.answers.push(answer._id);
        story.save();
    });
}

module.exports = {
    save : save
}