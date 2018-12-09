var mongoose = require('mongoose');
var config = require('../env.json');
let db_url =  config.local.database;
mongoose.connect(db_url,{useNewUrlParser: true});
var schema = new mongoose.Schema({
    title : String,
    created_by : String,
    followers : Number,
    answers : { type: mongoose.Schema.Types.ObjectId , ref : 'answers'},
    topic : { type: mongoose.Schema.Types.ObjectId , ref : 'topics' }
})
module.exports=  mongoose.model('Stories' , schema);