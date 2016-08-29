var appUsers = appUsers || {};

// User View
// --------------

// The DOM element for a user item...
appUsers.UserView = Backbone.View.extend({

	//... is a row tag.
	tagName: 'tr',

	// Cache the template function for a single user row.
	template: _.template( $('#user-template').html() ),

	// The DOM events specific to an item.
	events: {
	  // 'dblclick label': 'edit',
	  // 'click .toggle': 'togglecompleted',
	  // 'click .destroy': 'clear',
	  // 'keypress .edit': 'updateOnEnter',
	  // 'blur .edit': 'close'
	},

	// The UserView listens for changes to its model, re-rendering. Since there's
	// a one-to-one correspondence between a **User** and a **UserView** in this
	// app, we set a direct reference on the model for convenience.
	initialize: function() {
	  this.listenTo(this.model, 'change', this.render);
	  this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	// Re-renders the titles of the todo item.
	render: function() {
	  this.$el.html( this.template( this.model.attributes ) );

    //   this.$el.toggleClass( 'completed', this.model.get('completed') );
    //   this.toggleVisible();
    //
	  // this.$input = this.$('.edit');
	  return this;
	},

	toggleVisible : function () {
      this.$el.toggleClass( 'hidden',  this.isHidden());
    },

	isHidden : function () {
      // var isCompleted = this.model.get('completed');
      // return ( // hidden cases only
      //   (!isCompleted && app.TodoFilter === 'completed')
      //   || (isCompleted && app.TodoFilter === 'active')
      // );
    },

    togglecompleted: function() {
      // this.model.toggle();
    },

	// Switch this view into `"editing"` mode, displaying the input field.
	edit: function() {
	  // this.$el.addClass('editing');
	  // this.$input.focus();
	},

	// Close the `"editing"` mode, saving changes to the todo.
	close: function() {
	  // var value = this.$input.val().trim();
    //
	  // if ( value ) {
		// this.model.save({ title: value });
	  // }
    //
	  // this.$el.removeClass('editing');
	},

	// If you hit `enter`, we're through editing the item.
	updateOnEnter: function( e ) {
	  // if ( e.which === ENTER_KEY ) {
		// this.close();
	  // }
	},

    // NEW - Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
      this.model.destroy();
    }
});
