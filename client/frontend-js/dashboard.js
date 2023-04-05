document.querySelector(".fi-rr-apps").addEventListener("click", function() {
	const dropdownMenu = document.querySelector(".dropdown-menu");
	const menuIcon = document.querySelector(".fi-rr-apps");

	if (dropdownMenu.style.display === "block") {
		dropdownMenu.style.display = "none";
		menuIcon.classList.remove("active");
	} else {
		dropdownMenu.style.display = "block";
		menuIcon.classList.add("active");
	}
});

// Optional: Close the dropdown menu when clicking outside of it
window.addEventListener("click", function(event) {
	if (!event.target.matches(".fi-rr-apps")) {
		const dropdownMenu = document.querySelector(".dropdown-menu");
		const menuIcon = document.querySelector(".fi-rr-apps");
		dropdownMenu.style.display = "none";
		menuIcon.classList.remove("active");
	}
});

