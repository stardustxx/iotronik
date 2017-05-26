import React, {Component} from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import IncidentItem from './incident-item/incident-item';

class IncidentList extends Component {
  render() {
    return (
      <div>
        <List>
          <Subheader>Incident List</Subheader>
          <IncidentItem></IncidentItem>
        </List>
      </div>
    );
  }
}

export default IncidentList;