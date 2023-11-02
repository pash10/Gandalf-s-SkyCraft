document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var confirmEmail = document.getElementById('ConfirmEmail');
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var productSerial = document.getElementById('productSerial').value;
    var errorMessage = document.getElementById('error');

    switch (checkGoodReg(username, email, password, confirmPassword, confirmEmail, productSerial)) {
        case 0:
            db.ref('users').orderByChild('username').equalTo(username).once('value', snapshot => {
                if (snapshot.exists()) {
                    throw new Error('Username already exists');
                }
                return db.ref('users').orderByChild('email').equalTo(email).once('value');
            })
                .then(snapshot => {
                    if (snapshot.exists()) {
                        throw new Error('Email already exists');
                    }
                    return db.ref('serialNumbers').orderByChild('number').equalTo(productSerial).once('value');
                })
                .then(snapshot => {
                    if (snapshot.exists()) {
                        throw new Error('Serial number already exists');
                    }
                    return firebase.auth().createUserWithEmailAndPassword(email, password);
                })
                .then(function (userCredential) {
                    // User registered successfully
                    var user = userCredential.user;
                    console.log('User registered:', user);

                    // Use Realtime Database API
                    return db.ref('users/' + user.uid).set({
                        username: username,
                        email: email,
                        productSerial: productSerial,

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

