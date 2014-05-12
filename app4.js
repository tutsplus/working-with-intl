
function numberFormat(n) {
	
	if(window.Intl) {
		var lang = $("#langDropdown").val();
		if(lang === "") lang = navigator.language;
		var formatter = new window.Intl.NumberFormat(lang);
		return formatter.format(n);
	} else {
		return n;	
	}
}

function dateFormat(n) {

	//Used for date display
	var opts = {};
//	opts.day = "numeric";
	opts.weekday = "long";
	opts.year = "numeric";
	opts.month = "long";

	if(window.Intl) {
		var lang = $("#langDropdown").val();
		if(lang === "") lang = navigator.language;

		var formatter = new window.Intl.DateTimeFormat(lang, opts);
		n = new Date(n);
		return formatter.format(n);
	} else {
		return n;	
	}
}

function getStats() {

	$.getJSON("stats.json").done(function(s) {
		//iterate over stats and add to table
		for(var i=0; i<s.length; i++) {
			$table.append("<tr><td>"+dateFormat(s[i].date)+"</td><td>"+numberFormat(s[i].views)+"</td></tr>");
		}
	}).fail(function(e) {
		console.log("we failed");
		console.dir(e);
	});
	
}

$(document).ready(function() {

	//get the table dom
	$table = $("#stats tbody");
	
	//notice changes to drop down
	$("#langDropdown").on("change", function(e) {
		$table.empty();
		getStats();
	});
	
	getStats();
});