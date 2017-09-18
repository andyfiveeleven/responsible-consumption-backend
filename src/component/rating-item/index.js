import React from 'react';
import * as util from '../../lib/util.js'

class RatingItem extends React.Component {
  constructor(props){
    super(props);

    this.checked = checked;
    this.className = className;
    this.onChange =onChange;
    this.value=value
    this.name=name
  }

  render(){
    return(
      <label className={`rating__item ${colored ? 'rating__item--selected' : ''}`}>
        <input
          name={name}
          checked={checked}
          className='rating__input'
          onChange={(e) => onChange(value)}
          type="radio"
          value={value}
        />
      </label>
    )
  }
}

export default RatingItem
