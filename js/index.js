
document.addEventListener("DOMContentLoaded", function() {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let navItems = document.querySelectorAll("#navbar a");
    navItems.forEach(item => {
        if (item.getAttribute("href") === page) {
            item.style.fontWeight = "bold";
            item.style.fontSize = "larger";  // Makes the font size larger
            item.style.color = "red";       // Changes the color to red
            item.style.textDecoration = "underline"; // Adds underline
        }
    });
});