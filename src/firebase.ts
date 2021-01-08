import firebase from "firebase/app";
import "firebase/auth";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDAcbi6Y-NN_7-l-3NA_Fc6wbs-kFHF3bk",
    authDomain: "ecommerce-e8e7d.firebaseapp.com",
    projectId: "ecommerce-e8e7d",
    storageBucket: "ecommerce-e8e7d.appspot.com",
    messagingSenderId: "683516487325",
    appId: "1:683516487325:web:6b94cb36f72b46c4731674"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();