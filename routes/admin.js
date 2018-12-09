var express = require('express');
var app = express();
var mongoose = require('mongoose');
var topic = require('../controller/topic');
var router = express.Router();
var config = require('../env.json'); 
let db_url =  config.local.database;
 mongoose.connect(db_url,{useNewUrlParser: true});
var topicModel = require('../models/topicModel');
 mongoose.connection.on( 'connected' , function(err){
     if(!err) console.log('Mongo Connected')  
 })

router.get('/', isAdminAuth, async function(req, res, next) {
    var topics = await topicModel.find({});
    res.render('admin/topics', { title: 'Admin -Topic - Quora'  , topics : topics});
  });

  router.get('/topic', isAdminAuth, function(req, res, next) { 
    res.render('admin/topics', { title: 'Admin -Topic - Quora' });
  });

router.post('/saveTopic', isAdminAuth, function(req, res, next) {
    // console.log(req.body);
  topic.save(req.body , res);
    // function(err,data){
    //     if(!err) {
    //         req.flash('success' , 'Topic created');
    //     }else{
    //         req.flash('error' , 'Some issues happens');
    //     }
    //     res.redirect('/admin');
    // };
    req.flash('success' , 'Topic created');
    res.redirect('/admin');
});

function isAdminAuth(req,res,next){
    next();
}

  module.exports = router;