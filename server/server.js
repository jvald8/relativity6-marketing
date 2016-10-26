var express = require('express'),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	nodemailer = require('nodemailer');

var nodemailerPassword = "jaqiujaxnucwgdmu";

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

app.get('/contact-us', function(req, res, next) {
	res.render('contact-us', {});
});

router.use(function(req, res, next) {
	console.log('something is happening');
	next();
});

app.set('views' ,'./public/views');

app.set('view engine', 'pug');

app.use(express.static('public'));

router.get('/contact-form', function() {
	
});

// these are the api, to submit forms with
app.use('/api', router);

router.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "jvald8@gmail.com",
          pass: nodemailerPassword
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'jvald8@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});


app.listen(port);
console.log(`go to localhost: ${port}`);

