var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	name		: String,
	username	: String,
	password	: String,
	email		: String,
	isAdmin		: Boolean,
	loginCount	: { type: Number, default: 0},
	//roomAccess	: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
	created		: Date,
	lastLogin	: Date,
});

var roomSchema = Schema({
	name		: String,
	desc		: String,
	roomConfig	: { public: Boolean, 
					maxGames: {type: Number, min: 0, max: 100} 
				  },
	created		: Date,
	updated		: { type: Date, default: Date.now },
	_createdBy	: { type: Schema.Types.ObjectId, ref: 'User' },
	_updatedBy	: { type: Schema.Types.ObjectId, ref: 'User' },
});

var gameSchema = Schema({
	name		: String,
	status		: String,
	tags		: [ String ],
	timer		: Number,
	_roomId		: { type: Schema.Types.ObjectId, ref: 'Room' },
	gameConfig	: { closed: Boolean, timer: {type: Number, min: 1, max: 60} },
	inviteNames	: [ String ],
	players		: [ String ],
	leader		: { type: Schema.Types.ObjectId, ref: 'User' },
	archived 	: Boolean,
	created		: Date,
	updated		: { type: Date, default: Date.now },
	_createdBy	: { type: Schema.Types.ObjectId, ref: 'User' },
	_updatedBy	: { type: Schema.Types.ObjectId, ref: 'User' },
});

var itemSchema = Schema({
	title		: String,
	summary		: String,
	descUrl		: String,
	_gameId		: { type: Schema.Types.ObjectId, ref: 'Game' },
	estimate	: Number,
	unit		: String,
	created		: Date,
	updated		: { type: Date, default: Date.now },
	_createdBy	: { type: Schema.Types.ObjectId, ref: 'User' },
});

var roundSchema = Schema({
	index		: Number,
	status		: String,
	result		: Number,
	_itemId		: { type: Schema.Types.ObjectId, ref: 'Item' },
	_gameId		: { type: Schema.Types.ObjectId, ref: 'Game' },
	votes		: [ { player  	: String ,
					  vote		: Number,
					  timestamp : Date
					} ],
	voteStats	: { avg: Number, min: Number, max: Number},
	unit		: String,
	elapsedTime	: Number,
	startTime	: Date,
	startEnd	: Date,
});

module.exports = {
	User:  	mongoose.model('users', userSchema),
	Room: 	mongoose.model('rooms', roomSchema),
    Game: 	mongoose.model('games', gameSchema),
    Item:	mongoose.model('items', itemSchema),
	Round:  mongoose.model('rounds', roundSchema)
};