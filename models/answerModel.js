var mongoose = require('mongoose');
var config = require('../env.json');
let db_url =  config.development.database;
mongoose.connect(db_url,{useNewUrlParser: true});
var schema = new mongoose.Schema({
    answered_by : String,
    content : String,
    upvote : {type: Number , default:0},
    views :  {type: String , default:0},
    stories : { type: mongoose.Schema.Types.ObjectId , ref : 'Stories' } ,
    comments : [{ type: mongoose.Schema.Types.ObjectId , ref : 'Comments' }]
})
module.exports=  mongoose.model('Answers' , schema); 