import firebase from 'firebase/app';
import 'firebase/storage';


var config ={

    apiKey: "AIzaSyDeMmZdEMl6q7Eta-bPxAS-KTLvQuwfTRI",
    authDomain: "wellnesstracking.firebaseapp.com",
    databaseURL: "https://wellnesstracking.firebaseio.com",
    projectId: "wellnesstracking",
    storageBucket: "wellnesstracking.appspot.com",
    messagingSenderId: "37868625792",
    appId: "1:37868625792:web:cc21469f028b342fe0eb65",
    measurementId: "G-QJNQWJWTGK"



}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }

const storage = firebase.storage();

export {
    storage, firebase as default
};
