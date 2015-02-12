/* ep.js */

var ep = {
	charsheet: {
		init: function() {
			$(".ep-nav-link").click(ep.nav.click)
		}
	},
	nav: {
		click: function() {
			var $that = $(this);
			var href = $that.attr("href").substring(1);
			$that.siblings().removeClass("ep-nav-link-active")
			$that.addClass("ep-nav-link-active");
			$(".ep-page").hide();
			$("." + href).show();
		}
	}
};

$(document).ready(ep.charsheet.init);
