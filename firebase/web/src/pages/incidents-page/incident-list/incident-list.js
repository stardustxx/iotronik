import React, {Component} from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import * as firebase from 'firebase';

import IncidentItem from './incident-item/incident-item';

class IncidentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "showSubHeader": "showSubHeader" in this.props ? this.props.showSubHeader : true,
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
      obj.time = (new Date(obj.time)).toString();
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
          {
            this.state.showSubHeader ? <Subheader>Incident List</Subheader> : null
          }
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