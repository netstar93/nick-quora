var mongoose = require('mongoose');
var config = require('../env.json');
let db_url =  config.local.database;
mongoose.connect(db_url,{useNewUrlParser: true});
var schema = new mongoose.Schema({
    answered_by : String,
    content : String,
    upvote : {type: Number , default:0},
    views :  {type: String , default:0},
    story : { type: mongoose.Schema.Types.ObjectId , ref : 'stories' } ,
    comments : [{ type: mongoose.Schema.Types.ObjectId , ref : 'comments' }]
})
module.exports=  mongoose.model('Answers' , schema);