$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});
function menu() {
	var element = document.getElementById("navbar");
  
	if (element.classList) { 
	  element.classList.toggle("menuani");
	} else {
	  var classes = element.className.split(" ");
	  var i = classes.indexOf("menuani");
  
	  if (i >= 0) 
		classes.splice(i, 1);
	  else 
		classes.push("menuani");
		element.className = classes.join(" "); 
	}
  }