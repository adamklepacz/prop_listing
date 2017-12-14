import React from 'react';
import PropTypes from 'prop-types';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
    };
  }

  componentDidMount() {
    const { properties, activeProperty } = this.props;
    const { latitude, longitude } = activeProperty;

    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: latitude, lng: longitude },
      mapTypeControl: false,
      zoom: 15,
    });

    this.createMarkers(properties);
  }

  componentWillReceiveProps(nextProps) {
    const { activeProperty, filteredProperties, isFiltering } = nextProps;
    const { index } = activeProperty;

    if (isFiltering && filteredProperties.length === 0) {
      this.hideAllIW();
    } else {
      this.hideAllIW();
      // show info of a new active property
      this.showIW(index);
    }
  }

  componentDidUpdate() {
    const { filteredProperties, isFiltering } = this.props;
    const { markers } = this.state;

    markers.forEach((marker) => {
      const { property } = marker; // what is the associated property

      if (isFiltering) {
        // show markers of filtered properties and hide all the other markers
        if (filteredProperties.includes(property)) {
          markers[property.index].setVisible(true);
        } else {
          // hide all other markes
          markers[property.index].setVisible(false);
        }
      } else {
        // show other markers
        markers[property.index].setVisible(true);
      }
    });
  }

  showIW(index) {
    const { markers } = this.state;

    markers[index] && markers[index].iw.open(this.map, markers[index]);
  }

  hideAllIW() {
    const { markers } = this.state;

    markers.forEach((marker) => {
      marker.iw.close();
    });
  }

  createMarkers(properties) {
    const { setActiveProperty, activeProperty } = this.props;
    const activePropertyIndex = activeProperty.index;
    const { markers } = this.state;

    properties.map((property) => {
      const { latitude, longitude, index, address } = property;

      // create a new marker
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        label: {
          color: '#fff',
          text: `${index + 1}`,
        },
        icon: {
          url: 'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png',
          size: new google.maps.Size(22, 55),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, -15),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(11, 52),
        },
        property,
      });

      // create info window for every marker
      const iw = new google.maps.InfoWindow({
        content: `<h1>${address}</h1>`,
      });

      this.marker.iw = iw;

      this.marker.addListener('click', () => {

        // close all the info window poupups
        this.hideAllIW();

        // set active property into the state
        setActiveProperty(property, true);
      }.bind(this));

      // push this marker to markers array on the state
      markers.push(this.marker);

      // open info window for active Property
      this.showIW(activePropertyIndex);

      return property;
    });
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map" ref="map" />
      </div>
    );
  }
}

GoogleMap.propTypes = {
  properties: PropTypes.array.isRequried,
  setActiveProperty: PropTypes.func.isRequried,
  activeProperty: PropTypes.object.isRequired,
  filteredProperties: PropTypes.array,
  isFiltering: PropTypes.bool.isRequired,
}

export default GoogleMap;
