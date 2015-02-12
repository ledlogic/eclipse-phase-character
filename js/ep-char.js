/* ep-char.js */

/* 
 * The display models are optimized for the output display, rather than being truncated.
 * Since the order is known in the output, rendering of css is simplified.
 * In another layout, it could be adjusted to use css-specific overrides for position
 * of individual attributes.
 */
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
		ep.log("loading char");

		ep.progress.show();
		$.ajax("js/" + uri)
		.done(function(data, status, jqxhr) {
			ep.character.spec = data.spec;
			setTimeout(ep.character.render,10);
		})
		.fail(function() {
			alert("Error: unable to load character list.");
		})
		.always(function() {
			ep.progress.hide();
		});
	},
	render: function() {
		ep.log("rendering char");

		ep.character.$front.html("");

		ep.character.renderPlayer();
		ep.character.renderOverview();
		ep.character.renderAptitudes();
		ep.character.renderStats();
		ep.character.renderSkills();

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
	},
	renderSkills: function() {
		ep.log("rendering skills");

		var spec = ep.character.spec;

		var skills = spec.skills;
		
		// there are three sets of skills, to match the display
		for (var i=0;i<3;i++) {
			var skillsI = skills[i];

			var $skillsI = $("<div class=\"ep-skills ep-skills-" + i + "\"></div>");
			_.each(skillsI, function(skill) {
				var h1 = skill.split(",");
				var name = h1[0];
				var key = name.toLowerCase().replace(/ /g,"-").split(":").join("-");
				var html = [];
				html.push("<span class=\"ep-skill ep-skill-" + key + "\" title=\"" + key.toUpperCase() + "\">");
				var h2 = h1.slice(1);
				if (h2.length < 2) {
					value = "";
				} else {
					items = h2[1].split(" ");
					if (items.length) {
						_.each(items, function(item, i) {
							html.push("<span class=\"ep-skill-item ep-skill-item-" + i + "\">" + item + "</span>");
						});	
					}
				}
				html.push("</span>");
				$elm = $(html.join(""));
				$skillsI.append($elm);
			});
			ep.character.$front.append($skillsI);

		}		
	},
	renderStats: function() {
		ep.log("rendering stats");

		var spec = ep.character.spec;

		var stats = spec.stats;
		var $stats = $("<div class=\"ep-stats\"></div>");
		_.each(stats, function(value, key) {
			var h = value;
			$elm = $("<span class=\"ep-stat ep-stat-" + key + "\" title=\"" + key.toUpperCase() + "\">" + h + "</span>");
			$stats.append($elm);
		});
		ep.character.$front.append($stats);
	}
};