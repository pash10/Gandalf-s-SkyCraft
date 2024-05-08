var errorMessage;
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form values
    var name = document.getElementById('name').value;
    var phone = getFullPhoneNumber();
    var email = document.getElementById('email').value;
    var gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    var subscribe = document.getElementById('subscribe').checked;
    var additionalInfo = document.getElementById('additionalInfo').value;

    // Initialize errorMessage
     errorMessage = document.getElementById('error');

    // Create a string representation of the current form data
    var currentQuery = JSON.stringify({ name, phone, email, gender, subscribe, additionalInfo });
    
        // Run validation

    var validationCode = contUs(name, phone, email, gender, additionalInfo);

    // Check if the current query is the same as the last submitted query
    if (localStorage.getItem('lastQuery') === currentQuery) {
        validationCode =8;
    }



    console.log(validationCode)

    
    switch (validationCode) {
        case 0:
            case 0:
                // All validations passed
                var ref = db.ref('queries');
                var data = { name, phone, email, gender, subscribe, additionalInfo };
    
                ref.push(data, function(error) {
                    if (error) {
                        console.log('Data could not be saved. ' + error);
                        updateErrorMessage("An error occurred: " + error);
                    } else {
                        console.log('Data saved successfully.');
                        updateErrorMessage("Your query has been submitted successfully.", false);
                        localStorage.setItem('lastQuery', currentQuery); // Store the current query
                    }
                });
            break;
            case 1:
                updateErrorMessage("Name field is empty");
                break;
            case 2:
                updateErrorMessage("Invalid name format (only letters allowed)");
                break;
            case 3:
                updateErrorMessage("Phone field is empty");
                break;
            case 4:
                updateErrorMessage("Invalid phone format");
                break;
            case 5:
                updateErrorMessage("Email field is empty");
                break;
            case 6:
                updateErrorMessage("Invalid email format");
                break;
            case 7:
                updateErrorMessage("Gender selection is required");
                break;
            case 8:
                updateErrorMessage("Please change your query before resubmitting.");
                break;
            default:
                updateErrorMessage("An unknown error occurred");
                break;
        }
    });
    


    function updateErrorMessage(message, isError = true) {
        errorMessage.textContent = message;
        errorMessage.style.color = isError ? 'red' : 'green';
    }
    
    function enableSubmitOnChange() {
        var formElements = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
        formElements.forEach(function(element) {
            element.addEventListener('change', function() {
                localStorage.removeItem('lastQuery'); // Clear the last query when the form changes
            });
        });
    }
    
    
    enableSubmitOnChange();
    


    
function getFullPhoneNumber() {
    var countryCode = document.getElementById('countryCode').value;
    var phoneNumber = document.getElementById('phone').value;
    return countryCode + " " + phoneNumber;
}

