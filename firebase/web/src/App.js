import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TestUpload from './test-upload.component/test-upload.component';
import * as firebase from 'firebase';
import Constants from './Constants';

class App extends Component {

  config = null;

  constructor() {
    super();
    injectTapEventPlugin();

    // Initialize Firebase
    this.config = {
      apiKey: "AIzaSyAjnBilwCxY6qguPOn2poyRgcKRQwwFprw",
      authDomain: "iotroniks.firebaseapp.com",
      databaseURL: "https://iotroniks.firebaseio.com",
      projectId: "iotroniks",
      storageBucket: "iotroniks.appspot.com",
      messagingSenderId: "512273627061"
    };
    firebase.initializeApp(this.config);
  }

  componentDidMount() {
    const firebaseMessaging = firebase.messaging();
    firebaseMessaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM. ...
        return firebaseMessaging.getToken();
      })
      .then((token) => {
        console.log("Token received");
        this.subscribeToTopic(token, 'incident-new');
      })
      .catch(function (err) {
        console.error("Firebase Message Error.", err);
      });

    firebaseMessaging.onMessage(payload => {
      console.log("Message received:.", payload);
    });
  }

  subscribeToTopic = (token, topicName) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `key=${Constants.FirebaseMessageServerKey}`
    });

    let init = {
      method: 'POST',
      cache: 'default',
      headers: headers,
      mode: 'cors'
    };

    fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topicName}`, init).then((response) => {
      return response;
    }).then((result) => {
      console.log(result);
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title='IOTronik'/>
        </MuiThemeProvider>
        <TestUpload/>
      </div>
    );
  }
}

export default App;
