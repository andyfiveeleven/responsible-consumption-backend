import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import SignupForm from '../forms/signup-form/index'
import LoginForm from '../forms/login-form/index'
import * as util from '../../lib/util.js'
import {signupRequest, loginRequest} from '../../actions/auth-actions'
import {profileFetchRequest} from '../../actions/profile-actions'

class LoginContainer extends React.Component {
  constructor(props){
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  componentWillReceiveProps(props){
    if(props.auth && props.profile)
      props.history.replace('/dashboard')
    if(props.auth && !props.profile)
      props.history.replace('/settings')
  }

  handleLogin(user){
    let {profileFetch, history} = this.props
    return this.props.login(user)
    .then(() => profileFetch())
    .then(() => history.push('/dashboard'))
    .catch(util.logError)
  }

  handleSignup(user){
    let {profileFetch, history} = this.props
    return this.props.signup(user)
    .then(() => {
      this.props.history.push('/settings')
    })
    .catch(util.logError)
  }

  render(){
    let {params} = this.props.match

    return (
      <div className='landing-container'>

        <LoginForm
          onComplete={this.handleLogin}
          buttonText= 'Login'
        />


        <SignupForm
          onComplete={this.handleSignup}
          buttonText= 'Sign Up'
          />

      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
    profileFetch: () => dispatch(profileFetchRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
