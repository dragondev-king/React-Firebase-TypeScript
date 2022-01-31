import firebase from "firebase/app";
import "firebase/database";

let config = {
    apiKey: "AIzaSyDljKpH92shBkivUjBf1-FfMfPei1k1VGs",
    authDomain: "react-typescript-firebas-7ff82.firebaseapp.com",
    databaseURL: "https://react-typescript-firebas-7ff82-default-rtdb.firebaseio.com",
    projectId: "react-typescript-firebas-7ff82",
    storageBucket: "react-typescript-firebas-7ff82.appspot.com",
    messagingSenderId: "258757100650",
    appId: "1:258757100650:web:7df4915b4c65574afcf613",
    measurementId: "G-1X68LMJ5MR"
};

firebase.initializeApp(config);

export default firebase.database();