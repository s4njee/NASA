var express = require('express');
var router = express.Router();
var axios = require("axios");
/* GET home page. */
router.get('/', function(req, res, next) {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=eQacxU5LTfgonvj6vT0D4dZ6YWhCgrRx03LGJqUH').then(function(response){
  res.render('index', { title: response.data.title,date:response.data.date, exp: response.data.explanation, img: response.data.hdurl, prevDate:parseInt(1) });

    });
});

router.get('/:id', function(req, res, next) {
    var pd = new Date();
    pd.setDate(pd.getDate()-req.params.id).toLocaleString();
    pd = pd.toISOString().substr(0,10);
    axios.get('https://api.nasa.gov/planetary/apod?date='+pd+'&api_key=eQacxU5LTfgonvj6vT0D4dZ6YWhCgrRx03LGJqUH').then(function(response){
        var pd = new Date(response.data.date)
        pd.setDate(pd.getDate()-req.params.id).toLocaleString();
        res.render('index', { title: response.data.title,date:response.data.date, exp: response.data.explanation, img: response.data.hdurl, prevDate:parseInt(req.params.id)+1});

    });
});
module.exports = router;
