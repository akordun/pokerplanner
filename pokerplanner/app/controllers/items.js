var models = require('../models');
 					 
exports.findAll = function(req, res) {
    models.Item.find(function(err, items) {
		res.send(items);
	});
};

exports.findAllItemsForGameId = function(req, res) {
	var gameIdParam = req.params.gameId;
    models.Item.find({_gameId: gameIdParam}, function(err, items) {
		res.send(items);
	});
};

exports.findById = function(req, res) {
    var itemIdParam = req.params.itemId;
	models.Item.find({_id: itemIdParam}, function(err, items) {
		res.send(items);
	});
};
