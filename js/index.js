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




/*need to add  */
/*
const homeLink = document.getElementById('homeLink');
const droneGuideLink = document.getElementById('aboutLink');
const contactLink = document.getElementById('contactLink');
const productLink = document.getElementById('productLink');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const liveViewLink = document.getElementById('liveViewLink');
const logoutButton = document.getElementById('logoutButton');

if(localStorage.getItem('isLoggedIn') =='true') {
    console.log('word') // Logs 'word' to the console if the user is logged in
    logoutButton.style.display = 'block';
    postLink.style.display = 'block';
    mapLink.style.display = 'blcok'; // Typo: should be 'block'
    registerLink.style.display = 'none';
    loginLink.style.display = 'none';
} else {
    logoutButton.style.display = 'none';
    postLink.style.display = 'none';
    mapLink.style.display = 'none';
    registerLink.style.display = 'block';
    loginLink.style.display = 'block';
}
*/
