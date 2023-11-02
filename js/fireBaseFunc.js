function checkGoodReg(username, mail, confEmail,password, confPass,ser) {
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
    else if (checkEmailAndConfEmail(mail, confEmail)) {
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
function saveUserDataToLocalStorage(user) {
    const userData = {
        username: user.username,
        email: user.email,
        productSerial: user.productSerial
    };
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
}

function getUserDataFromLocalStorage() {
    const userData = localStorage.getItem('loggedInUser');
    return userData ? JSON.parse(userData) : null;
}
