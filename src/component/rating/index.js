import './_rating.scss'
import RatingItem from '../rating-item/index';
import React from 'react';

class Rating extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='rating'>
          <span>{this.props.low}</span>
              <span>{this.props.label1}</span>
              <RatingItem
                name={this.props.name}
                colored={this.props.value >= 1}
                checked={this.props.value === 1}
                value={1}
                onChange={this.props.onChange}
              />
            <span>{this.props.label2}</span>
              <RatingItem
                name={this.props.name}
                colored={this.props.value >= 2}
                checked={this.props.value === 2}
                value={2}
                onChange={this.props.onChange}
              />
            <span>{this.props.label3}</span>
              <RatingItem
                name={this.props.name}
                colored={this.props.value >= 3}
                checked={this.props.value === 3}
                value={3}
                onChange={this.props.onChange}
              />
            <span>{this.props.label4}</span>
              <RatingItem
                name={this.props.name}
                colored={this.props.value >= 4}
                checked={this.props.value === 4}
                value={4}
                onChange={this.props.onChange}
              />
            <span>{this.props.label5}</span>
              <RatingItem
                name={this.props.name}
                colored={this.props.value >= 5}
                checked={this.props.value === 5}
                value={5}
                onChange={this.props.onChange}
              />
            <span>{this.props.high}</span>
        </div>
    )
  }
}

export default Rating
