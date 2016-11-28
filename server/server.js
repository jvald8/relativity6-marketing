var express = require('express'),
  sitemap = require('express-sitemap')(),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	nodemailer = require('nodemailer'),
	countries = require('country-data').countries,
	_ = require('lodash');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var demo = require('./database/demo');

var port = process.env.PORT || 8080;

var countryNames = _.uniqBy(_.map(countries, 'name'));

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

// these are the api, to submit forms with
app.use('/api', router);

// different views for different reasons
// home view
app.get('/', function(req, res, next) {
	res.render('home', {});
});

app.get('/demo', function(req, res, next) {
	res.render('demo', {countries: countryNames});
});

app.get('/demo-thank-you', function(req, res, next) {
	res.render('demo-thank-you', {countries: countryNames});
});

app.get('/contact', function(req, res, next) {
	res.render('contact', {});
});

app.get('/features', function(req, res, next) {
	res.render('features', {});
});

app.get('/case-study', function(req, res, next) {
	res.render('case-study', {});
});

app.get('/shopify-demo', function(req, res, next) {
  res.render('shopify-demo', {countries: countryNames});
});

app.get('/contact-result', function(req, res, next) {
	res.render('contact-result', {});
});

app.use('/blog/', function(req, res, next) {
  var newUrl = "http://blog.relativity6.com/blog" + req.headers.url;
  //res.redirect(newUrl, 301);
  //next();
  res.send(newUrl)
});

router.use(function(req, res, next) {
	console.log('something is happening');
	next();
});

app.set('views' ,'./public/views');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.post('/demo', demo.createDemo)

app.post('/contact', function (req, res) {
	console.log(req.body);
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "hello@relativity6.com",
          pass: process.env.GMAIL_PW
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.email, //grab form data from the request body object
      to: 'hello@relativity6.com',
      cc: req.body.email,
      subject: 'Relativity6 Contact Form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if(error) {console.log(error)};
      if (error) {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});

app.get('*', function(req, res){
  res.render('404', {});
});

sitemap.generate(app);

app.listen(port);
console.log(`go to localhost: ${port}`);



