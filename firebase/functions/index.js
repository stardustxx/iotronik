var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addIncident = functions.database.ref('/occurrence/{occurrenceId}').onWrite((event) => {
  const originalValue = event.data.val();
  console.log("originalValue", originalValue);
  const incidentRef = event.data.adminRef.root.child('incident');
  const requiredTimeElapsed = 1000 * 60 * 5;
  
  // incidentRef.push().set(originalValue);
  incidentRef.orderByChild('time').limitToLast(1).once('value').then((snapshot) => {
    if (snapshot.val()) {
      console.log("Snapshot exists: true");
      snapshot.forEach((childSnapShot) => {
        console.log("childSnapShot", childSnapShot.val());
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
  });
}