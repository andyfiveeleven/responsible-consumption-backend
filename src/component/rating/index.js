import React from 'react'
import RatingItem from '../rating-item'
import * as util from '../../lib/util.js'

class Rating extends React.Component{
  constructor(props){
    super(props)

    this.name = this.props.name;
    this.low = this.props.low;
    this.high = this.propshigh;
    this.label1= this.props.label1;
    this.label2= this.props.label2;
    this.label3= this.props.label3;
    this.label4= this.props.label4;
    this.label5= this.props.label5;
    this.min = this.props.min;
    this.max = this.props.max;
    this.onChange = this.props.onChange;
    this.value= this.props.value;
  }

  render(){
    return (
      <div className='rating'>
        <span>{low}</span>
            <span>{label1}</span>
            <RatingItem
              name={name}
              colored={value >= 1}
              checked={value === 1}
              value={1}
              onChange={onChange}
            />
            <span>{label2}</span>
            <RatingItem
              name={name}
              colored={value >= 2}
              checked={value === 2}
              value={2}
              onChange={onChange}
            />
            <span>{label3}</span>
            <RatingItem
              name={name}
              colored={value >= 3}
              checked={value === 3}
              value={3}
              onChange={onChange}
            />
            <span>{label4}</span>
            <RatingItem
              name={name}
              colored={value >= 4}
              checked={value === 4}
              value={4}
              onChange={onChange}
            />
            <span>{label5}</span>
            <RatingItem
              name={name}
              colored={value >= 5}
              checked={value === 5}
              value={5}
              onChange={onChange}
            />
        <span>{high}</span>
      </div>
    )
  }
}

export default Rating
