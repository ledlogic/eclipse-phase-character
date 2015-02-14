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
	hideChar: function() {
		ep.log("hiding char");
		$(".ep-page").hide();
		ep.nav.hideLinks();
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
			alert("Error: unable to load character.");
		})
		.always(function() {
			ep.progress.hide();
		});
	},
	render: function() {
		ep.log("rendering char");

		ep.progress.show();

		// because printing
		var frontSrc = ep.character.$front.attr("data-background-src");
		if (!frontSrc) {
			frontSrc = ep.character.$front.css("background");
			frontSrc = frontSrc.match(/url\((.*?)\)/)[1].replace(/('|")/g,'');
			ep.character.$front.attr("data-background-src", frontSrc);
		}
		ep.character.$front.html("<img class=\"ep-page-background-img\" src=\"" + frontSrc + "\" />");

		var backSrc = ep.character.$back.attr("data-background-src");
		if (!backSrc) {
			backSrc = ep.character.$back.css("background");
			backSrc = backSrc.match(/url\((.*?)\)/)[1].replace(/('|")/g,'');
			ep.character.$back.attr("data-background-src", backSrc);
		}
		ep.character.$back.html("<img class=\"ep-page-background-img\" src=\"" + backSrc + "\" />");

		ep.character.renderPlayer();
		ep.progress.update(5);
		ep.character.renderOverview();
		ep.progress.update(15);
		ep.character.renderAptitudes();
		ep.progress.update(25);
		ep.character.renderStats();
		ep.progress.update(30);
		ep.character.renderSkills();
		ep.progress.update(35);
		ep.character.renderRep();
		ep.progress.update(40);
		ep.character.renderTraits();
		ep.progress.update(50);
		ep.character.renderImplants();
		ep.progress.update(60);
		ep.character.renderArmor();
		ep.progress.update(70);
		ep.character.renderGear();
		ep.progress.update(80);
		ep.character.renderWeapons();
		ep.progress.update(90);

		$(".ep-nav-link.ep-nav-link-front").click();			

		ep.nav.showLinks();
		ep.progress.hide();
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

		// front
		var $overview = $("<div class=\"ep-overview\"></div>");
		_.each(overview, function(value, key) {
			var h = value + "";
			if (h.indexOf(",") > -1) {
				h = h.split(",");
				h = h.join("<br/>");
			}
			if (!h) {
				h = "&nbsp;";
			}
			$elm = $("<span class=\"ep-overview-item ep-overview-item-" + key + "\">" + h + "</span>");
			$overview.append($elm);
		});
		ep.character.$front.append($overview);

		// back
		$overview = $("<div class=\"ep-overview\"></div>");
		$elm = $("<span class=\"ep-overview-item ep-overview-item-character" + "\">" + overview.name + "</span>");
		$overview.append($elm);
		ep.character.$back.append($overview);
	},
	renderPlayer: function() {
		ep.log("rendering player");

		var spec = ep.character.spec;
		var player = spec.player;
		var $player = $("<div class=\"ep-player\">" + player + "</div>");
		ep.character.$front.append($player);
		$player = $("<div class=\"ep-player\">" + player + "</div>");
		ep.character.$back.append($player);
	},
	renderRep: function() {
		ep.log("rendering rep");

		var spec = ep.character.spec;
		var rep = spec.rep;
		var i = 0;
		var $rep = $("<div class=\"ep-rep ep-rep-" + Math.floor(i/4) + "\"></div>");
		_.each(rep, function(value, key) {
			var h = value;
			$elm = $("<span class=\"ep-rep-item ep-rep-item-" + key + "\">" + h + "</span>");
			$rep.append($elm);
			i++;
			if (i === 4) {
				ep.character.$back.append($rep);		
				$rep = $("<div class=\"ep-rep ep-rep-" + Math.floor(i/4) + "\"></div>");
			}
		});
		ep.character.$back.append($rep);
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
				var skillName = h1[0];
				var key = skillName.toLowerCase().replace(/ /g,"-").split(":").join("-");
				var html = [];

				html.push("<span class=\"ep-skill ep-skill-" + key + "\" title=\"" + key.toUpperCase() + "\">");
				var h2 = h1.slice(1);
				if (h2.length < 2) {
					value = "";
				} else {
					items = h2[1].split(" ");
					if (items.length) {
						_.each(items, function(item, i) {
							html.push("<span class=\"ep-skill-item ep-skill-item-" + key + "\">" + item + "</span>");
						});

						var cIndex = skillName.indexOf(":");
						if (cIndex > -1) {
							var subset = skillName.substring(cIndex+1);
							if (subset) {
								var subsetKey = subset.toLowerCase();
								html.push("<span class=\"ep-skill-item ep-skill-item-subset ep-skill-item-" + subsetKey + "\">" + subset + "</span>");
							}
						}
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
			var $elm = $("<span class=\"ep-stat ep-stat-" + key + "\" title=\"" + key.toUpperCase() + "\">" + h + "</span>");
			$stats.append($elm);
		});
		ep.character.$front.append($stats);
	},
	renderTraits: function() {
		ep.log("rendering traits");

		var spec = ep.character.spec;
		var traits = spec.traits;
		var $traits = $("<div class=\"ep-traits\"></div>");
		_.each(traits, function(value, key) {
			var $elm = $("<span class=\"ep-traits-item ep-traits-item-" + key + "\">" + value + "</span>");
			$traits.append($elm);
		});
		ep.character.$back.append($traits);
	},
	renderImplants: function() {
		ep.log("rendering implants");

		var spec = ep.character.spec;
		var implants = spec.implants;
		var $implants = $("<div class=\"ep-implants\"></div>");
		_.each(implants, function(value, key) {
			var $elm = $("<span class=\"ep-implants-item ep-implants-item-" + key + "\">" + value + "</span>");
			$implants.append($elm);
		});
		ep.character.$back.append($implants);
	},
	renderArmor: function() {
		ep.log("rendering armor");

		var spec = ep.character.spec;
		var armor = spec.armor;
		var $armor = $("<div class=\"ep-armor\"></div>");
		_.each(armor, function(value, key) {
			var $elm = $("<span class=\"ep-armor-item ep-armor-item-" + key + "\" title=\"" + key + "\">" + value + "</span>");
			$armor.append($elm);
		});
		ep.character.$front.append($armor);
	},
	renderGear: function() {
		ep.log("rendering gear");

		var spec = ep.character.spec;
		var gear = spec.gear;
		var $gear = $("<div class=\"ep-gear\"></div>");
		_.each(gear, function(value, key) {
			var $elm = $("<span class=\"ep-gear-item ep-gear-item-" + key + "\">" + value + "</span>");
			$gear.append($elm);
		});
		ep.character.$back.append($gear);
	},
	renderWeapons: function() {
		ep.log("rendering weapons");

		var spec = ep.character.spec;
		var weapons = spec.weapons;
		var i = 0;
		var $weapons = $("<div class=\"ep-weapons\"></div>");
		_.each(weapons, function(weapon) {
			var $weapon = $("<div class=\"ep-weapon\"></div>");
			_.each(weapon, function(value, key) {
				var $elm = $("<span class=\"ep-weapon-item ep-weapon-item-" + key + "\">" + value + "</span>");
				$weapon.append($elm);
			});
			$weapons.append($weapon);
		});
		ep.character.$front.append($weapons);
	}
};