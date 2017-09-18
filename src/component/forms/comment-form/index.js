import React from 'react'
import superagent from 'superagent'
import debounce from 'lodash/fp/debounce'

import Tooltip from '../tooltip'
import * as util from '../../lib/util.js'

class CommentForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edibleName: '',
      title: '',
      commentBody: '',
      effectRelaxed: 0,
      effectHappy: 0,
      effectEuphoric: 0,
      effectUplifted: 0,
      effectCreative: 0,

      medicalStress: 0,
      medicalDepression: 0,
      medicalPain: 0,
      medicalHeadaches: 0,
      medicalInsomnia: 0,

      negativeDryMouth: 0,
      negativeDryEyes: 0,
      negativeParanoid: 0,
      negativeDizzy: 0,
      negativeAnxious: 0,

      edibleNameError: null,
      titleError: null,
      commentBodyError: null,
      error: false,
      submitted: false,

      edibleExists: true,

      focused: null,
    }
    this.validateInput = this.validateInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.edibleDoesExist = debounce(50)(this.edibleDoesExist.bind(this))
  }


  validateInput(e){
    let {name, value} = e.target

    let errors = {
      edibleNameError: this.state.titleError,
      titleError: this.state.titleError,
      commentBodyError: this.state.commentBodyError,
    }

    let setError = (name, error) => {
      let errorName = `${name}Error`
      errors[errorName] = error
    }
    let deleteError = (name) => {
      let errorName = `${name}Error`
      errors[errorName] = null
    }

    if(name === 'edibleName')
      if(!value)
        setError(name, `${name} can not be empty`)
      else
        deleteError(name)

    if(name === 'title'){
      if(!value)
        setError(name, `${name} can not be empty`)
      else deleteError(name)
    }

    if(name === 'commentBody'){
      if(!value)
        setError(name, `${name} can not be empty`)
      else deleteError(name)
    }

    this.setState({
      ...errors,
      error: !!(errors.edibleNameError || errors.titleError || errors.commentBodyError),
    })
  }

  handleFocus(e){
    this.setState({ focused: e.target.name })
  }

  handleBlur(e){
    let {name} = e.target
    this.setState(state => ({
      focused: state.focused == name ? null : state.focused,
    }))
  }

  handleChange(e){
    let {name, value} = e.target
    this.validateInput({...e})

    this.setState({
      [name]: value,
    })

    if(name === 'edibleName'){
      this.edibleDoesExist(value)
    }
  }

  edibleDoesExist(edibleName){
    return superagent.get(`${__API_URL__}/api/edible/search/${edibleName}`)
    .then((edible) => {
      console.log(edible);
      this.setState({edibleExists: true, edibleName: edible})

    })
    .catch(() => this.setState({edibleExists: false}))
  }

  handleSubmit(e){
    e.preventDefault()
    if(!this.state.error){
      this.props.onComplete(this.state)
      .then(() => {
        this.setState({
          edibleName: '',
          title: '',
          commentBody: '',
          effectRelaxed: 0,
          effectHappy: 0,
          effectEuphoric: 0,
          effectUplifted: 0,
          effectCreative: 0,

          medicalStress: 0,
          medicalDepression: 0,
          medicalPain: 0,
          medicalHeadaches: 0,
          medicalInsomnia: 0,

          negativeDryMouth: 0,
          negativeDryEyes: 0,
          negativeParanoid: 0,
          negativeDizzy: 0,
          negativeAnxious: 0,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          error,
          submitted: true,
        })
      })
    }
    this.setState(state => ({
      submitted: true,
      edibleNameError: state.edibleNameError || state.edibleName ? null : 'required',
      titleError: state.titleError || state.title ? null : 'required',
      commentBodyError: state.commentBodyError || state.commentBody ? null : 'required',
    }))
  }

  render(){
    let {
      focused,
      submitted,
      edibleName,
      titleError,
      commentBodyError,
      edibleNameError,
      edibleExists
    } = this.state
    return(
      <form onSubmit={this.handleSubmit}>
        <Tooltip message={edibleNameError} show={focused === 'edibleName' || submitted} />
        <input
          className={util.classToggler({error: edibleNameError})}
          type='text'
          name='edibleName'
          placeholder='edibleName'
          value={this.state.edibleName}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          />

        <Tooltip message={titleError} show={focused === 'title' || submitted} />
        <input
          className={util.classToggler({error: titleError})}
          type='text'
          name='title'
          placeholder='title'
          value={this.state.title}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          />

        <Tooltip message={commentBodyError} show={focused === 'commentBody' || submitted} />
        <textarea
          className={util.classToggler({error: commentBodyError})}
          type='text'
          name='commentBody'
          placeholder='commentBody'
          value={this.state.commentBody}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}>
        </textarea>

        <div className='exp-review-rating-radio'>
          <h2>How relaxed did you feel when using this edible?</h2>
          <Rating
            name='effectRelaxed'
            low='not relaxed'
            high='very relaxed'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.effectRelaxed}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How happy did you feel when using this edible?</h2>
          <Rating
            name='effectHappy'
            low='not happy'
            high='very happy'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.effectHappy}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How euphoric did you feel when using this edible?</h2>
          <Rating
            name='effectEuphoric'
            low='not euphoric'
            high='very euphoric'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.effectEuphoric}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How uplifted did you feel when using this edible?</h2>
          <Rating
            name='effectUplifted'
            low='not uplifted'
            high='very uplifted'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.effectUplifted}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>How creative did you feel when using this edible?</h2>
          <Rating
            name='effectCreative'
            low='not creative'
            high='very creative'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.effectCreative}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have stress relief when using this edible?</h2>
          <Rating
            name='medicalStress'
            low='very stressed'
            high='not stressed'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.medicalStress}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have pain relief when using this edible?</h2>
          <Rating
            name='medicalPain'
            low='had pain'
            high='no pain'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.medicalPain}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have headache relief when using this edible?</h2>
          <Rating
            name='medicalHeadaches'
            low='had headache'
            high='no headache'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.medicalHeadaches}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have insomnia relief when using this edible?</h2>
          <Rating
            name='medicalInsomnia'
            low='had insomnia'
            high='no insomnia'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.medicalInsomnia}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have a dry mouth when using this edible?</h2>
          <Rating
            name='negativeDryMouth'
            low='no dry mouth'
            high='had dry mouth'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.negativeDryMouth}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have dry eyes when using this edible?</h2>
          <Rating
            name='negativeDryEyes'
            low='no dry eyes'
            high='had dry eyes'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.negativeDryEyes}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have paranoia when using this edible?</h2>
          <Rating
            name='negativeParanoid'
            low='no paranoia'
            high='had paranoia'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.negativeParanoid}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have dizzyness when using this edible?</h2>
          <Rating
            name='negativeDizzy'
            low='no dizzyness'
            high='had dizzyness'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.negativeDizzy}
          />
        </div>

        <div className='exp-review-rating-radio'>
          <h2>Did you have anxiousness when using this edible?</h2>
          <Rating
            name='negativeAnxious'
            low='no anxiousness'
            high='had anxiousness'
            min={1}
            max={5}
            onChange={this.handleChange}
            value={this.state.negativeAnxious}
          />
        </div>

        <button type='submit'>
          {this.props.buttonName}
        </button>

      </form>
    )
  }
}

export default CommentForm;
