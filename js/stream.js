// Fetch the video URL from Firebase
firebase.database().ref('/path_to_video_url').on('value', (snapshot) => {
    const videoUrl = snapshot.val();
    // Update the video source
    document.getElementById('firebaseVideo').src = videoUrl;
});