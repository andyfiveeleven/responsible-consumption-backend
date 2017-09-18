import React from 'react'
import superagent from 'superagent'
import debounce from 'lodash/fp/debounce'

import * as util from '../../lib/util.js'

class CommentRoute extends React.Component{
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

}
