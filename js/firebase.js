
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
const app = firebase.initializeApp(firebaseConfig);
console.log('Firebase App initialized:', app);

// Initialize Firebase Analytics (Optional, only if you're using Firebase Analytics)

// Initialize Firebase Realtime Database
const db = firebase.database();
console.log('Firebase Realtime Database initialized:', db);






