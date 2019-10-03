/* global Module */

/* Magic Mirror
 * Module: MMM-Craigslist
 *
 * By BuzzKc
 * MIT Licensed.
 */

Module.register("MMM-Craigslist", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		city: 'seattle',
		title: 'Craigslist',
		search: 'pinball',
		category: 'sss',
		maxPrice: '',
		minPrice: '',
		offset: ''
	},
	
	dataResult: null,

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;
		this.sendConfig();
		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	sendConfig: function() {
		this.sendSocketNotification('MMM-Craigslist_SEND_CONFIG', this.config);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function() {
		this.sendSocketNotification('MMM-Craigslist_GET_DATA', null);
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
		let self = this;
		const wrapper = document.createElement('div');
		if (this.dataResult === null || this.dataResult.length === 0) {
			wrapper.innerHTML =
				'<div class="loading"><span class="zmdi zmdi-rotate-right zmdi-hc-spin"></span> Loading...</div>';

			//retry ui update in a few seconds, data may still be loading
			setTimeout(function() {
				self.updateDom();
			}, 5000);

			return wrapper;
		}

		this.dataResult = this.dataResult.sort(this.compareDeviceNames); //sort device names
		

		const resultKeys = Object.keys(this.dataResult) || [];
		wrapper.innerHTML = `
      <span class="title">${this.config.title}</span>
      <ul class="listings">
        ${resultKeys
			.map(resultKey => {
				const listing = this.dataResult[resultKey];
				
				return `
                <li>
                  <!--<span class="listing">${listing.date}</span>-->
                  <span class="listing">${listing.price}</span>
                  <span class="listing">${listing.title}</span>
                </li>
            `;
			})
			.join('')}
		  </ul>
		`;
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css",
			"MMM-Craigslist.css"
		];
	},

	// Load translations files
	getTranslations: function() {
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-Craigslist-NOTIFICATION_TEST") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
		if (notification === "MMM-Craigslist_RESULTS_RECEIVED") {
			console.log(payload);
			this.dataResult = payload;
			this.updateDom();
		}
		if (notification === "MMM-Craigslist_Console") {
			console.log("Output: ");
			console.log(payload);
		}
	},
});
