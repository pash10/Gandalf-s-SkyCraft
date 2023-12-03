document.addEventListener("DOMContentLoaded", function () {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    console.log("Page from URL: ", page); // Should output 'pro.html' when on the product page.

    let navItems = document.querySelectorAll("#navbar a");

    const homeLink = document.getElementById('homeLink');
    const droneGuideLink = document.getElementById('aboutLink');
    const contactLink = document.getElementById('contactLink');
    const productLink = document.getElementById('productLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const liveViewLink = document.getElementById('liveViewLink');
    const queryShowLink = document.getElementById('QuerisButton')
    const logoutButton = document.getElementById('logoutButton');
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

    var temp = localStorage.getItem('login');

    if (temp === "true") {
        // User is logged in
        homeLink.style.display = 'block'; // Adjust as needed
        droneGuideLink.style.display = 'block'; // Adjust as needed
        contactLink.style.display = 'block'; // Adjust as needed
        productLink.style.display = 'block'; // Adjust as needed
    
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        liveViewLink.style.display = 'block';
       if(localStorage.getItem("admin") === "1"){
            queryShowLink.style.display = 'block';
        }
        else{
            queryShowLink.style.display = 'none';
        }
        logoutButton.style.display = 'block';

    } else {
        // User is not logged in
        homeLink.style.display = 'block'; // Adjust as needed
        droneGuideLink.style.display = 'block'; // Adjust as needed
        contactLink.style.display = 'block'; // Adjust as needed
        productLink.style.display = 'block'; // Adjust as needed
    
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        liveViewLink.style.display = 'none';
        queryShowLink.style.display = 'none';
        logoutButton.style.display = 'none';
    }
    
});



