/* ep-nav.js */

ep.nav = {
	characters: [],
	init: function() {
		ep.log("init nav");

		$(".ep-nav-link").click(ep.nav.click);
		$("#ep-select-char").bind("change", ep.nav.selectChar);
		ep.nav.loadChars();
	},
	click: function() {
		ep.log("clicked nav");

		var $that = $(this);
		var href = $that.attr("href").substring(1);
		$(".ep-nav-link").removeClass("ep-nav-link-active")
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
			setTimeout(ep.nav.renderChars, 10);
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
		var uri = $sel.find("option:selected").attr("value");
		if (uri) {
			ep.character.loadChar(uri);
		} else {
			ep.character.hideChar();
		}
	},
	showLinks: function() {
		$(".ep-nav-links").show();
	},
	hideLinks: function() {
		$(".ep-nav-links").hide();
	}
};