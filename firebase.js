// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMoQFSGWKfMXOVMukLmucAh_AFIjpAeZw",
    authDomain: "auth-f3a34.firebaseapp.com",
    projectId: "auth-f3a34",
    storageBucket: "auth-f3a34.appspot.com",
    messagingSenderId: "258452298086",
    appId: "1:258452298086:web:aa078e3f3419334d3690a7",
    measurementId: "G-4VV6CRG1Z5"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }