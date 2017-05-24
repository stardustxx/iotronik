const functions = require('firebase-functions');
const admin = require('firebase-admin');

const topicPathNewIncident = 'incident-new';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addIncident = functions.database.ref('/occurrence/{occurrenceId}').onWrite((event) => {
  admin.initializeApp(functions.config().firebase);
  const originalValue = event.data.val();
  console.log("originalValue", originalValue);
  const incidentRef = admin.database().ref('incident');
  const requiredTimeElapsed = 1000 * 60 * 5;
  
  // incidentRef.push().set(originalValue);
  incidentRef.orderByChild('time').limitToLast(1).once('value').then((snapshot) => {
    if (snapshot.val()) {
      // Incident reference list is not empty
      console.log("Snapshot exists: true");
      // Looping through the snapshot iterables, but there should only be 1 due to earlier filtering
      snapshot.forEach((childSnapShot) => {
        console.log("childSnapShot", childSnapShot.val());
        // Checking if the occurrence time and incident time is smaller than pre-set time interval
        // If so then add this occurrence to that incident
        if (originalValue.time - childSnapShot.val().time < requiredTimeElapsed) {
          console.log("Within time: true");
          incidentRef.child(childSnapShot.key).child('data').push().set({
            image: originalValue.image
          });
        } else {
          console.log("Within time: false");
          addNewIncident(incidentRef, originalValue);
        }
      });
    } else {
      // Incident reference list is empty, then just add new incident
      console.log("Snapshot exists: false");
      addNewIncident(incidentRef, originalValue);
    }
  }).catch((error) => {
    console.error("Incident Ref", error);
  });
});

/**
 * Create new incident entry and add data
 * 
 * @param {any} reference     Firebase database reference of incident node
 * @param {any} originalValue Occurrence value
 */
function addNewIncident(reference, originalValue) {
  console.log("addNewIncident ran");
  const newKey = reference.push().key;
  const newIncidentRef = reference.child(newKey);
  newIncidentRef.set({
    time: originalValue.time
  }).then((success) => {
    newIncidentRef.child("data").push().set(originalValue);
    sendNotification();
  });
}

/**
 * Send a push notification
 * 
 */
function sendNotification() {
  const payload = {
    data: {
      "title": "Iotronik"
    },
    "notification": {
      "title": "Iotroink"
    }
  }
  admin.messaging().sendToTopic(topicPathNewIncident, payload).then((response) => {
    console.log("Successfully sent message:", response);
  }).catch((error) => {
    console.error("Error sending message:", error);
  });
}