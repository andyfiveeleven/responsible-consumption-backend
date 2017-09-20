import React from 'react'
import superagent from 'superagent'
import OAuth from '../../OAuth/index'
import {isEmail, isAlphanumeric, isAscii} from 'validator'
import debounce from 'lodash/fp/debounce'

import Tooltip from '../../tooltip/index'
import * as util from '../../../lib/util'

class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      emailError: null,
      usernameAvailable: true,
      focused: null,
      error: false,
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
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
  }



  handleSubmit(e){
    e.preventDefault()
    if(!this.state.error){
      this.props.onComplete(this.state)
      .then(() => {
        this.setState({username: '', password: ''})
      })
      .catch(error => {
        console.error(error)
        this.setState({
          error,
          submitted: true,
        })
      })
    }
  }

  render(){
    let {
      focused,
      submitted,
      username,
    } = this.state


    return (
      <form
        onSubmit={this.handleSubmit}
        className={util.classToggler({
          'auth-form': true,
          'error': this.state.error && this.state.submitted,
        })}>

            <h2>login</h2>
            <OAuth />

        <input
          type='text'
          name='username'
          placeholder='username'
          value={this.state.username}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          />


        <input
          type='password'
          name='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          />

          <button type='submit'>
            {this.props.buttonText}
          </button>

      </form>
    )
  }
}

export default LoginForm
