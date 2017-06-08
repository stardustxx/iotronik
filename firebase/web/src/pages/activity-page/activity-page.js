import React, { Component } from 'react';
import ActivityList from './activity-list/activity-list';
import BottomNav from '../../modules/bottom-nav/bottom-nav';
import SideNav from '../../modules/side-nav/side-nav';
import './activity-page.css';

class ActivityPage extends Component {

  render() {
    return (
      <div id='activity-page'>
        <SideNav history={this.props.history} />
        <ActivityList />
        <BottomNav history={this.props.history} />
      </div>
    );
  }
}

export default ActivityPage;