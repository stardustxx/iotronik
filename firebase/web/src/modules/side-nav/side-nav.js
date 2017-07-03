import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import './side-nav.css';

class SideNav extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if ("open" in this.props) {
      this.setState({
        open: this.props.open
      });
    } else {
      this.checkWindowSize();
      window.addEventListener('resize', this.checkWindowSize);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
  }

  componentWillReceiveProps(nextProps) {
    console.log("side-nav updating", nextProps);
    if ("open" in nextProps) {
      this.setState({
        open: nextProps.open
      });
    }
  }

  checkWindowSize = () => {
    if (!this.state.hasOwnProperty('open')) {
      this.initializeState();
    }
    if (this.isMobile()) {
      this.toggleSideNav(false);
    } else {
      this.toggleSideNav(true);
    }
  }

  initializeState = () => {
    if (this.isMobile()) {
      this.state = {
        open: false
      };
    } else {
      this.state = {
        open: true
      };
    }
  }

  isMobile = () => {
    return window.innerWidth < 768;
  }

  toggleSideNav = (open) => {
    this.setState({
      open: open
    });
  }

  onMenuItemClicked = (pathName) => {
    this.props.history.push(pathName);
  }

  render() {
    return (
      <div id='side-nav'>
        <Drawer open={this.state.open}>
          <MenuItem onClick={() => {
            this.onMenuItemClicked('/');
          }}>Incidents</MenuItem>
          <MenuItem onClick={() => {
            this.onMenuItemClicked('/contact');
          }}>Contact</MenuItem>
          {
            // <MenuItem onClick={() => {
            //   this.onMenuItemClicked('/activity');
            // }}>Activities</MenuItem>
          }
        </Drawer>
      </div>
    );
  }
}

export default SideNav;