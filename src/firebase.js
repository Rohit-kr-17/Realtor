// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBZqlODLXFgic2kZM1pO6qgmKV3VGBFWsI",
	authDomain: "realtor-clone-project-51ab5.firebaseapp.com",
	projectId: "realtor-clone-project-51ab5",
	storageBucket: "realtor-clone-project-51ab5.appspot.com",
	messagingSenderId: "79312624770",
	appId: "1:79312624770:web:ff8e36f985ed8c8c46a89b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
