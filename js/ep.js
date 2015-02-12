/* ep.js */

var ep = {
	log: function(s) {
		if (typeof(window.console) != "undefined") {
			console.log(s);
		}
	},

	character: {
		spec: {},
		init: function() {
			ep.log("init character");
		},
		loadChar: function(uri) {
			$.ajax("js/" + uri)
				.done(function(data, status, jqxhr) {
					ep.character.spec = data.spec;
					ep.character.renderChar();
				})
				.fail(function() {
					alert("Error: unable to load character list.");
				})
				.always(function() {
					
				});
		},
		renderChar: function() {
			ep.log("rendering char");
			ep.nav.showLinks();
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
