/* ep.js */

var ep = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	init: function() {
		ep.progress.init();
		ep.character.init();
		ep.nav.init();
	}
};

$(document).ready(ep.init);
