// catchcount.js

// Reference to the location of the 'count' key in your Firebase database

const countRef = firebase.database().ref('/count'); // Root path since 'count' appears to be at the root


// Listen for changes in the 'count' value
countRef.on('value', function(snapshot) {
    // Get the count value
    const count = snapshot.val();

    // Find the element with the id 'liveVieweCount'
    const countElement = document.getElementById('liveVieweCount');

    // Update the content of the element
    countElement.textContent = count;
});
