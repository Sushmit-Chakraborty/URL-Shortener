const mongoose = require('mongoose');
const shortId = require('shortid');


//Make schema for urls containing three fields - the full url,the respective shortened url generated using shortid and the number of clicks
const shortUrlSchema = new mongoose.Schema({
    full:{
        required:true,
        type:String
    },
    short:{
        required:true,
        type:String,
        default:shortId.generate
    },
    clicks:{
        required:true,
        type:Number,
        default:0
    }
})

//Make mongoose model from defined schema and export it
module.exports = mongoose.model('ShortUrl',shortUrlSchema);