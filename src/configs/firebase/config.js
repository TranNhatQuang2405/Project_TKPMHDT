import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCG1qZI7gpxhSdz54_mQH9wlmmb8zwfn-I",
    authDomain: "chatapp-fe4a6.firebaseapp.com",
    projectId: "chatapp-fe4a6",
    storageBucket: "chatapp-fe4a6.appspot.com",
    messagingSenderId: "965486165414",
    appId: "1:965486165414:web:a66a2ffeaa765aae6da367",
    measurementId: "G-KGC0M11M43",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Get Database
const db = getDatabase();
if (window.location.hostname === "localhost") {
    // Point to the RTDB emulator running on localhost.
    connectDatabaseEmulator(db, "localhost", 9000);
}

// Get auth
const auth = getAuth(firebase);
connectAuthEmulator(auth, "http://localhost:9099");

export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/MainPage",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
    ],
};

export { firebase, auth, db };
