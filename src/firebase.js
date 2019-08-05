  // Initialize Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var config = {
    apiKey: "AIzaSyC1KJSQnoWackc7D4cLQ_H-MyzJTecUbLI",
    authDomain: "slackapp-aa6cf.firebaseapp.com",
    databaseURL: "https://slackapp-aa6cf.firebaseio.com",
    projectId: "slackapp-aa6cf",
    storageBucket: "  slackapp-aa6cf.appspot.com",
    messagingSenderId: "881292286989"
};

firebase.initializeApp(config);

export default firebase;
