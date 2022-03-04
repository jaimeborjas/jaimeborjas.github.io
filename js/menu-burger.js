function toggleMobileNav() {
	var x = document.getElementById("toggle-mobile-nav");
	var y = document.getElementById("menu");

	/* Show/hide nav */
	if (x.style.display === "block") {
		x.style.display = "none";
		y.style.background = "#fff";
	} else {
		x.style.display = "block";
		y.style.background = "rgba(173, 216, 230, 0.158)";
	}
}
