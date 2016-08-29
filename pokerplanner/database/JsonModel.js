ROOM.collection
ROOM {
	id: string,
	name: string,
	roomConfig: {
		public: true,
		maxGames: -1
	}		
}
GAME.collection
Game {
	id: string,
	roomId: string,
	name: string,
	createDate: string,
	modifiedDate: string,
	createdById: string,
	startTime: timestamp,
	completeTime: timestamp,
	elapsedTime: long,
	tags: [ strings ],
	gameConfig : {
		deckId: string,
		closed: false,
		timer: 10 },
	itemCollectionId: string,
	currentItemId: string,
	inviteeIds: [ string ],
	playerIds [ string ],
	leaderId: string,
	status : { "Open", "In Progress", "Completed", "Paused" },
	timer: long,
	historyLogId: string,
	guidelinesUrl: string,
	archived: false
}

ITEM.collection
Item {
	id: string,
	title: string,
	integration: { "JIRA" },
	descURL: string,
	twoWay: false,
	lastEstimate: int,
	roundIds: [ string ],
	createDate: string,
	modifiedDate: string,
	createdById: string
}

Rounds.collection
Round {
	id: string,
	itemId: string,
	gameId: string,
	unit: "storyPoints",
	startTime: timestamp,
	endTime: timestamp,
	elapsedTime: long,
	estimate: int,
	voteStats: {avg: long, min: int, max: int]
	votes: [ {playerId: string, vote: int, timestamp: string} ],
}	

USER.collection
USER {
	id: string,
	username: string,
	password: string,
	loginCount: long,
	lastLoginDate: date,
	email: string,
	roomACL: [{ roomId: string, roleId: string}],
	isGlobalAdmin: boolean,
}

ROLES.collection 
ROLE {
	roleName: string,
	mask: bitmask
}

SYS_CONFIG.collection
SYS_CONFIG {
	maxRooms: long,
	maxUsers: long,
	maxGameAge: long,
	allowAnonAccess: false,
	bannedUserIds: [ string ]
}

HISTORY.collection
LOG_ENTRY {
	userId: string,
	action: string,
	time: timestamp,
	parameters { roomId, gameId, itemId, useId, vote }
}
	
ACTIONS [LOGIN, 
	ENTER_ROOM,
	CREATE_ROOM,
	DELETE_ROOM,
	EDIT_ROOM,
	JOIN_GAME,
	CREATE_GAME,
	EDIT_GAME,
	DELETE_GAME,
	COMPLETE_GAME,
	PAUSE_GAME,
	START_GAME,
	ARCHIVE_GAME,
	CREATE_ITEM,
	ESTIMATE_ITEM,
	SCORE_ITEM,
	DELETE_ITEM,
	REPLAY_ROUND,
	START_ROUND,
	CREATE_USER,
	DELETE_USER,
	BAN_USER,
	EDIT_USER]
	
