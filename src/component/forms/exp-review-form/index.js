import React from 'react'
import * as util from '../../../lib/util.js'
import Rating from '../../rating'

class ExpReviewForm extends React.Component {
  constructor(props){
    super(props)

    this.state = props.expReview
      ? props.expReview
      : {edibleName: '', lastMeal: 0, dayDescription: '', reaction: 0, edibleThc: 0}

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
      this.setState({edibleName: '', lastMeal: 1, dayDescription: '', reaction: 3, edibleThc: 3})
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
          <Rating
            name='lastMeal'
            min={1}
            max={5}
            low='no food'
            high='large meal'
            onChange={(lastMeal) => this.setState({lastMeal})}
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
          <Rating
            name='reaction'
            low='poor'
            high='excellent'
            min={1}
            max={5}
            onChange={(reaction) => this.setState({reaction})}
            value={this.state.reaction}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How much thc does your edible contain?</h2>
          <Rating
            name='edibleThc'
            min={1}
            max={5}
            label1='2.5mg'
            label2='5mg'
            label3='7.5mg'
            label4='10mg'
            label5='more than 10mg'
            onChange={(edibleThc) => this.setState({edibleThc})}
            value={this.state.edibleThc}
          />
        </div>

        <button type='submit'> {this.props.buttonText} </button>
      </form>
    )
  }
}

export default ExpReviewForm
