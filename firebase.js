import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC-w6_Lv4HHiVEYkCH0G7aO8LD1f0jhUpI",
    authDomain: "shigoto-df868.firebaseapp.com",
    databaseURL: "https://shigoto-df868.firebaseio.com",
    projectId: "shigoto-df868",
    storageBucket: "shigoto-df868.appspot.com",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
