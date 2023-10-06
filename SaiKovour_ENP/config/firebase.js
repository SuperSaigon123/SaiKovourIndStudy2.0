// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcTucUnkDs7DIebCsBNvpobcnECQadoXA",
  authDomain: "saik-enp.firebaseapp.com",
  projectId: "saik-enp",
  storageBucket: "saik-enp.appspot.com",
  messagingSenderId: "310492949141",
  appId: "1:310492949141:web:39850cd7d5128c4c67c99c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };