function sorter(x,y) {

	if(window.Intl) {
		var lang = $("#langDropdown").val();
		if(lang === "") lang = navigator.language;		
		return window.Intl.Collator(lang).compare(x,y);
	} else {
		return x.localeCompare(y);	
	}
}

function getStudents() {

	$.getJSON("students.json").done(function(s) {
		//iterate over stats and add to table
		s.sort(sorter);
		for(var i=0; i<s.length; i++) {
			$table.append("<tr><td>"+s[i]+"</td></tr>");
		}
	}).fail(function(e) {
		console.log("we failed");
		console.dir(e);
	});
	
}

$(document).ready(function() {

	//get the table dom
	$table = $("#students tbody");
	
	//notice changes to drop down
	$("#langDropdown").on("change", function(e) {
		$table.empty();
		getStudents();
	});
	
	getStudents();
});