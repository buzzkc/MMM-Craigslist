/* Magic Mirror
 * Node Helper: MMM-Craigslist
 *
 * By BuzzKc
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var craigslist = require('node-craigslist');
var client;
var config;


module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "MMM-Craigslist-NOTIFICATION_TEST") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			this.sendNotificationTest(this.anotherFunction()); //Is possible send objects :)
		}
		if (notification === "MMM-Craigslist_SEND_CONFIG") {
			this.config = payload;
			this.client = new craigslist.Client({
				city : this.config.city
			});
		}
		if (notification === "MMM-Craigslist_GET_DATA") {
			this.getData();
		}
	},

	getData: function() {
		this.sendSocketNotification("MMM-Craigslist_Console", "getting data");
		options = {
			category : this.config.category,
			maxPrice : this.config.maxPrice,
			minPrice : this.config.minPrice,
			offset: this.config.offset
		};


		this.client
		.search(options, this.config.search)
		.then((listings) => {
			// filtered listings (by price)
			//listings.forEach((listing) => console.log(listing));
			this.sendSocketNotification("MMM-Craigslist_RESULTS_RECEIVED", listings);
		})
		.catch((err) => {
			this.sendSocketNotification("MMM-Craigslist_Console", err);
			console.error(err);
		});
	},

	// Example function send notification test
	sendNotificationTest: function(payload) {
		this.sendSocketNotification("MMM-Craigslist-NOTIFICATION_TEST", payload);
	},

	// this you can create extra routes for your module
	extraRoutes: function() {
		var self = this;
		this.expressApp.get("/MMM-Craigslist/extra_route", function(req, res) {
			// call another function
			values = self.anotherFunction();
			res.send(values);
		});
	},

	// Test another function
	anotherFunction: function() {
		return {date: new Date()};
	}
});
