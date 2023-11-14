document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value; // Assuming you're using the username field for email
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error');

    switch (checkLogin(email, password)) {
        case 0:
            // Firebase login
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                    // User logged in successfully
                    var user = userCredential.user;
                    console.log('User logged in:', user);

                    // Retrieve additional user data from Firebase database
                    return db.ref('users/' + user.uid).once('value');
                })
                .then(function (snapshot) {
                    if (snapshot.exists()) {
                        var userData = snapshot.val();

                        // Save user data to local storage
                        saveUserDataToLocalStorage({
                            username: userData.username,
                            email: email,
                            productSerial: userData.productSerial
                        });
                        localStorage.setItem('login',true);
                    } else {
                        throw new Error('User data not found');
                    }
                })
                .catch(function (error) {
                    if (error === 'auth/user-not-found') {
                        alert('No account found with the provided email address. Please sign up.');
                    } else if (error === 'auth/wrong-password') {
                        alert('Incorrect password. Please try again.');
                    } else {
                        console.error('Login error:',  error,errorMessage);
                        alert('Login failed: ' + errorMessage);  // Inform the user
                        errorMessage.textContent = "err"

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


