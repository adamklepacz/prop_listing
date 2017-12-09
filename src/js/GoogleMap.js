import React from 'react';
import PropTypes from 'prop-types';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map"></div>
      </div>
    )
  }
}

GoogleMap.PropTypes = {
  properties: PropTypes.array.isRequried
}

export default GoogleMap;
