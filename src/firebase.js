import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyCY0ehM8GQUOk7-hLG-NZRLDWh3Db6tLYg",
    authDomain: "random-app-f0544.firebaseapp.com",
    databaseURL: "https://random-app-f0544-default-rtdb.firebaseio.com",
    projectId: "random-app-f0544",
    storageBucket: "random-app-f0544.appspot.com",
    messagingSenderId: "206087918962",
    appId: "1:206087918962:web:2a6a6e2c64b94f5f9ef9eb"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // Use these for db & auth
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth, db, };
