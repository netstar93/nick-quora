var mongoose = require('mongoose');
var config = require('../env.json');
let db_url =  config.development.database;
mongoose.connect(db_url,{useNewUrlParser: true});
var schema = new mongoose.Schema({
    title : String,
    created_by : String,
    followers : Number,
    answers : [{ type: mongoose.Schema.Types.ObjectId , ref : 'Answers'}],
    topic : { type: mongoose.Schema.Types.ObjectId , ref : 'Topics' }
})
module.exports=  mongoose.model('Stories' , schema);