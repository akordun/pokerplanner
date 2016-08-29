var models = require('../models');
					 
exports.findAll = function(req, res) {
    models.User.find(function(err, users) {
		res.send(users);
	});
};

exports.findById = function(req, res) {
    var userIdParam = req.params.userId;
	models.User.find({_id: userIdParam}, function(err, users) {
		res.send(users);
	});
};

exports.findByUsername = function(req, res) {
    var usernameParam = req.params.username;
	models.User.find({username: usernameParam}, function(err, users) {
		res.send(users);
	});
};