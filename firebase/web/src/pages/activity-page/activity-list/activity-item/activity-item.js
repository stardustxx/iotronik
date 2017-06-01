import React, { Component } from 'react';
import {GridTile} from 'material-ui/GridList';
import * as firebase from 'firebase';
// import './activity.item.css';


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
  }

  componentDidMount() {
    const firebaseStorage = firebase.storage();
    firebaseStorage.refFromURL(`gs://iotroniks.appspot.com/${this.props.image}`).getDownloadURL().then(url => {
      this.setState({
        image: url
      });
    }).catch(error => {
      console.error("Firebase storage error code", error.code);
      console.error("Firebase storage error message", error.message);
    });
  }

  render() {
    return (
      <div>
        <GridTile
          title={this.props.date}
        >
          <img src={this.state.image} style={this.imageStyle} />
        </GridTile>
      </div>
    );
  }
}

export default ActivityItem;