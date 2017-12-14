import React from 'react';
import PropTypes from 'prop-types';
import { priceFormatter } from './utils/Formatters';

const Card = ({ property, activeProperty, setActiveProperty }) => {
  const { price, address, city, index, bathrooms: numberOfBathrooms, bedrooms: numberOfBedrooms, carSpaces, picture } = property;

  return (
    <div
      id={`card-${index}`}
      className={`card col-sm-12 col-md-6 col-lg-4 ${property === activeProperty ? 'is-active' : ''}`}
      onClick={() => setActiveProperty(property, false)}
    >
      <img src={picture} alt={city} />
      <p className="price">{priceFormatter(price)}</p>
      <div className="details">
        <span className="index">{index + 1}</span>
        <p className="location">
          {city}<br />{address}
        </p>
        <ul className="features">
          <li className="icon-bed">{numberOfBedrooms}<span>bedrooms</span></li>
          <li className="icon-bath">{numberOfBathrooms}<span>bathrooms</span></li>
          <li className="icon-car">{carSpaces}<span>parking spots</span></li>
        </ul>
      </div>
    </div>
  );
};


Card.PropTypes = {
  property: PropTypes.object.isRequried,
  activeProperty: PropTypes.object.isRequried,
  setActiveProperty: PropTypes.func.isRequried,
};

export default Card;
