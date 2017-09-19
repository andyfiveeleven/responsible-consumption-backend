import React from 'react';
import * as util from '../../lib/util.js'

class RatingItem extends React.Component {
  constructor(props){
    super(props);

    this.checked = this.props.checked;
    this.className = this.props.className;
    this.onChange = this.props.onChange;
    this.value= this.props.value
    this.name= this.props.name
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
