// firebase.js

// Your Firebase config object, obtained from your Firebase project settings
const firebaseConfig = {

    apiKey: "AIzaSyCMtz8eJe7WYvllOQ0wtSyOuW_a7gUkG1c",
  
    authDomain: "see-the-sea-4c396.firebaseapp.com",
  
    projectId: "see-the-sea-4c396",
  
    storageBucket: "see-the-sea-4c396.appspot.com",
  
    messagingSenderId: "208499675243",
  
    appId: "1:208499675243:web:ff025b1f1d549ad6a0612e",
  
    measurementId: "G-TNLP4SHRHW"
  
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

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value; // Updated to use email
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