document.addEventListener("DOMContentLoaded", function() {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    console.log("Page from URL: ", page); // Should output 'pro.html' when on the product page.

    let navItems = document.querySelectorAll("#navbar a");

    navItems.forEach(item => {
        console.log("Nav item href: ", item.getAttribute("href")); // Should output 'pro.html' for the product link.
        if (item.getAttribute("href") === page) {
            console.log("Match found for: ", item.getAttribute("href")); // Check if 'pro.html' match is found.
            item.style.fontWeight = "bold";
            item.style.fontSize = "larger";
            item.style.color = "red";
            item.style.textDecoration = "underline";
        }
    });



    /*SHOW ONLY What you need in the nav bar */
});






