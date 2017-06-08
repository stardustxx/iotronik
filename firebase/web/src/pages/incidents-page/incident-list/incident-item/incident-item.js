import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import * as firebase from 'firebase';

/*
  Properties:
  date (String):  Time of occurrence
  image (String): Name of the occurrence image in Firebase Storage bucket
*/
class IncidentItem extends Component {

  imageStyle = {
    "height": "100%",
    "width": "100%",
    "maxHeight": "450px",
    "maxWidth": "450px"
  };

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      image: null
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const firebaseStorage = firebase.storage();
    firebaseStorage.refFromURL(`gs://iotroniks.appspot.com/${this.props.image}`).getDownloadURL().then(url => {
      if (this._isMounted) {
        this.setState({
          image: url
        });
      }
    }).catch(error => {
      console.error("Firebase storage error code", error.code);
      console.error("Firebase storage error message", error.message);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <ListItem
          primaryText={this.props.date}
          secondaryText={
            <img className="activity-item-image" src={this.state.image} alt="" style={this.imageStyle} />
          }
        />
      </div>
    );
  }
}

export default IncidentItem;