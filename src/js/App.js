import React from 'react';
import data from './data/Data.js';
import Card from './Card.js';
import Header from './Header.js';
import GoogleMap from './GoogleMap.js';
import jump from 'jump.js';
import easeInOutCubic from './utils/Easing.js';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      properties: data.properties,
      activeProperty: data.properties[5],
      filterIsVisible: false
    }

    this.setActiveProperty = this.setActiveProperty.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(e) {
    e.preventDefault();
    console.log(this);

    this.setState({
      filterIsVisible: !this.state.filterIsVisible
    })

  }

  setActiveProperty(property, scroll) {
    const {index} = property;

    this.setState({
      activeProperty: property
    })

    //if clicked on marker scroll to item
    //if clicked on a right side list do not scroll
    if(scroll) {
      //scroll to the right property
      const target = `#card-${index}`
      jump(target, {
        duration: 1000,
        offset: 0,
        callback: undefined,
        easing: easeInOutCubic,
        a11y: false
      })
    }
  }

  render(){
    const {properties, activeProperty, filterIsVisible} = this.state;

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">

          {/* Header - Start - add .filter-is-visible to show filter*/}
            <Header
              filterIsVisible={filterIsVisible}
              toggleFilter={this.toggleFilter}
            />
          {/* Header - End */}

          <div className="cards container">
            <div className="cards-list row ">

              {
                properties.map(property => {
                  return <Card
                    key={property._id}
                    property={property}
                    activeProperty={activeProperty}
                    setActiveProperty={this.setActiveProperty}
                  />
                })
              }
            </div>
          </div>
        </div>
        {/* listings - End */}

        {/* mapContainer - Start */}
        <GoogleMap
          properties={properties}
          activeProperty={activeProperty}
          setActiveProperty={this.setActiveProperty}
        />
        {/* mapContainer - End */}
      </div>
    )
  }
}

export default App;
