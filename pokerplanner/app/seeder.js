var mongoose = require('mongoose'),
	async = require('async'),
	models = require('./models'),
	utils = require('./utils');

module.exports = {
	refreshUsers: function () {},
	refreshRooms: function() {},
	refreshGames: function() {},
	refreshItems: function() {},
	refreshRounds: function() {},
	check: function() {
		async.series([
			function(callback) {
				models.User.find({}, function (err, users) {
					if (users.length == 0) {
						var userArr = [{'model': models.User, 'name': 'user0', 'rooms': ['room0','room1','room2','room3','room4'], 'isAdmin': true}, 
							{'model': models.User, 'name': 'user1', 'rooms': ['room1', 'room2'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user2', 'rooms': ['room2'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user3', 'rooms': ['room3', 'room2', 'room0'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user4', 'rooms': ['room4', 'room2'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user5', 'rooms': ['room1', 'room0'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user6', 'rooms': ['room1', 'room2'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user7', 'rooms': ['room3', 'room4'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user8', 'rooms': ['room4', 'room3'], 'isAdmin': false}, 
							{'model': models.User, 'name': 'user9', 'rooms': ['room0', 'room1'], 'isAdmin': false}];
						utils.createUsers(userArr, callback);
					}  else {
						callback(err);
					}
				});
			},
			function(callback) {
				models.Room.find({}, function (err, rooms) {
					if (rooms.length == 0) {
						var roomArr = [{'model': models.Room, 'name': 'room0', 'description': 'Room0 description', 'creatorName': 'user0'}, 
							{'model': models.Room, 'name': 'room1', 'description': 'Room1 description', 'creatorName': 'user0'}, 
							{'model': models.Room, 'name': 'room2', 'description': 'Room2 description', 'creatorName': 'user0'}, 
							{'model': models.Room, 'name': 'room3', 'description': 'Room3 description', 'creatorName': 'user0'}, 
							{'model': models.Room, 'name': 'room4', 'description': 'Room4 description', 'creatorName': 'user0'}];
						utils.createRooms(roomArr,'user0', callback);
					}  else {
						callback(err);
					}
				});
			},
			function(callback) {
				models.Game.find({}, function (err, games) {
					if (games.length == 0) {
						var gameObj = { 
							model: models.Game, name: 'game0', status: 'Open', tags: ['tag0', 'tag1'], timer: 7, invites: ['user5','user6','user9'], config: { closed: false, timer: 10}, archived: false, 
						};
						utils.createGame(gameObj, 'room1','user0', callback);
					}  else {
						callback(err);
					}
				});
			},
			function(callback) {
				models.Item.find({}, function (err, items) {
					if (items.length == 0) {
						var itemArr = [{'model': models.Item, 'title': 'Title 0', 'summary': 'Summary 0', 'descUrl': 'http://jira.example.com/0', 'unit': 'storyPoint', 'game': 'game0', 'creator': 'user0', 'estimate': 4},
							{'model': models.Item, 'title': 'Title 1', 'summary': 'Summary 1', 'descUrl': 'http://jira.example.com/1', 'unit': 'storyPoint', 'game': 'game0', 'creator': 'user0', 'estimate': 6},
							{'model': models.Item, 'title': 'Title 2', 'summary': 'Summary 2', 'descUrl': 'http://jira.example.com/2', 'unit': 'storyPoint', 'game': 'game0', 'creator': 'user2', 'estimate': 3},
							{'model': models.Item, 'title': 'Title 3', 'summary': 'Summary 3', 'descUrl': 'http://jira.example.com/3', 'unit': 'storyPoint', 'game': 'game0', 'creator': 'user0', 'estimate': 5},
							{'model': models.Item, 'title': 'Title 4', 'summary': 'Summary 4', 'descUrl': 'http://jira.example.com/4', 'unit': 'storyPoint', 'game': 'game0', 'creator': 'user0'}];
						utils.createItems(itemArr, 'game0', 'user1', callback);
					}  else {
						callback(err);
					}
				});
			},
			function(callback) {
				models.Round.find({}, function (err, rounds) {
					if (rounds.length == 0) {
						var roundArr =[{ model: models.Round, index: 1, status: 'Closed', result: 4, itemTitle: 'Title 0', game: 'game0', votes: [{playerName: 'user5', vote: 3}, {playerName: 'user6', vote: 4},{playerName: 'user9', vote: 4}], unit: 'storyPoint'},
							{ model: models.Round,  index: 1, status: 'Closed', result: 6, itemTitle: 'Title 1', game: 'game0', votes: [{playerName: 'user5', vote: 6}, {playerName: 'user6', vote: 6},{playerName: 'user9', vote: 5}], unit: 'storyPoint'},
							{ model: models.Round, index: 1, status: 'Closed', result: 3, itemTitle: 'Title 2', game: 'game0', votes: [{playerName: 'user5', vote: 2}, {playerName: 'user6', vote: 1},{playerName: 'user9', vote: 4}], unit: 'storyPoint'},
							{ model: models.Round, index: 1, status: 'Closed', result: 5, itemTitle: 'Title 3', game: 'game0', votes: [{playerName: 'user5', vote: 5}, {playerName: 'user6', vote: 5},{playerName: 'user9', vote: 5}], unit: 'storyPoint'},
							{ model: models.Round, index: 1, status: 'In Progress', itemTitle: 'Title 4', game: 'game0', votes: [{playerName: 'user6', vote: 4},{playerName: 'user9', vote: 4}], unit: 'storyPoint'}];
						utils.createRounds(roundArr, callback);
					}  else {
						callback(err);
					}
				});
			}],
			function (err, results) {
				if (err) {
					console.log("ERROR SEEDING DATABASE!" + err);
				} else {
					if (results.toString() == ',,,,') {
						console.log("NO SEEDING NECESSARY");
					} else {
						console.log("DATABASE SEEDED WITH: " +results.join(" , "));
					}
				}
			}
		);
	}
};