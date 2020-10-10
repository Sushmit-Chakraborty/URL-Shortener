//Require modules
const express = require('express');
const ShortUrl = require('./models/shortUrl');
const mongoose = require('mongoose');

//Set express instance
const app = express();

//Make mongodb database named urlShortener and connect to it
mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true,useUnifiedTopology:true
})

//Set view engine to ejs
app.set('view engine','ejs');

//Set urlencoded to fetch params body from frontend
app.use(express.urlencoded({extended:true}));

//Home page of website rendering previous shortened urls
app.get('/',async (req,res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index',{shortUrls:shortUrls});
})

//GET API for when the shortened url is visited - increment count by one and redirect to the desired webpage
app.get('/:shortUrl',async(req,res) => {
    const shortUrl = await ShortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl == null){
        return res.sendStatus(404);
    }
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})


//POST API when shorten button is hit from frontend
app.post('/shortUrls',async (req,res) => {
    await ShortUrl.create({full:req.body.fullUrl});
    res.redirect('/');
})


//Set app to listen on port 3000 for local environment or process.env.PORT in production environment
app.listen(process.env.PORT || 3000);