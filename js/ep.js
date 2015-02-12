/* ep.js */

var ep = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	character: {
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
			var base = spec.aptitudes.base;
			var $base = $("<div class=\"ep-aptitudes-base\"></div>");
			_.each(base, function(value, key) {
				var h = value;
				$elm = $("<span class=\"ep-aptitude ep-aptitude-" + key + "\">" + h + "</span>");
				$base.append($elm);
			});
			ep.character.$front.append($base);
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
	},

	nav: {
		characters: [],
		init: function() {
			ep.log("init nav");

			$(".ep-nav-link").click(ep.nav.click);
			$("#ep-select-char").bind("change", ep.nav.selectChar);
			ep.nav.loadChars();
		},
		click: function() {
			var $that = $(this);
			var href = $that.attr("href").substring(1);
			$that.siblings().removeClass("ep-nav-link-active")
			$that.addClass("ep-nav-link-active");
			$(".ep-page").hide();
			$("." + href).show();
		},
		loadChars: function() {
			ep.log("loading chars");

			ep.progress.show();
			$.ajax("js/ep-char-list.json")
				.done(function(data, status, jqxhr) {
					ep.nav.characters = data.characters;
					ep.nav.renderChars();
				})
				.fail(function() {
					alert("Error: unable to load character list.");
				})
				.always(function() {
					ep.progress.hide();
				});
		},
		renderChars: function() {
			ep.log("rendering chars");

			var $sel = $("#ep-select-char");
			for (var i=0;i<ep.nav.characters.length;i++) {
				var character = ep.nav.characters[i];
				var option = new Option();
				option.value = character.uri;
				option.text = character.name;
				$sel.append(option);
			}
		},
		selectChar: function() {
			ep.log("selected char");

			var $sel = $(this);
			var uri = $sel.val();
			ep.character.loadChar(uri);
		},
		showLinks: function() {
			$(".ep-nav-links").show();
		},
		hideLinks: function() {
			$(".ep-nav-links").hide();
		}
	},

	progress: {
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
	},

	init: function() {
		ep.progress.init();
		ep.character.init();
		ep.nav.init();
	},
};

$(document).ready(ep.init);
