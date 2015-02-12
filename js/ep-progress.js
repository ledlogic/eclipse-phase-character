/* ep-progress */

ep.progress = {
	pct: 0,
	$bar: null,
	$elm: null,
	init: function() {
		ep.log("init progress");
		ep.progress.$elm = $('.progress');
		ep.progress.$bar = $('.progress-bar');
	},
	show: function() {
		ep.progress.pct = 10;
		ep.progress.$elm.show();
		ep.progress.timer();
	},
	render: function() {
		ep.progress.$bar.css('width', ep.progress.pct + '%').attr('aria-valuenow', ep.progress.pct);
	},
	update: function() {
		if (ep.progress.pct > 0) {
			ep.progress.pct += 5;
			ep.progress.render();	
			ep.progress.timer();	
		}
	},
	hide: function(pct) {
		ep.progress.pct = 0;
		ep.progress.$elm.hide();	
	},
	timer: function() {
		window.setTimeout(ep.progress.update, 10);
	}
};