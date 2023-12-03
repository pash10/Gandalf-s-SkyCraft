document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    // Retrieve form values
    var name = document.getElementById('name').value;
    var phone = getFullPhoneNumber();
    var email = document.getElementById('email').value;
    var gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    var subscribe = document.getElementById('subscribe').checked;
    var additionalInfo = document.getElementById('additionalInfo').value;

    // Initialize errorMessage for displaying validation errors
    var errorMessage = document.getElementById('error'); // Ensure you have an element with id 'error' in your HTML

    // Run validation
    var validationCode = contUs(name, phone, email, gender, additionalInfo);
    
    switch (validationCode) {
        case 0:
            // All validations passed
            var ref = db.ref('queries');
            var data = {
                name: name,
                phone: phone,
                email: email,
                gender: gender,
                subscribe: subscribe,
                additionalInfo: additionalInfo
            };
            
            ref.push(data, function(error) {
                if (error) {
                    console.log('Data could not be saved. ' + error);
                } else {
                    console.log('Data saved successfully.');
                }
            });
            break;
        case 1:
            errorMessage.textContent = "Name field is empty";
            break;
        case 2:
            errorMessage.textContent = "Invalid name format (only letters allowed)";
            break;
        case 3:
            errorMessage.textContent = "Phone field is empty";
            break;
        case 4:
            errorMessage.textContent = "Invalid phone format";
            break;
        case 5:
            errorMessage.textContent = "Email field is empty";
            break;
        case 6:
            errorMessage.textContent = "Invalid email format";
            break;
        case 7:
            errorMessage.textContent = "Gender selection is required";
            break;
        default:
            errorMessage.textContent = "An unknown error occurred";
            break;
    }
});


function getFullPhoneNumber() {
    // Get the selected country code
    var countryCode = document.getElementById('countryCode').value;

    // Get the phone number
    var phoneNumber = document.getElementById('phone').value;

    // Concatenate country code and phone number
    var fullPhoneNumber = countryCode + " " + phoneNumber;

    return fullPhoneNumber;
}