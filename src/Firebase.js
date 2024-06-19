import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCaltILQ5FCq1fRjzozw4DFiQsTSfW6t_8",
    authDomain: "pushnotifications-6364b.firebaseapp.com",
    projectId: "pushnotifications-6364b",
    storageBucket: "pushnotifications-6364b.appspot.com",
    messagingSenderId: "299321119503",
    appId: "1:299321119503:android:ed8b7af006272dfd4b647a",
    measurementId: "G-MEASUREMENT_ID" // Optional: replace with your actual measurement ID if you have one
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, auth };
