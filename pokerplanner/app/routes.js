var rooms = require('./controllers/rooms'),
	users = require('./controllers/users'),
    games = require('./controllers/games'),
	rounds = require('./controllers/rounds'),
	items = require('./controllers/items'),
	home = require('./controllers/home');

module.exports.initialize = function(app) {
	app.get('/users', users.findAll);
	app.get('/users/:userId', users.findById);
	//app.post('/users', users.addUser);
	//app.put('/users/:id', users.updateUser);
	//app.delete('/users/:id', users.deleteUser);
	 
	app.get('/rooms', rooms.findAll);
	app.get('/rooms/:roomId', rooms.findById);

	//app.post('/rooms', rooms.addRoom);
	//app.put('/rooms/:id', rooms.updateRoom);
	//app.delete('/rooms/:id', rooms.deleteRoom);

	app.get('/games', games.findAll);
	app.get('/games/:gameId', games.findById);
	app.get('/rooms/:roomId/games', games.findAllGamesForRoomId);
	//app.post('/games', games.addGame);
	//app.put('/games/:id', games.updateGame);
	//app.delete('/games/:id', games.deleteGame);

	app.get('/items', items.findAll);
	app.get('/items/:itemId', items.findById);
	app.get('/games/:gameId/items', items.findAllItemsForGameId);
	//app.post('/items', items.addItem);
	//app.put('/items/:id', items.updateItem);
	//app.delete('/items/:id', items.deleteItem);

	app.get('/rounds', rounds.findAll);
	app.get('/rounds/:roundId', rounds.findById);
	app.get('/items/:itemId/rounds', rounds.findAllRoundsForItemId);
	app.get('/games/:gameId/items/:itemId/rounds', rounds.findAllRoundsForItemAndGameId);
	//app.post('/rounds', rounds.addItem);
	//app.put('/rounds/:id', rounds.updateRound);
	//app.delete('/rounds/:id', rounds.deleteRound);
};