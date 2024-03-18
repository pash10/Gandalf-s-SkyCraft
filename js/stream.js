// Assuming firebase has been added to your project and the SDK has been initialized
const dbRef = firebase.database().ref();

window.addEventListener("load", function(event) {
    const firebaseVideo = document.getElementById('firebaseVideo');
    console.log('Firebase Video Setup');

    function fetchImageFromFirebase() {
        // Fetch the image data from the Firebase Realtime Database
        dbRef.child('frames/1/image').get().then((snapshot) => {
            if (snapshot.exists() && snapshot.val() !== '') { // '' mean send.py end 
                const base64Image = snapshot.val();
                // Set the image source to the fetched base64 image string
                firebaseVideo.src = `data:image/jpeg;base64,${base64Image}`;
            } else {
                console.log("No data available");
                firebaseVideo.src = "https://static.thenounproject.com/png/1249243-200.png"; // Fallback image
            }
        }).catch((error) => {
            console.error(error);
            firebaseVideo.src = "https://static.thenounproject.com/png/1249243-200.png"; // Fallback image
        });
    }

    // Call initially to set the first image
    fetchImageFromFirebase();

    // Define your update interval (in milliseconds)
    const updateInterval = 100; // Example: 100ms (0.1 seconds)

    // Update the image source every x seconds
    setInterval(fetchImageFromFirebase, updateInterval);
});


