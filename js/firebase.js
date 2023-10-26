// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyCMtz8eJe7WYvllOQ0wtSyOuW_a7gUkG1c",

    authDomain: "see-the-sea-4c396.firebaseapp.com",

    databaseURL: "https://see-the-sea-4c396-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "see-the-sea-4c396",

    storageBucket: "see-the-sea-4c396.appspot.com",

    messagingSenderId: "208499675243",

    appId: "1:208499675243:web:ff025b1f1d549ad6a0612e",

    measurementId: "G-TNLP4SHRHW"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Your registration script
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var confirmEmail = document.getElementById('ConfirmEmail');
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var productSerial = document.getElementById('productSerial').value;
    var errorElement = document.getElementById('error');

    switch (checkGoodReg(username, email, password, confirmPassword, confirmEmail, productSerial)) {
        case 0:
            case 0:
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    const serialsRef = db.collection('serialNumbers'); // assuming you have a collection for serial numbers

    usersRef.where('username', '==', username).get()
        .then(snapshot => {
            if (!snapshot.empty) {
                throw new Error('Username already exists');
            }
            return usersRef.where('email', '==', email).get();
        })
        .then(snapshot => {
            if (!snapshot.empty) {
                throw new Error('Email already exists');
            }
            return serialsRef.where('number', '==', productSerial).get();
        })
        .then(snapshot => {
            if (!snapshot.empty) {
                throw new Error('Serial number already exists');
            }
            return firebase.auth().createUserWithEmailAndPassword(email, password);
        })
        .then(function (userCredential) {
            // User registered successfully
            var user = userCredential.user;
            console.log('User registered:', user);

            return firebase.firestore().collection('users').doc(user.uid).set({
                username: username,
                email: email,
                productSerial: productSerial,
                // Other user data you want to store
            });
        })
        .then(function () {
            console.log('User data stored successfully');
        })
        .catch(function (error) {
            if (error.message === 'Username already exists') {
                errorMessage.textContent = "Username already exists";
            } else if (error.message === 'Email already exists') {
                errorMessage.textContent = "Email already exists";
            } else if (error.message === 'Serial number already exists') {
                errorMessage.textContent = "Serial number already exists";
            } else {
                errorMessage.textContent = "An unknown error occurred";
            }
            console.error('Registration error:', error);
        });
    break;
            break;
        case 1:
            errorMessage.textContent = "Username field is empty";
            break;
        case 2:
            errorMessage.textContent = "Username must have only a-z, A-Z, and 0-9";
            break;
        case 3:
            errorMessage.textContent = "Email field is empty";
            break;
        case 4:
            errorMessage.textContent = "Email is not valid";
            break;
        case 5:
            errorMessage.textContent = "Confirm Email field is empty";
            break;
        case 6:
            errorMessage.textContent = "Email and Confirm Email do not match";
            break;
        case 7:
            errorMessage.textContent = "Password field is empty";
            break;
        case 8:
            errorMessage.textContent = "Password must have a-z, A-Z, 0-9, and at least one symbol";
            break;
        case 9:
            errorMessage.textContent = "Confirm Password field is empty";
            break;
        case 10:
            errorMessage.textContent = "Password and Confirm Password do not match";
            break;
        case 11:
            errorMessage.textContent = "Serial number is invalid or does not exist";
            break;
        default:
            errorMessage.textContent = "An unknown error occurred";
            break;
    }
});


// Login script
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value; // Assuming you're using the username field for email
    var password = document.getElementById('password').value;
    switch (checkLogin(email, password)) {
        case 0:
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
                
                    if (errorCode === 'auth/user-not-found') {
                        alert('No account found with the provided email address. Please sign up.');
                    } else if (errorCode === 'auth/wrong-password') {
                        alert('Incorrect password. Please try again.');
                    } else {
                        console.error('Login error:', errorCode, errorMessage);
                        alert('Login failed: ' + errorMessage);  // Inform the user
                    }
                });
            break;
        case 1:
            errorMessage.textContent = "Email field is empty";
            break;
        case 2:
            errorMessage.textContent = "Password field is empty";
            break;
        default:
            errorMessage.textContent = "An unknown error occurred";
            break;
    }
});

function checkGoodReg(username, mail, password, confPass, confEmail, ser) {
    if (!username) {
        return 1;
    }
    else if (!userNmaeGood(username)) {
        return 2;       // user name must have only a-z A-Z and 0-9
    }
    else if (!mail) {
        return 3; // Email field is empty
    } else if (!checkIfEmailValid(mail)) {
        return 4; // Email is not valid
    }
    else if (!confEmail) {
        return 5;
    }
    else if (checkEmailAndConfEmail(email, confEmail)) {
        return 6; //email and conf email !=
    }
    else if (!password) {
        return 7; // Password field is empty
    }
    else if (!checkPassword(password)) {
        return 8;   // password dont leget need to have a-z A-Z 0-9 and syblome
    }
    else if (!confPass) {
        return 9; //Conf Pass field is empty
    }
    else if (checkPassToPassConf(password, confPass)) {
        return 10  //pass and conf !=
    }
    else if (!SerNum(ser)) {
        return 11;;            // serial number dont exit 
    }
    return 0; // Everything is okay
}

function checkLogin(email, password) {
    if (!email) {
        return 1;
    }
    else if (!password) {
        return 2;
    }
    return 0;
}

function checkIfEmailValid(email,) {
    var validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return validEmailRegex.test(email);
}

function checkEmailAndConfEmail(email, confEmail) {
    return email === confPass;
}

function checkPassToPassConf(pass, confPass) {
    return pass === confPass;
}

function userNmaeGood(userName) {
    var pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(userName);

}

function checkPassword(pass) {
    var pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return pattern.test(pass);
}
function SerNum(ser) {
    var pattern = /^gfsts\d{5}$/;
    return pattern.test(ser)
}




