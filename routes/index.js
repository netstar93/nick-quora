var express = require('express');
var router = express.Router();
var topicModel = require('../models/topicModel');
var storyModel = require('../models/storyModel');
var story = require('../controller/story');
var answer = require('../controller/answer');

/* GET home page. */
router.get('/', async function(req, res, next) {
    var topics = await topicModel.find({});
    var stories = await storyModel.find({});
    res.render('index', { title: 'Your Quora' , topics : topics , stories : stories });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Quora- Explore Yourself' });
});

router.get('/topic/:id' , async function(req, res, next) {
    var topics = await topicModel.find({});
    log(req.params.id);
    var topic = await topicModel.findOne({_id: req.params.id}).populate('stories');
    topic.stories.forEach(function(data){
        // log(data.title);
    })
    res.render('topic', { title: 'Topic - Quora' , topics : topics , topic : topic, stories: topic.stories });
});

router.post('/saveStory' , function(req,res, next){
    var data = req.body;
    story.save(data, req, res);
    var backURL=req.header('Referer') || '/';
    req.flash('success', 'Your Question added');
    res.redirect(backURL);
})

router.post('/saveAnswer' , function(req,res, next){
    var data = req.body;
    answer.save(data, req, res);
    var backURL=req.header('Referer') || '/';
    req.flash('success', 'Your Answer added');
    res.redirect(backURL);
})


module.exports = router;
