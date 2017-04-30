const express = require('express');
const app = express();
const RaspiCam = require('raspicam');
const firebase = require('firebase');

let cameraOptions = {
  mode: 'photo',
  output: 'asset/pic.jpg'
};

const camera = new RaspiCam(cameraOptions);

const firebaseConfig = {
  apiKey: "AIzaSyAjnBilwCxY6qguPOn2poyRgcKRQwwFprw",
  authDomain: "iotroniks.firebaseapp.com",
  databaseURL: "https://iotroniks.firebaseio.com",
  projectId: "iotroniks",
  storageBucket: "iotroniks.appspot.com",
  messagingSenderId: "512273627061"
};

let firebaseLogInData = {
  email: "iotronik-pi@gmail.com",
  password: "iotronik",
  isLoggedIn: false
};

let firebaseDatabase, firebaseStorage;
let logInInterval;

app.get('/', (req, res) => {
  console.log('Hi');
  res.send('Server is running');
});

app.listen(3000, () => {
  console.log('App listening to port 3000');
  // camera.start();

  // Initializes Firebase
  firebase.initializeApp(firebaseConfig);
  // Firebase log in
  firebaseLogIn(false);
  logInInterval = setInterval(() => {
    firebaseLogIn(true);
  }, 10000);
  firebaseDatabase = firebase.database();
  // firebaseStorage = firebase.storage();
});

/**
 * Log into Firebase
 * @param {boolean} toClear if true then it will run clear interval function
 */
const firebaseLogIn = (toClear) => {
  firebase.auth().signInWithEmailAndPassword(firebaseLogInData.email, firebaseLogInData.password).then((success) => {
    console.log("Logged in successfully");
    if (toClear) {
      clearFirebaseLogInInterval();
    } else {
      // Testing code
      addOccurrence();
    }
  }).catch((error) => {
    console.error("Logged in error code", error.code);
    console.error("Logged in error message", error.message);
  });
}

/**
 * Clear the interval that contains Firebase log in process
 */
const clearFirebaseLogInInterval = () => {
  if (logInInterval) {
    clearInterval(logInInterval);
  }
}

const addOccurrence = () => {
  if (firebaseDatabase) {
    firebaseDatabase.ref('occurrence/test').set({
      time: "Time",
      image: "Image"
    });
  }
}

camera.on('start', () => {
  console.log('Camera started');
});
