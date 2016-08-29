var appUsers = appUsers || {};

// Users Collection
// ---------------

// The collection of users is backed by *localStorage* instead of a remote
// server.
var UserList = Backbone.Collection.extend({

	// Reference to this collection's model.
	model: appUsers.User,

	// Save all of the users under the `"users-backbone"` namespace.
	localStorage: new Backbone.LocalStorage('users-backbone'),

	// Filter down the list of all users who are admins.
	admins: function() {
	  return this.filter(function( user ) {
			return user.get('isAdmin');
	  });
	},

	// Filter down the list to only users who are not admins.
	nonadmins: function() {
    return this.filter(function( user ) {
			return !user.get('isAdmin');
	  });
	},

	// We keep the Users in sequential order, despite being saved by unordered
	// GUID in the database. This generates the next order number for new items.
	nextOrder: function() {
	  if ( !this.length ) {
			return 1;
	  }
	  return this.last().get('order') + 1;
	},

	// Users are sorted by their original insertion order.
	comparator: function( user ) {
	  return user.get('order');
	}
});

// Create our global collection of **Users**.
appUsers.Users = new UserList();
