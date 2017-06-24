const express = require('express');
const app = express();
const format = require('util').format;
const RaspiCam = require('raspicam');
const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');
const cors = require('cors');
const request = require('request');
const fs = require('fs');
// const net = require('net')
// const mqttCon = require('mqtt-connection')
// const mqttServer = new net.Server()

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

let firebaseDatabase, firebaseAuth;
let logInInterval;

/**
 * Allow CORS with Express server
 */
app.use(cors());

/**
 * Root path
 */
app.get('/', (req, res) => {
  console.log('Getting Root');
  res.send('Server is running');
});

/**
 * Adding new occurrence of incident
 */
app.post('/occurrence', multer.single('file'), (req, res) => {
  console.log('Posting Occurrence');
  console.log('occurrence', req.body);

  let file = req.file;
  console.log("occurrence", file);
  if (file) {
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success'
      });
    }).catch((error) => {
      console.error(error);
    });
  }
});

app.listen(3000, () => {
  console.log('App listening to port 3000');
  // Fisheye will take a snapshot
  camera.start();

  // Initializes Firebase
  firebase.initializeApp(firebaseConfig);
  firebaseAuth = firebase.auth();
  // Firebase log in
  firebaseLogIn(false);
  logInInterval = setInterval(() => {
    if (!firebaseAuth.currentUser) {
      firebaseLogIn(true);
    }
  }, 10000);
  firebaseDatabase = firebase.database();
});

/**
 * Requesting to retrieve image from corresponding NodeMCU
 */
app.post('/capture', (req, res) => {
  if (req.headers.hasOwnProperty("ip")) {
    const deviceIp = req.headers.ip;

    requestPicture(deviceIp, () => {
      readFileUpload(`asset/file_${deviceIp}.jpg`);
    });
  }
  res.status(200).send("POST TEST!!");
});

/**
 * Log into Firebase
 * @param {boolean} toClear if true then it will run clear interval function
 */
const firebaseLogIn = (toClear) => {
  firebaseAuth.signInWithEmailAndPassword(firebaseLogInData.email, firebaseLogInData.password).then((success) => {
    console.log("Logged in successfully");
    if (toClear) {
      clearFirebaseLogInInterval();
    } else {
      // Testing code
      // addOccurrence();
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

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  let prom = new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
  return prom;
}

/**
 * Requesting the picture from specified IP address
 * @param {String}   deviceIp IP address of the NodeMCU
 * @param {Function} callback A callback function that will run when file is generated
 */
const requestPicture = (deviceIp, callback) => {
  console.log(`${deviceIp}/capture`);
  request(`http://${deviceIp}/capture`)
    .pipe(fs.createWriteStream(`asset/file_${deviceIp}.jpg`))
    .on('finish', callback);
}

const readFileUpload = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("File Read Error", error);
      return;
    }

    const file = {
      "fieldname": "file",
      "originalname": "file.jpg",
      "encoding": "7bit",
      "mimetype": 'image/jpeg',
      "buffer": data
    };

    uploadImageToStorage(file).then((success) => {
      console.log("Upload successfully");
    }).catch((error) => {
      console.error(error);
    });
  });
}

// Listen for the 'start' event triggered when the start method has been successfully initiated
camera.on('start', () => {
  console.log('Camera started');
});

// listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, timestamp, filename){ 
	readFileUpload(cameraOptions.output);
});

// mqttServer.on('connection', function (stream) {
//   let client = mqttCon(stream);

//   // client connected 
//   client.on('connect', function (packet) {
//     // acknowledge the connect packet 
//     client.connack({ returnCode: 0 });
//   })

//   // client published 
//   client.on('publish', function (packet) {
//     // send a puback with messageId (for QoS > 0) 
//     client.puback({ messageId: packet.messageId })
//   })

//   // client pinged 
//   client.on('pingreq', function () {
//     // send a pingresp 
//     client.pingresp()
//   });

//   // client subscribed 
//   client.on('subscribe', function (packet) {
//     // send a suback with messageId and granted QoS level 
//     client.suback({ granted: [packet.qos], messageId: packet.messageId })
//   })

//   // timeout idle streams after 5 minutes 
//   stream.setTimeout(1000 * 60 * 5)

//   // connection error handling 
//   client.on('close', function () { client.destroy() })
//   client.on('error', function () { client.destroy() })
//   client.on('disconnect', function () { client.destroy() })

//   // stream timeout 
//   stream.on('timeout', function () { client.destroy(); })
// });