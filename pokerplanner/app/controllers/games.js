var models = require('../models');
 					 
exports.findAll = function(req, res) {
    models.Game.find(function(err, games) {
		res.send(games);
	});
};

exports.findAllGamesForRoomId = function(req, res) {
	var roomIdParam = req.params.roomId;
    models.Game.find({_roomId: roomIdParam}, function(err, games) {
		res.send(games);
	});
};

exports.findById = function(req, res) {
    var gameIdParam = req.params.gameId;
	models.Game.find({_id: gameIdParam}, function(err, games) {
		res.send(games);
	});
};
