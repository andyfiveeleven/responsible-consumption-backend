import React from 'react'
import * as util from '../../lib/util.js'
import RatingRadio from '../../rating-radio'

class expReviewForm extends React.Component {
  constructor(props){
    super(props)

    this.state = props.expReview
      ? props.photo
      : {edibleName: '', lastMeal: 1, dayDescription: '', reaction: 3, edibleThc: 3}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name} = e.target

    if(name == 'edibleName'){
      this.setState({edibleName:e.target.value})
    }

    if(name == 'lastMeal'){
      this.setState({lastMeal:e.target.value})
    }

    if(name == 'dayDescription'){
      this.setState({dayDescription:e.target.value})
    }

    if(name == 'reaction'){
      this.setState({reaction:e.target.value})
    }

    if(name == 'edibleThc'){
      this.setState({edibleThc:e.target.value})
    }
  }

  handleSubmit(e){
    e.preventDefault()
    return this.props.onComplete(this.state)
    .then(() => {
      if(!thisprops.expReview){
        this.setState({edibleName: '', lastMeal: 1, dayDescription: '', reaction: 3, edibleThc: 3})
      }
    })
  }

  render(){
    return (
      <form
        className='exp-review-form'
        onSubmit={this.handleSubmit}>

        <div className='exp-review-text-box'>
          <h2>What is the name of your edible?</h2>
          <input
            name='edibleName'
            type='text'
            value={this.state.edibleName}
            onChange={this.handleChange} />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How much food have you eaten in the past 3 hours?</h2>
          <RatingRadio
            name='lastMeal'
            low='no food'
            high='large meal'
            onChange={this.handleChange}
            value={this.state.lastMeal}
          />
        </div>

        <div className='exp-review-text-box'>
          <h2>Describe your experience</h2>
          <input
            name='dayDescription'
            type='text'
            value={this.state.dayDescription}
            onChange={this.handleChange} />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How would you rate your experience?</h2>
          <RatingRadio
            name='reaction'
            onChange={this.handleChange}
            value={this.state.reaction}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How much thc does your edible contain?</h2>
          <RatingRadio
            low='under 2.5'
            high='above 10'
            name='edibleThc'
            onChange={this.handleChange}
            value={this.state.reaction}
          />
        </div>

        <button type='submit'> {this.props.buttonText} </button>
      </form>
    )
  }
}
export default expReviewForm
