const express = require('express');
const app = express();
const format = require('util').format;
const RaspiCam = require('raspicam');
const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');

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

const storage = googleStorage({
  projectId: firebaseConfig.projectId,
  keyFilename: "IOtroniks-2c1d366951f1.json"
});

const bucket = storage.bucket(firebaseConfig.storageBucket);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

let firebaseLogInData = {
  email: "iotronik-pi@gmail.com",
  password: "iotronik",
  isLoggedIn: false
};

let firebaseDatabase, firebaseStorage;
let logInInterval;

app.get('/', (req, res) => {
  console.log('Getting Root');
  res.send('Server is running');
});

app.post('/occurrence', (req, res) => {
  console.log('Posting Occurrence');
  console.log(req);
});

app.post('/test-image', multer.single('file'), (req, res) => {
  let file = req.file;
  let newFileName = `${file.originalname}_${Date.now()}`;

  let fileUpload = bucket.file(newFileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  blobStream.on('error', (error) => {
    next(error);
    return;
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
    res.status(200).send({
      status: 'success'
    });
  });

  blobStream.end(file.buffer);
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
