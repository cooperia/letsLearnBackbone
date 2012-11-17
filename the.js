(function ($) {

Friend = Backbone.Model.extend({
	//Create a model to hold friend atribute
	name: null,
	status: null
});

Friends = Backbone.Collection.extend({
	//This is our Friends collection and holds our Friend models
	initialize: function (models, options) {
		this.bind("add", options.view.addFriendLi);
		//Listen for new additions to the collection and call a view function if so
	}
});

AppView = Backbone.View.extend({
	el: $("body"),
	initialize: function () {
		this.friends = new Friends( null, { view: this });
		//Create a friends collection when the view is initialized.
		//Pass it a reference to this view to create a connection between the two
	},
	events: {
		"click #add-friend":  "showForm",
		"click #submit": "save",
		"mouseover .friend": "displayStatus",
		"mouseout .friend": "hideStatus",
	},
	showForm: function () {
		$('form').fadeIn('slow').removeClass('hidden');
	},
	save: function () {
		var friend_name = $('#form_name').val();
		var friend_status = $('#form_status').val();
		var friend_model = new Friend({ name: friend_name, status: friend_status });
		$('form').addClass('hidden');
		//Add a new friend model to our friend collection
		this.friends.add( friend_model );
	},
	addFriendLi: function (model) {
		//The parameter passed is a reference to the model that was added
		$("#friends-list").append("<li class='friend'>" + model.get('name') + "<br/><p class='hidden'>" + model.get('status') + "</p></li>");
		//Use .get to receive attributes of the model
	},
	displayStatus: function (e) {
		console.log(e.currentTarget);
		$('p', e.currentTarget).removeClass('hidden');
	},
	hideStatus: function (e) {
		console.log(e.currentTarget);
		$('p', e.currentTarget).addClass('hidden');
	}
});

var appview = new AppView;

})(jQuery);