import React, { Component } from 'react';
import ActivityList from './activity-list/activity-list';
import BottomNav from '../../modules/bottom-nav/bottom-nav';
import './activity-page.css';

class ActivityPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='activity-page'>
        <ActivityList />
        <BottomNav history={this.props.history} />
      </div>
    );
  }
}

export default ActivityPage;