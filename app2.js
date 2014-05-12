
function numberFormat(n) {
	//cache the formatter once
	if(window.Intl && !window.numberFormatter) window.numberFormatter = window.Intl.NumberFormat();
	
	if(window.numberFormatter) {
		return window.numberFormatter.format(n);
	} else {
		return n;	
	}
}

$(document).ready(function() {

	//get the table dom
	$table = $("#stats tbody");
	//now, get our data from the api, which is fake btw
	$.getJSON("stats.json").done(function(s) {
		//iterate over stats and add to table
		for(var i=0; i<s.length; i++) {
			$table.append("<tr><td>"+s[i].date+"</td><td>"+numberFormat(s[i].views)+"</td></tr>");
		}
	}).fail(function(e) {
		console.log("we failed");
		console.dir(e);
	});
});