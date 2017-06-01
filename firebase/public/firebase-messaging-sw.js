// Give the service worker access to Firebase Messaging. Note that you can only
// use Firebase Messaging here, other Firebase libraries are not available in
// the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAjnBilwCxY6qguPOn2poyRgcKRQwwFprw",
  authDomain: "iotroniks.firebaseapp.com",
  databaseURL: "https://iotroniks.firebaseio.com",
  projectId: "iotroniks",
  storageBucket: "iotroniks.appspot.com",
  messagingSenderId: "512273627061"
};

firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/capstone-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});