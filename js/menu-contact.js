function toggleMenuContact() {
	var x = document.getElementById("toggle-menu-contact");
	var y = document.getElementById("toggle-menu-chat");

	/* Show/hide nav */
	if (x.style.display === "block") {
		x.style.display = "none";
		y.style.display = "block";
	} else {
		x.style.display = "block";
		x.style.width = "100%";
		y.style.display = "none";
	}
}
