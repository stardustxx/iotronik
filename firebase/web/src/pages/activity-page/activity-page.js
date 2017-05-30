import React, { Component } from 'react';
import ActivityList from './activity-list/activity-list';
import BottomNav from '../../modules/bottom-nav/bottom-nav';
import SideNav from '../../modules/side-nav/side-nav';
import './activity-page.css';

class ActivityPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        open: false
      });
    }, 2000);
  }

  render() {
    return (
      <div id='activity-page'>
        <SideNav open={this.state.open} />
        <ActivityList />
        <BottomNav history={this.props.history} />
      </div>
    );
  }
}

export default ActivityPage;