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
		ep.progress.pct = 0;
		ep.progress.$elm.show();
	},
	render: function() {
		var pct = ep.progress.pct;
		ep.progress.$bar.css('width', pct + '%').attr('aria-valuenow', pct);
	},
	update: function(pct) {
		ep.progress.pct = Math.max(0,Math.min(100, pct));
		ep.progress.render();
	},
	hide: function(pct) {
		ep.progress.pct = 0;
		ep.progress.$elm.hide();	
	}
};