import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./google-map.css";

class GoogleMap extends Component {
  static defaultProps = {
    center: { lat: 49.1894979, lng: -122.8500378 },
    zoom: 12
  };

  constructor(props) {
    super(props);
  }

  renderMarkers = map => {
    let marker = new map.maps.Marker({
      position: this.props.center,
      map: map.map,
      title: "Your Vehicle"
    });
  };

  render() {
    return (
      <div id="google-map">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={map => this.renderMarkers(map)}
        />
      </div>
    );
  }
}

export default GoogleMap;
