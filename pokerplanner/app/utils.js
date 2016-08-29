var mongoose = require('mongoose'),
	async = require('async'),
	userIdArr = {},
	itemIdArr = {},
	roomIdArr = {},
	gameIdArr = {};
	
/* ROOM methods */
var asynchCreateRoom = function (roomObj, callback) {
	console.log("Creating room "+roomObj.name+" for user + "+roomObj.creatorName+" whose ID = "+ userIdArr[roomObj.creatorName]);
	if (userIdArr[roomObj.creatorName] == null) {
		console.log("No cached id for name+" +roomObj.creatorName+" attempting lookup..");
		asynchWaterfallFindUserByName(roomObj.creatorName, function (err, user) {
				if (err) {
					console.log("ERROR in asynchCreateRoom after lookup attempt:"+err);
				} else {
					//TODO: consider calling the function recursively instead.
					roomObj.model.create({name: roomObj.name, desc: roomObj.desciption, created: new Date(), /*roomConfig: roomObj.config,*/ _createdBy: userIdArr[roomObj.creatorName]}, function (err) { if (err) console.log("ERROR in asynchCreateRoom:"+err);});
				}
			});
	} else {
		roomObj.model.create({name: roomObj.name, desc: roomObj.desciption, created: new Date(), /*roomConfig: roomObj.config,*/ _createdBy: userIdArr[roomObj.creatorName]},
		function (err) { 
			if (err) console.log("ERROR in asynchCreateRoom:"+err);
		});
	}
	console.log("Room "+roomObj.name+" created");
	setTimeout(function() { callback(); }, 1);
};
	
var asynchWaterfallFindRoomByName = function(roomName, callback) {
	console.log("Looking up id for roomName: "+ roomName);
	mongoose.model('rooms').findOne({name: roomName}, function(err, room) {
		if (err) {
			console.log("ERROR in asynchWaterfallFindRoomByName: "+ err);
		} else {
			console.log("Found Id " + room._id + " for name: "+ roomName);
			roomIdArr[roomName] = room._id;
		}
		callback(err, room);
	});
};

var asynchWaterfallCreateRooms = function(roomArr, creatorId, callback) {
	console.log("Creating rooms for "+ creatorId);
	async.each(roomArr, asynchCreateRoom, function(err) {
		if (err) {
			console.log('Error creating a room.' + err);
		} else {
			console.log('Room created successfully!');
		}
	});
	callback(null, "done");
}
// exports.createWaterfallRooms = function(roomArr, creatorName) {
	// async.waterfall([
		// function(callback) {
			// asynchWaterfallFindUserByName(creatorName, callback);
		// },
		// function(creator, callback) {
			// asynchWaterfallCreateRooms(roomArr, creator._id, callback);
		// }], function (err, result) {
			// if (err) {
				// console.log("Error creating waterfall rooms." + err);
			// } else {
				// console.log("Waterfall rooms created! " + result);
			// }
		// }
	// );
// }

exports.createRooms = function(roomArr, creatorName, mainCallback) {
	async.waterfall([
		function(callback) {
			asynchWaterfallFindUserByName(creatorName, callback);
		},
		function(creator, callback) {
			asynchWaterfallCreateRooms(roomArr, creator._id, callback);
		}], function (err, result) {
			if (err) {
				console.log("Error creating waterfall rooms." + err);
			} else {
				console.log("Waterfall rooms created! " + result);
			}
			mainCallback(err,"rooms");
		}
	);
}
/* ROOM methods */

/* USER methods */
var asynchWaterfallFindUserByName = function(userName, callback) {
	console.log("Looking id for userName: "+ userName);
	mongoose.model('users').findOne({name: userName}, function(err, user) {
		if (err) {
			console.log("ERROR in asynchWaterfallFindUserByName: "+ err);
		} else {
			console.log("Found Id " + user._id + " for username: "+ userName);
			userIdArr[userName] = user._id;
			//console.log("Cached id for "+ userName+ " is " + userIdArr[userName]);
		}
		callback(err, user);
	});
};

var asynchCreateUser = function (userObj, callback) {
	userObj.model.create({name: userObj.name, username: userObj.name, password: '123', email: userObj.name+'@pp.com',isAdmin: userObj.isAdmin, loginCount: 0, created: new Date()}, function (err) { 
			if (err) console.log("ERROR in asynchCreateUser:"+err);
		});
	console.log("User "+userObj.name+" created");
	setTimeout(function() { callback(); }, 1);
};	

// exports.createUsers = function(userArr) {
	// console.log("	Creating users");
	// async.each(userArr, asynchCreateUser, function(err) {
		// if (err) {
			// console.log('Error creating a user.' + err);
		// } else {
			// console.log('Users created successfully!');
		// }
	// });
// }

exports.createUsers = function(userArr,mainCallback) {
	console.log("Creating users");
	async.each(userArr, asynchCreateUser, function(err) {
		if (err) {
			console.log('Error creating a user.' + err);
		} else {
			console.log('Users created successfully!');
		}
		mainCallback(err,"users");
	});
}
/* USER methods */

