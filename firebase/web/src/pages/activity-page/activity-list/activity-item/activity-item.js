import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import * as firebase from 'firebase';
// import './activity.item.css';

/*
  Properties:
  date (String):  Time of occurrence
  image (String): Name of the occurrence image in Firebase Storage bucket
*/
class ActivityItem extends Component {

  imageStyle = {
    "height": "100%",
    "width": "100%",
    "maxHeight": "450px",
    "maxWidth": "450px"
  };

  constructor(props) {
    super(props);

    this.state = {
      image: null
    };

    const firebaseStorage = firebase.storage();
    firebaseStorage.ref(this.props.image).getDownloadURL().then(url => {
      this.setState({
        image: url
      });
    });
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

export default ActivityItem;