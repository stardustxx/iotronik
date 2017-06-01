import React, { Component } from 'react';
import IncidentList from './incident-list/incident-list';
import BottomNav from '../../modules/bottom-nav/bottom-nav';
import SideNav from '../../modules/side-nav/side-nav';

import './incidents-page.css';

class IncidentsPage extends Component {

  constructor(props) {
    super(props);
  }

  comopnentDidLoad() {
    
  }

  render() {
    return (
      <div id='incidents-page'>
        <SideNav history={this.props.history} />
        <IncidentList></IncidentList>
        <BottomNav history={this.props.history} />
      </div>
    );
  }
}

export default IncidentsPage;