/* GAME methods */
var asynchCreateGame = function (gameObj, creatorId, roomId, callback) {
	console.log("Creating game "+gameObj.name+" for user + "+ creatorId+" room = "+ roomId);
	gameObj.model.create({
		name: gameObj.name, 
		status: gameObj.status,
		tags: gameObj.tags,
		timer: gameObj.timer,
		inviteNames: gameObj.invites,
		_roomId: roomId,
		gameConfig: gameObj.config,
		leader: creatorId,
		archived: gameObj.archived,
		created: new Date(), 
		_createdBy: creatorId },
		function (err) { 
			if (err) 
				console.log("ERROR in asynchCreateGame:"+err); 
			else 
				console.log("Game "+gameObj.name+" created!");
			}
	);	
	//execute callback if participating in a batch operation
	if (callback != null) setTimeout(function() { callback(); }, 1);
};
	
var asynchWaterfallFindGameByName = function(gameName, callback) {
	console.log("Looking up id for gameName: "+ gameName);
	mongoose.model('games').findOne({name: gameName}, function(err, game) {
		if (err) {
			console.log("ERROR in asynchWaterfallFindGameByName: "+ err);
		} else {
			console.log("Found Id " + game._id + " for name: "+ gameName);
			gameIdArr[gameName] = game._id;
		}
		callback(err, game);
	});
};

// exports.createGame = function(gameObj, roomName, creatorName) {
	// async.series([
		// function(callback) {
			// asynchWaterfallFindUserByName(creatorName, callback);
		// },
		// function(callback) {
			// asynchWaterfallFindRoomByName(roomName, callback);
		// }],
		// function (err, results) {
			// if (err) {
				// console.log("Error creating the game." + err);
			// } else {
				// asynchCreateGame(gameObj, results[0]._id, results[1]._id, null);
			// }
		// } 
	// );
// }

exports.createGame = function(gameObj, roomName, creatorName, mainCallback) {
	async.series([
		function(callback) {
			asynchWaterfallFindUserByName(creatorName, callback);
		},
		function(callback) {
			asynchWaterfallFindRoomByName(roomName, callback);
		}],
		function (err, results) {
			if (err) {
				console.log("Error creating the game." + err);
			} else {
				//asynchCreateGame(gameObj, results[0]._id, results[1]._id, null); function (gameObj, creatorId, roomId, callback)
				var creatorId = results[0]._id, roomId = results[1]._id;
				console.log("Creating game "+gameObj.name+" for user + "+ creatorId +" room = "+ roomId);
				gameObj.model.create({
					name: gameObj.name, 
					status: gameObj.status,
					tags: gameObj.tags,
					timer: gameObj.timer,
					inviteNames: gameObj.invites,
					_roomId: roomId,
					gameConfig: gameObj.config,
					leader: creatorId,
					archived: gameObj.archived,
					created: new Date(), 
					_createdBy: creatorId },
					function (err) { 
						if (err) 
							console.log("ERROR in asynchCreateGame:"+err); 
						else 
							console.log("Game "+gameObj.name+" created!");
						}
				);
				mainCallback(err, "game");				
			}
		}
	);
}

/* GAME methods */

/* ITEM methods */
var asynchCreateItem = function (itemObj, callback) {
	var creatorId = userIdArr[itemObj.creator];
	var gameId = gameIdArr[itemObj.game];
	
	console.log("Creating item " + itemObj.title + " for user " + creatorId + " game = " + gameId);
	
	if (creatorId == null) {
		//console.log("No cached id for username " +itemObj.creator+" attempting lookup..");
		asynchWaterfallFindUserByName(itemObj.creator, function (err, user) {
				if (err) {
					console.log("ERROR in asynchCreateItem after lookup attempt:"+err);
				} else {
					asynchCreateItem(itemObj, null);
				}
			}); 
	} else if (gameId == null) {
		//console.log("No cached id for game name+" +itemObj.game+" attempting lookup..");
		asynchWaterfallFindGameByName(itemObj.game, function (err, user) {
				if (err) {
					console.log("ERROR in asynchCreateItem after lookup attempt:"+err);
				} else {
					asynchCreateItem(itemObj, null);
				}
			});
	} else {
		itemObj.model.create({
		title: itemObj.title, 
		summary: itemObj.summary,
		descUrl: itemObj.descUrl,
		_gameId: gameId,
		estimate: itemObj.estimate,
		unit: itemObj.unit,
		created: new Date(), 
		_createdBy: creatorId },
		function (err) { 
			if (err) 
				console.log("ERROR in asynchCreateItem:"+err); 
			else 
				console.log("Item "+itemObj.title+" created!");
			});
	}
	//execute callback if participating in a batch operation
	if (callback != null) setTimeout(function() { callback(); }, 1);
};

var asynchSeriesCreateItems = function(itemArr, gameId, creatorId) {
	console.log("Creating items for user "+ creatorId + " for game " + gameId);
	async.eachSeries(itemArr, asynchCreateItem, function(err) {
		if (err) {
			console.log('Error creating items.' + err);
		} else {
			console.log('Items created successfully!');
		}
	});
}

