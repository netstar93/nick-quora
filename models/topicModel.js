var mongoose = require('mongoose');
var config = require('../env.json');
let db_url =  config.development.database;
mongoose.connect(db_url,{useNewUrlParser: true});
var schema = new mongoose.Schema({
    title : String,
    image : String,
    followers : Number,
    stories   : [{ type: mongoose.Schema.Types.ObjectId , ref : 'Stories'}]
})
module.exports=  mongoose.model('Topics' , schema);