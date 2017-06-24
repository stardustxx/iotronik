import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from 'material-ui/Snackbar';

import BottomNav from "../../modules/bottom-nav/bottom-nav";
import SideNav from "../../modules/side-nav/side-nav";
import Helpers from "../../helpers";
import * as firebase from "firebase";
import "./contact-page.css";

class ContactPage extends Component {

  style = {
    "marginTop": 12,
    "marginBottom": 12,
    "float": "right"
  };

  constructor() {
    super();

    this.state = {
      "contactInfoName": "",
      "contactInfoEmail": "",
      "contactInfoContent": "",
      "contactNameError": "",
      "contactEmailError": "",
      "contactContentError": "",
      "snackBarOpen": false
    };
  }

  onSubmitClick = () => {
    let validatedSuccuess = true;

    if (!this.state.contactInfoName) {
      validatedSuccuess = false;
      this.setState({
        contactNameError: "Name is required"
      });
    } else {
      this.setState({
        contactNameError: ""
      });
    }

    if (!this.state.contactInfoEmail) {
      validatedSuccuess = false;
      this.setState({
        contactEmailError: "Email is required"
      });
    } else if (!Helpers.isEmail(this.state.contactInfoEmail)) {
      validatedSuccuess = false;
      this.setState({
        contactEmailError: "Email format is incorrect"
      });
    } else {
      this.setState({
        contactEmailError: ""
      });
    }

    if (!this.state.contactInfoContent) {
      validatedSuccuess = false;
      this.setState({
        contactContentError: "Please fill in your question"
      });
    } else {
      this.setState({
        contactContentError: ""
      });
    }

    if (validatedSuccuess) {
      firebase.database().ref("contact").push({
        "Name": this.state.contactInfoName,
        "Email": this.state.contactInfoEmail,
        "Question": this.state.contactInfoContent
      }).then((value) => {
        this.setState({
          contactInfoName: "",
          contactInfoEmail: "",
          contactInfoContent: "",
          snackBarOpen: true
        });
      }).catch(error => {
        console.error("Firebase Error", error);
      })
    }
  }

  updateInfoName = (event, newValue) => {
    this.setState({
      contactInfoName: newValue
    });
  }

  updateInfoEmail = (event, newValue) => {
    this.setState({
      contactInfoEmail: newValue
    });
  }

  updateInfoContent = (event, newValue) => {
    this.setState({
      contactInfoContent: newValue
    });
  }

  handleSnackBarClose = () => {
    this.setState({
      snackBarOpen: false
    });
  }

  render() {
    return (
      <div id="contact-page">
        <SideNav history={this.props.history} />
        <div className="main-content">
          <h2>Contact Us</h2>
          <div />
          <TextField floatingLabelText="Name" value={this.state.contactInfoName} onChange={this.updateInfoName} errorText={this.state.contactNameError} /><br />
          <TextField floatingLabelText="Email" value={this.state.contactInfoEmail} onChange={this.updateInfoEmail} errorText={this.state.contactEmailError} /><br />
          <TextField floatingLabelText="Question" multiLine={true} rows={5} value={this.state.contactInfoContent} onChange={this.updateInfoContent} errorText={this.state.contactContentError} />
          <br />
          <RaisedButton label="Submit" primary={true} style={this.style} onClick={this.onSubmitClick} />
        </div>
        <Snackbar
          open={this.state.snackBarOpen}
          message="We have received your question, thank you!"
          autoHideDuration={3000}
          onRequestClose={this.handleSnackBarClose}
        />
        <BottomNav history={this.props.history} />
      </div>
    );
  }
}

export default ContactPage;
