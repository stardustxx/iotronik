import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import Constants from './Constants';

// Importing pages
import IncidentsPage from './pages/incidents-page/incidents-page';
import ActivityPage from './pages/activity-page/activity-page';

// Importing modules
import TestUpload from './modules/test-upload/test-upload';

class App extends Component {

  config = null;

  firebaseAuthData = {
    'email': 'iotronik-web@gmail.com',
    'password': 'iotronik'
  };

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
    this.setUpFirebaseAuth();
    this.setUpFirebaseMessaging();
  }

  setUpFirebaseAuth = () => {
    const firebaseAuth = firebase.auth();
    firebaseAuth.signInWithEmailAndPassword(this.firebaseAuthData.email, this.firebaseAuthData.password).catch((error) => {
      console.error("Auth error code.", error.code);
      console.error("Auth error message.", error.message);
    });
  }

  setUpFirebaseMessaging = () => {
    const firebaseMessaging = firebase.messaging();
    firebaseMessaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
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
      // console.log(result);
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title='IOTronik'/>
            <TestUpload />
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={IncidentsPage}/>
                <Route exact path='/activity' component={ActivityPage}/>
              </Switch>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
