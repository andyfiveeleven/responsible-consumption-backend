import React from 'react';

const RatingItem  = ({ checked, colored, onChange, value }) => (
  <label className={`rating__item ${colored ? 'rating__item--selected' : ''}`}>
    <input
      checked={checked}
      className='rating__input'
      onChange={(e) => onChange(value)}
      type="radio"
      value={value}
    />
  </label>
)

export default RatingItem
