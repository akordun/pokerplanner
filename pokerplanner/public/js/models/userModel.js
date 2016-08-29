var appUsers = appUsers || {};

// User Model
// ----------

appUsers.User = Backbone.Model.extend({
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
    name		  : '',
    username	: '',
    yahooName	: '',
    skypeName : '',
    email		  : '',
    isAdmin		: false
	}
});
