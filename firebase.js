import firebase from "firebase";
import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBItv7-xuIYhRHkbQGTcpNzWy5swxSX8HI",
  authDomain: "clone-6c258.firebaseapp.com",
  projectId: "clone-6c258",
  storageBucket: "clone-6c258.appspot.com",
  messagingSenderId: "381346753635",
  appId: "1:381346753635:web:f16008d4b6522c13b11c56",
  measurementId: "G-VRSH1V4B1Z",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;