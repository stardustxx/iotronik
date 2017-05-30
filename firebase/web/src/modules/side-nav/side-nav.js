import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class SideNav extends Component {

  constructor(props) {
    super(props);

    if (this.props.hasOwnProperty("open")) {
      this.state = {
        open: this.props.open
      };
    } else {
      this.state = {
        open: true
      };
    }
  }

  componentDidMount() {
    window.addEventListener('resize', (event) => {
      if (window.innerWidth < 768) {
        this.toggleSideNav(false);
      } else {
        this.toggleSideNav(true);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  toggleSideNav = (open) => {
    this.setState({
      open: open
    });
  }

  render() {
    return (
      <div>
        <Drawer open={this.state.open}>
          <MenuItem>Incidents</MenuItem>
          <MenuItem>Activities</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default SideNav;