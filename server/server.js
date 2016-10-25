var express = require('express'),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	path = require('path'),
	_ = require('lodash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

// different views for different reasons
// home view
app.get('/', function(req, res, next) {
	res.render('home', {});
});

app.get('/demo', function(req, res, next) {
	res.render('demo', {});
});

router.use(function(req, res, next) {
	console.log('something is happening');
	next();
});

app.use(express.static('public'));

// these are the api, to submit forms with
app.use('/api', router);

app.set('views' ,'./public/views');

app.set('view engine', 'pug');

app.listen(port);
console.log(`go to localhost: ${port}`);

