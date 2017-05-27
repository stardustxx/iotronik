import React, { Component } from 'react';
import IncidentList from './incident-list/incident-list';
import BottomNav from '../../modules/bottom-nav/bottom-nav';

class IncidentsPage extends Component {

  constructor(props) {
    super(props);
  }

  comopnentDidLoad() {
    console.log("Incidents page did load");
  }

  render() {
    return (
      <div>
        <IncidentList></IncidentList>
        <BottomNav history={this.props.history} />
      </div>
    );
  }
}

export default IncidentsPage;