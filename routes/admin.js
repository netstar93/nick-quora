var express = require('express');
var app = express();
var mongoose = require('mongoose');
var sharp = require('sharp');
var topic = require('../controller/topic');
var router = express.Router();
var config = require('../env.json'); 
let db_url =  config.development.database;
 mongoose.connect(db_url,{useNewUrlParser: true});
var topicModel = require('../models/topicModel');
 mongoose.connection.on( 'connected' , function(err){
     if(!err) console.log('Mongo Connected')  
 })

 var path = require('path');
 var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/topics')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({storage: storage}).single('image');
// var upload = multer({ dest: 'public/images/topics/', limits: { fieldSize: 5 * 1024 * 1024 } });  //limit 5 MB

router.get('/', isAdminAuth, async function(req, res, next) {
    var topics = await topicModel.find({});
    res.render('admin/topics', { title: 'Admin -Topic - Quora'  , topics : topics});
  });

  router.get('/topic', isAdminAuth, function(req, res, next) { 
    res.render('admin/topics', { title: 'Admin -Topic - Quora' });
  });

router.post('/saveTopic', upload, async function(req, res, next) {
    let img_resized;
    var image = await resizeImage(req , function(name) {
        img_resized = name;    
        req.body.image = img_resized;
        topic.save(req.body ,(err,data) => { 
            if(err) log(err);
                if(typeof data != 'undefined') {   
                    req.flash('success' , 'Topic created');
                }else{
                    req.flash('error' , 'Some issues happens');
                }
                res.redirect('/admin');
            });
});
});

function isAdminAuth(req,res,next){
    next();
}

var resizeImage = function(req,callback) {
    var image = req.file.filename;
    const roundedCorners = Buffer.from(
        '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
      );               
    var image_name= "public/images/topics/"+image;
    var new_name = Date.now()+".png";
    sharp(image_name)
    .resize(200, 200)
    .overlayWith(roundedCorners, { cutout: true })
    .toFile("public/images/topics/"+new_name)                  
    .then(function(res){
        callback(new_name);   
    })
    .catch(function(data){
        log(data);
    })  
} 

  module.exports = router;