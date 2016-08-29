var express = require('express'),
	path = require('path'),
	routes = require('./app/routes'),
	mongoose = require('mongoose'),
	logger = require('morgan'),
	seeder = require('./app/seeder'),
	bodyParser = require('body-parser'),
	app = express();
 
app.use(logger('dev'));   /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

//connect to the db server:
mongoose.connect('mongodb://localhost:27017/pokerDB');
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', function() {
    console.log("Connected to 'pokerDB' via Mongoose Driver...");
    // check if the db is empty, if so seed it
    seeder.check();
});

//routes list:
routes.initialize(app);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

