import React, {Component} from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import * as firebase from 'firebase';

import IncidentItem from './incident-item/incident-item';

class IncidentList extends Component {
  constructor() {
    super();

    this.state = {
      "occurrenceList": []
    };
  }

  componentDidMount() {
    firebase.database().ref('occurrence').on('value', snapshot => {
      this.updateActivityList(snapshot.val());
    });
  }

  updateActivityList = (occurrenceData) => {
    let occurrenceList = [];
    for (let refKey in occurrenceData) {
      let obj = occurrenceData[refKey];
      obj["refKey"] = refKey;
      obj.time = Date(obj.time);
      occurrenceList.push(obj);
    }
    this.setState({
      "occurrenceList": occurrenceList
    });
  }

  render() {
    return (
      <div id="incident-list">
        <List>
          <Subheader>Incident List</Subheader>
          {
            this.state.occurrenceList.reverse().map((value, index, array) => {
              return (
                <div key={value.refKey}>
                  <IncidentItem date={value.time} image={value.image} />
                  {array.length - 1 > index ? <Divider /> : null}
                </div>
              )
            })
          }
        </List>
      </div>
    );
  }
}

export default IncidentList;