var models = require('../models');
 					 
exports.findAll = function(req, res) {
    models.Room.find(function(err, rooms) {
		res.send(rooms);
	});
};

exports.findById = function(req, res) {
    var roomdIdParam = req.params.roomId;
	models.Room.find({_id: roomdIdParam}, function(err, rooms) {
		res.send(rooms);
	});
};
