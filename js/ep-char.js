/* ep-char.js */

ep.character = {
	spec: {},
	$front: null,
	$back: null,
	init: function() {
		ep.log("init character");
		ep.character.$front = $(".ep-page-front");
		ep.character.$back = $(".ep-page-back");
	},
	loadChar: function(uri) {
		$.ajax("js/" + uri)
		.done(function(data, status, jqxhr) {
			ep.character.spec = data.spec;
			ep.character.render();
		})
		.fail(function() {
			alert("Error: unable to load character list.");
		})
		.always(function() {

		});
	},
	render: function() {
		ep.log("rendering char");

		ep.character.$front.html("");

		ep.character.renderPlayer();
		ep.character.renderOverview();
		ep.character.renderAptitudes();

		$(".ep-nav-link.ep-nav-link-front").click();			

		ep.nav.showLinks();
	},
	renderAptitudes: function() {
		ep.log("rendering aptitudes");

		var spec = ep.character.spec;

		// base
		var base = spec.aptitudes.base;
		var $base = $("<div class=\"ep-aptitudes-base\"></div>");
		_.each(base, function(value, key) {
			var h = value;
			$elm = $("<span class=\"ep-aptitude ep-aptitude-" + key + "\">" + h + "</span>");
			$base.append($elm);
		});
		ep.character.$front.append($base);

		// morph
		var morph = spec.aptitudes.morph;
		var $morph = $("<div class=\"ep-aptitudes-morph\"></div>");
		_.each(morph, function(value, key) {
			var h = value ? value : "";
			$elm = $("<span class=\"ep-aptitude ep-aptitude-" + key + "\">" + h + "</span>");
			$morph.append($elm);
		});
		ep.character.$front.append($morph);

		// total
		var $total = $("<div class=\"ep-aptitudes-total\"></div>");
		_.each(base, function(value, key) {
			var t = spec.aptitudes.base[key] + spec.aptitudes.morph[key]
			$elm = $("<span class=\"ep-aptitude ep-aptitude-" + key + "\">" + t + "</span>");
			$total.append($elm);
		});
		ep.character.$front.append($total);
	},
	renderOverview: function() {
		ep.log("rendering overview");

		var spec = ep.character.spec;
		var overview = spec.overview;
		var $overview = $("<div class=\"ep-overview\"></div>");
		_.each(overview, function(value, key) {
			var h = value + "";
			if (h) {
				if (h.indexOf(",") > -1) {
					h = h.split(",");
					h = h.join("<br/>");
				}
				$elm = $("<span class=\"ep-overview-item ep-overview-item-" + key + "\">" + h + "</span>");
				$overview.append($elm);
			}
		});
		ep.character.$front.append($overview);
	},
	renderPlayer: function() {
		ep.log("rendering player");

		var spec = ep.character.spec;
		var player = spec.player;
		var $player = $("<div class=\"ep-player\">" + player + "</div>");
		ep.character.$front.append($player);
	}
};