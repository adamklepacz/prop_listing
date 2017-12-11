import React from 'react';
import data from './data/Data';
import Card from './Card';
import Header from './Header';
import GoogleMap from './GoogleMap';
import jump from 'jump.js';
import easeInOutCubic from './utils/Easing';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      properties: data.properties,
      activeProperty: data.properties[5],
      filterIsVisible: false,
			filterBedrooms: 'any',
			filterBathrooms: 'any',
			filterCars: 'any',
      filteredProperties: [],
      isFiltering: false
    }

    this.setActiveProperty = this.setActiveProperty.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
		this.filterProperties = this.filterProperties.bind(this);
		this.clearFilter = this.clearFilter.bind(this);
  }

  handleFilterChange(e) {
    const target = e.target;
    const {value, name} = target;
    console.log(value,name);

    this.setState({
      [name]: value
    }, () => {
      this.filterProperties();
    })
	}
	
	clearFilter(e, form) {
		e.preventDefault();

		this.setState({
			filterBathrooms: 'any', 
			filterBedrooms: 'any',
			filterCars: 'any',
			isFiltering: !this.state.isFiltering,
			activeProperty: this.state.properties[0]
		})

		form.reset();
	}

  filterProperties() {
    const {properties, filterBedrooms, filterBathrooms, filterCars} = this.state;
    const isFiltering = filterBedrooms !== 'any' || filterBathrooms !== 'any' || filterCars !== 'any';
    
    const getFilteredProperties = (properties) => {
			const filteredProperties = [];
			
   		properties.map(property => {
				const { bedrooms, bathrooms, carSpaces	} = property; //get count of bathroom, bedrooms etc.
				const match = 
					(bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any') &&
					(bathrooms === parseInt(filterBathrooms) || filterBathrooms === 'any') &&
					(carSpaces === parseInt(filterCars) || filterCars === 'any');

				//if bedrooms count in current property equals filterBedroom count from select
				//dropdown then add current property to filteredProperties array
				match && filteredProperties.push(property);
			 });

			 return filteredProperties;
  	}

		this.setState({
			filteredProperties: getFilteredProperties(properties),
			activeProperty: getFilteredProperties(properties)[0],
			isFiltering
		})
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
    const {properties, activeProperty, filterIsVisible, filteredProperties, isFiltering} = this.state;
		const propertiesList = isFiltering ? filteredProperties : properties;

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">

          {/* Header - Start - add .filter-is-visible to show filter*/}
            <Header
              filterIsVisible={filterIsVisible}
              toggleFilter={this.toggleFilter}
							handleFilterChange={this.handleFilterChange}
							clearFilter={this.clearFilter}
            />
          {/* Header - End */}

          <div className="cards container">
            <div className="cards-list row ">

              {
                propertiesList.map(property => {
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
					filteredProperties={filteredProperties}
					isFiltering={isFiltering}
        />
        {/* mapContainer - End */}
      </div>
    )
  }
}

export default App;
