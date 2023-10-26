// firebase.js

// Your Firebase config object, obtained from your Firebase project settings
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Your registration script
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Firebase registration
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            // User registered successfully
            var user = userCredential.user;
            console.log('User registered:', user);

            // Additional code to store user data, if needed
            // For example, storing the username in Firestore
            firebase.firestore().collection('users').doc(user.uid).set({
                username: username,
                email: email,
                // Other user data you want to store
            }).then(function () {
                console.log('User data stored successfully');
            }).catch(function (error) {
                console.error('Error storing user data:', error);
            });
        })
        .catch(function (error) {
            // Handle registration errors
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
        });
});


// Login script
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('username').value; // Assuming you're using the username field for email
    var password = document.getElementById('password').value;

    // Firebase login
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            // User logged in successfully
            var user = userCredential.user;
            console.log('User logged in:', user);

            // Redirect to a specific page after successful login if desired
            // For example:
            // window.location.href = "dashboard.html"; 
        })
        .catch(function (error) {
            // Handle login errors
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Login error:', errorCode, errorMessage);
            alert('Login failed: ' + errorMessage);  // Inform the user
        });
});