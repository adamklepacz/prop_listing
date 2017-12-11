import React from 'react';
import PropTypes from 'prop-types';
import image from '../images/house-location-pin.svg';
import Filter from './Filter.js';

const Header = ({filterIsVisible, toggleFilter, handleFilterChange, clearFilter}) => {
  return (
    <header className={`${filterIsVisible ? 'filter-is-visible' : ''}`}>

      {/* Filter - Start */}
      <Filter
        toggleFilter={toggleFilter}
        handleFilterChange={handleFilterChange}
        clearFilter={clearFilter}
      />
      {/* Filter - End */}

      <img src={image} />
      <h1>Property Listings</h1>
      <button className="btn-filter" onClick={(e) => toggleFilter(e)}>Filter</button>
    </header>
  )
}

Header.PropTypes = {
  filterIsVisible: PropTypes.bool.isRequried,
  toggleFilter: PropTypes.func.isRequried,
  clearFilter: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired
}

export default Header;
