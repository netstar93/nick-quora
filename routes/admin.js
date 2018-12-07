var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../env.json'); 
let db_url =  config.development.database;
 mongoose.connect(db_url,{useNewUrlParser: true}); 
 mongoose.connection.on( 'connected' , function(err){
     if(!err) console.log('Mongo Connected')  
 })

router.get('/', isAdminAuth, function(req, res, next) { 
    res.render('admin/topics', { title: 'Admin -Topic - Quora' });
  });

  router.get('/topic', isAdminAuth, function(req, res, next) { 
    res.render('admin/topics', { title: 'Admin -Topic - Quora' });
  });

function isAdminAuth(req,res,next){
    next();
}

  module.exports = router;