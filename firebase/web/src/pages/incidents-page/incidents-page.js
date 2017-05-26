import React, { Component } from 'react';
import IncidentList from './incident-list/incident-list';

class IncidentsPage extends Component {

  constructor() {
    super();
  }

  comopnentDidLoad() {
    console.log("Incidents page did load");
  }

  render() {
    return (
      <div>
        <IncidentList></IncidentList>
      </div>
    );
  }
}

export default IncidentsPage;