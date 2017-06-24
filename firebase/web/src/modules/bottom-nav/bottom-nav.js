import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import './bottom-nav.css';
import '../../Global.css';

class BottomNav extends Component {

  recentsIcon = <FontIcon className="material-icons">Incidents</FontIcon>;
  favoritesIcon = <FontIcon className="material-icons">Activity</FontIcon>;
  nearbyIcon = <IconLocationOn />;  

  constructor(props) {
    super(props);
    
    this.state = {
      selectedIndex: 0
    };
  }

  componentDidMount() {
    if (this.props.history) {
      this.checkRoute(this.props.history.location.pathname);
    }
  }

  checkRoute = (pathName) => {
    switch (pathName) {
      case '/':
        this.selectIndex(0);
        break;
      case '/activity':
        this.selectIndex(1);
        break;
      case '/contact':
        this.selectIndex(1);
        break;
      default:
        this.selectIndex(0);
    }
  }

  select = (index) => {
    this.selectIndex(index);

    if (this.props.history) {
      switch (index) {
        case 0:
          this.goToRoute('/');
          break;
        case 1:
          this.goToRoute('/contact');
          break;
        case 2:
          this.goToRoute('/activity');
          break;
        default:
          this.goToRoute('/');
      }
    }
  }

  selectIndex = (index) => {
    this.setState({
      selectedIndex: index
    });
  }

  goToRoute = (pathName) => {
    this.props.history.push(pathName);
  }

  render() {
    return (
      <div id = 'bottom-nav'>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Incidents"
              icon={this.recentsIcon}
              onTouchTap={() => this.select(0)}
            />
            {
              // <BottomNavigationItem
              //   label="Activities"
              //   icon={this.favoritesIcon}
              //   onTouchTap={() => this.select(1)}
              // />
            }
            <BottomNavigationItem
              label="Contact"
              icon={this.nearbyIcon}
              onTouchTap={() => this.select(1)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default BottomNav;