var asynchWaterfallFindItemByTitle = function(itemTitle, callback) {
	console.log("Looking up id for itemTitle: "+ itemTitle);
	mongoose.model('items').findOne({title: itemTitle}, function(err, item) {
		if (err) {
			console.log("ERROR in asynchWaterfallFindItemByTitle: "+ err);
		} else {
			console.log("Found Id " + item._id + " for title: "+ itemTitle);
			itemIdArr[itemTitle] = item._id;
		}
		callback(err, item);
	});
};

// exports.createItems = function(itemArr, gameName, creatorName) {
	// async.series([
		// function(callback) {
			// asynchWaterfallFindUserByName(creatorName, callback);
		// },
		// function(callback) {
			// asynchWaterfallFindGameByName(gameName, callback);
		// }],
		// function (err, results) {
			// if (err) {
				// console.log("Error creating the game." + err);
			// } else {
				// asynchSeriesCreateItems(itemArr, results[1]._id, results[0]._id);
			// }
		// }
	// );
// }

exports.createItems = function(itemArr, gameName, creatorName, mainCallback) {
	async.series([
		function(callback) {
			asynchWaterfallFindUserByName(creatorName, callback);
		},
		function(callback) {
			asynchWaterfallFindGameByName(gameName, callback);
		}],
		function (err, results) {
			if (err) {
				console.log("Error creating the game." + err);
			} else {
				//asynchSeriesCreateItems(itemArr, results[1]._id, results[0]._id);
				console.log("Creating items for user "+ results[0]._id + " for game " + results[1]._id);
				async.eachSeries(itemArr, asynchCreateItem, function(err) {
					if (err) {
						console.log('Error creating items.' + err);
					} else {
						console.log('Items created successfully!');
					}
					mainCallback(err, "items");
				});
			}
		}
	);
}

/* ITEM methods */

/* ROUND methods */
var asynchCreateRound = function (roundObj, callback) {
	var itemId = itemIdArr[roundObj.itemTitle];
	var gameId = gameIdArr[roundObj.game];
	
	console.log("Creating round for item " + itemId + " for game " + gameId);
	
	if (itemId == null) {
		//console.log("No cached id for itemTitle " + roundObj.itemTitle+ " attempting lookup..");
		asynchWaterfallFindItemByTitle(roundObj.itemTitle, function (err, user) {
				if (err) {
					console.log("ERROR in asynchCreateRound after lookup attempt:"+err);
				} else {
					asynchCreateRound(roundObj, null);
				}
			}); 
	} else if (gameId == null) {
		//console.log("No cached id for game name+" +roundObj.game+" attempting lookup..");
		asynchWaterfallFindGameByName(roundObj.game, function (err, user) {
				if (err) {
					console.log("ERROR in asynchCreateRound after lookup attempt:"+err);
				} else {
					asynchCreateRound(roundObj, null);
				}
			});
	} else {
		roundObj.model.create({
		index: roundObj.index,
		status: roundObj.status, 
		result: roundObj.result,
		_itemId: itemId,
		_gameId: gameId,
		votes: roundObj.votes,
		unit: roundObj.unit},
		function (err) { 
			if (err) 
				console.log("ERROR in asynchCreateRound:"+err); 
			else 
				console.log("Round " + roundObj.index + " for item "+ roundObj.itemTitle +" created!");
			});
	}
	//execute callback if participating in a batch operation
	if (callback != null) setTimeout(function() { callback(); }, 1);
};

// exports.createRounds = function(roundArr) {
	// console.log("Creating rounds...");
	// async.eachSeries(roundArr, asynchCreateRound, function(err) {
		// if (err) {
			// console.log('Error creating rounds.' + err);
		// } else {
			// console.log('Rounds created successfully!');
		// }
	// });
// }
exports.createRounds = function(roundArr, mainCallback) {
	console.log("Seeding database with dummy rounds...");
	async.eachSeries(roundArr, asynchCreateRound, function(err) {
		if (err) {
			console.log('Error creating rounds.' + err);
		} else {
			console.log('Rounds created successfully!');
		}
		mainCallback(err, "rounds");
	});
}
/* ROUND methods */





// rooms = require('../models/roomsModel.js');
// var Room = mongoose.model('Room',rooms.roomSchema);
// exports.updateRoomCreatedByName = function(roomModel, roomName, userModel, createdByUserName) {
	// roomModel.findOne({ name: 'Room1'}, function (err, room) {
		// if (err) return exports.handleError(err, room);
		// console.log("FOUND ROOM: " + room);
		// userModel.findOne({ name: 'User 1'}, function (err, user) {
			// if (err) return exports.handleError(err, user);
			// console.log("FOUND USER: " + user);
			// if ((room != null) & (user != null)) {
				// room._createdBy = user._id;
				// room.save(exports.handleSave);
			// }
		// });
	// });
// };