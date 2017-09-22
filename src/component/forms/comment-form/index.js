import React from 'react'
import superagent from 'superagent'
import debounce from 'lodash/fp/debounce'
import Rating from '../../rating/index'

import Tooltip from '../../tooltip/index'
import * as util from '../../../lib/util'

class CommentForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edibleSearch: '',
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

      edibleSearchError: null,
      titleError: null,
      commentBodyError: null,
      error: false,
      submitted: false,

      selected: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Cannabis_leaf.svg',

      edibleExists: null,
      focused: null,
    }
    this.validateInput = this.validateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleClickOptions = this.handleClickOptions.bind(this)
    this.edibleDoesExist = debounce(50)(this.edibleDoesExist.bind(this))
  }


  validateInput(e){
    console.log(e);
    let {name, placeholder, value} = e.target


    let errors = {
      edibleSearchError: this.state.titleError,
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

    if(name === 'edibleSearch')
    if(!value)
    setError(name, `${placeholder} can not be empty`)
    else
    deleteError(name)

    if(name === 'title'){
      if(!value)
      setError(name, `${placeholder} can not be empty`)
      else deleteError(name)
    }

    if(name === 'commentBody'){
      if(!value)
      setError(name, `${placeholder} can not be empty`)
      else deleteError(name)
    }

    this.setState({
      ...errors,
      error: !!(errors.edibleSearchError || errors.titleError || errors.commentBodyError),
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

    if(name === 'edibleSearch'){
        this.edibleDoesExist(value)
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


  edibleDoesExist(edibleSearch){
    return superagent.get(`${__API_URL__}/api/edible/search/${edibleSearch}`)
    .end((err, res) => {
      if(err) console.error(err);
      let edibleList = res.body;
      this.setState({edibleExists: true, edibleList})

      console.log('edibleList',edibleList);
      return edibleList;
    })
  }


  handleClickOptions(e) {
    let options = []
    this.state.edibleList.map(item => {
      let option = <option key={item._id} value={item.name}>{item.name}</option>
      options.push(option);
    })
    this.setState({ options, selectedExists: true })
  }



  handleSubmit(e){
    e.preventDefault()
    if(!this.state.error){
      console.log(this.state);
      this.props.onComplete(this.state)
      .then(() => {
        this.setState({
          edibleSearch: '',
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

          edibleSearchError: null,
          titleError: null,
          commentBodyError: null,
          error: false,
          submitted: false,

          edibleExists: null,
          focused: null,
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
      edibleSearchError: state.edibleSearchError || state.edibleSearch ? null : 'required',
      titleError: state.titleError || state.title ? null : 'required',
      commentBodyError: state.commentBodyError || state.commentBody ? null : 'required',
    }))
  }


  render(){
    let {
      focused,
      submitted,
      edibleSearch,
      titleError,
      commentBodyError,
      edibleSearchError,
      edibleExists
    } = this.state

    return(
      <div>
        <img src={this.state.selected[0].image}></img>
        <form onSubmit={this.handleSubmit} id='commentForm'>
          <Tooltip message={edibleSearchError} show={focused === 'edibleSearch' || submitted} />
          <input
            className={util.classToggler({error: edibleSearchError})}
            type='text'
            name='edibleSearch'
            placeholder='search an edible'
            value={this.state.edibleSearch}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            />

          {util.renderIf(this.state.edibleExists,
            <select name="edibleSelect" form="commentForm" onChange={this.handleChange} onClick={this.handleClickOptions}>
              <option>-Please select an edible-</option>
              {this.state.options}
            </select>)}
          </form>
          <form onSubmit={this.handleSubmit}>


          {util.renderIf(this.state.selectedExists === true,
          <input
            className={util.classToggler({error: edibleSearchError})}
            type='text'
            name='edibleName'
            value={this.state.selected[0].name}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            />)}

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
            placeholder='comment body'
            value={this.state.commentBody}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}>
          </textarea>

          <div className='exp-review-rating-radio'>
            <h2>How relaxed did you feel when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='effectRelaxed'
              low='not relaxed'
              high='very relaxed'
              min={1}
              max={5}
              onChange={(effectRelaxed) => this.setState({ effectRelaxed })}
              value={this.state.effectRelaxed}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>How happy did you feel when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='effectHappy'
              low='not happy'
              high='very happy'
              min={1}
              max={5}
              onChange={(effectHappy) => this.setState({ effectHappy })}
              value={this.state.effectHappy}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>How euphoric did you feel when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='effectEuphoric'
              low='not euphoric'
              high='very euphoric'
              min={1}
              max={5}
              onChange={(effectEuphoric) => this.setState({ effectEuphoric })}
              value={this.state.effectEuphoric}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>How uplifted did you feel when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='effectUplifted'
              low='not uplifted'
              high='very uplifted'
              min={1}
              max={5}
              onChange={(effectUplifted) => this.setState({ effectUplifted })}
              value={this.state.effectUplifted}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>How creative did you feel when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='effectCreative'
              low='not creative'
              high='very creative'
              min={1}
              max={5}
              onChange={(effectCreative) => this.setState({ effectCreative })}
              value={this.state.effectCreative}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have stress relief when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='medicalStress'
              low='very stressed'
              high='not stressed'
              min={1}
              max={5}
              onChange={(medicalStress) => this.setState({ medicalStress })}
              value={this.state.medicalStress}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have pain relief when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='medicalPain'
              low='had pain'
              high='no pain'
              min={1}
              max={5}
              onChange={(medicalPain) => this.setState({ medicalPain })}
              value={this.state.medicalPain}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have headache relief when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='medicalHeadaches'
              low='had headache'
              high='no headache'
              min={1}
              max={5}
              onChange={(medicalHeadaches) => this.setState({ medicalHeadaches })}
              value={this.state.medicalHeadaches}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have insomnia relief when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='medicalInsomnia'
              low='had insomnia'
              high='no insomnia'
              min={1}
              max={5}
              onChange={(medicalInsomnia) => this.setState({ medicalInsomnia })}
              value={this.state.medicalInsomnia}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have a dry mouth when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='negativeDryMouth'
              low='no dry mouth'
              high='had dry mouth'
              min={1}
              max={5}
              onChange={(negativeDryMouth) => this.setState({ negativeDryMouth })}
              value={this.state.negativeDryMouth}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have dry eyes when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='negativeDryEyes'
              low='no dry eyes'
              high='had dry eyes'
              min={1}
              max={5}
              onChange={(negativeDryEyes) => this.setState({ negativeDryEyes })}
              value={this.state.negativeDryEyes}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have paranoia when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='negativeParanoid'
              low='no paranoia'
              high='had paranoia'
              min={1}
              max={5}
              onChange={(negativeParanoid) => this.setState({ negativeParanoid })}
              value={this.state.negativeParanoid}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have dizzyness when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='negativeDizzy'
              low='no dizzyness'
              high='had dizzyness'
              min={1}
              max={5}
              onChange={(negativeDizzy) => this.setState({ negativeDizzy })}
              value={this.state.negativeDizzy}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <h2>Did you have anxiousness when using this edible?</h2>
            <Rating
              label1 = '1'
              label2 = '2'
              label3 = '3'
              label4 = '4'
              label5 = '5'
              name='negativeAnxious'
              low='no anxiousness'
              high='had anxiousness'
              min={1}
              max={5}
              onChange={(negativeAnxious) => this.setState({ negativeAnxious })}
              value={this.state.negativeAnxious}
              />
          </div>

          <button type='submit'>
            {this.props.buttonName}
          </button>

        </form>
      </div>
    )
  }
}

  export default CommentForm;
