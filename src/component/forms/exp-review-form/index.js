import React from 'react'
import * as util from '../../../lib/util.js'
import Rating from '../../rating'
import debounce from 'lodash/fp/debounce'
import superagent from 'superagent'
class ExpReviewForm extends React.Component {
  constructor(props){
    super(props)

    this.state =
      {edibleName: props.expReview ? props.expReview.edibleName : '',
        lastMeal: props.expReview ? props.expReview.lastMeal : 0,
        description: props.expReview ? props.expReview.description : '',
        reaction: props.expReview ? props.expReview.reaction : 0,
        edibleThc: props.expReview ? props.expReview.edibleThc : 0,
        dosage: props.expReview ? props.expReview.dosage : 0,
        selected: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Cannabis_leaf.svg',
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this)
    this.edibleDoesExist = debounce(50)(this.edibleDoesExist.bind(this))
  }

  handleChange(e){
    e.preventDefault()
    let {name, value} = e.target

    if(name === 'edibleSearch'){
        // this.edibleDoesExist(value)
    }

    if(name === 'edibleSelect'){
      let selected = this.state.edibleList.filter(edible => {
        return edible.name === value;
      })
      this.setState({
        selected: selected,
        edibleExists: false
      })
    }

    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('STATESHIT',this.state);
    return this.props.onComplete(this.state)
    .then(() => {
      this.setState({edibleName: '', lastMeal: 0, dayDescription: '', reaction: 0, edibleThc: 0})
    })
  }

  edibleDoesExist(edibleSearch){
    return superagent.get(`${API_URL}/api/edible/search/${edibleSearch}`)
    .then((err, res) => {
      if(err) console.error(err);
      let edibleList = res.body;
      this.setState({edibleExists: true, edibleList: edibleList})

      console.log(this.state);

      console.log('edibleList',edibleList);
      return edibleList;
    })
  }

  handleClickOptions(e) {
    let options = []
    console.log('edibleList222222222222', this.state);
    this.state.edibleList.map(item => {
      let option = <option key={item._id} value={item.name}>{item.name}</option>
      options.push(option);
    })
    this.setState({ options, selectedExists: true })
  }

  render(){
    return (
      <div className='exp-review-form'>
          <div>
            <h2 className='exp-title'>{this.props.labelText} Experience</h2>

            <form
              onSubmit={this.handleSubmit}>

              <h2>What is the name of your edible?</h2>
              <input
                type='text'
                name='edibleName'
                placeholder='name of edible'
                value={this.state.edibleName}
                onChange={this.handleChange}
                />

              {util.renderIf(this.state.edibleExists,
                <select name="edibleSelect" form="commentForm" onChange={this.handleChange} onClick={this.handleClickOptions}>
                  <option>-Please select an edible-</option>
                  {this.state.options}
                </select>)}
              </form>
              <form onSubmit={this.handleSubmit}>

                {util.renderIf(this.state.selectedExists === true,
                <div className='exp-review-text-box'>
                  <input
                    name='edibleName'
                    type='text'
                    value={this.state.selected[0].name}
                    onChange={this.handleChange} />
                </div>)}

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
                  <h2>Notes about the day</h2>
                  <textarea
                    name='description'
                    className='day-description-box'
                    type='text'
                    value={this.state.description}
                    onChange={this.handleChange}></textarea>
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
            </div>
      </div>
    )
  }
}

export default ExpReviewForm
