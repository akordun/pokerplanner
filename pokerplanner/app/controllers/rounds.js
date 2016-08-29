var models = require('../models');
 					 
exports.findAll = function(req, res) {
    models.Round.find(function(err, rounds) {
		res.send(rounds);
	});
};

exports.findAllRoundsForItemId = function(req, res) {
    var itemIdParam = req.params.itemId;
	models.Round.find({_itemId: itemIdParam}, function(err, rounds) {
		res.send(rounds);
	});
};

exports.findAllRoundsForItemAndGameId = function(req, res) {
    var itemIdParam = req.params.itemId;
	var gameIdParam = req.params.gameId;
	models.Round.find({_itemId: itemIdParam, _gameId: gameIdParam}, function(err, rounds) {
		res.send(rounds);
	});
};

exports.findById = function(req, res) {
    var roundIdParam = req.params.roundId;
	models.Round.find({_id: roundIdParam}, function(err, rounds) {
		res.send(rounds);
	});
};
