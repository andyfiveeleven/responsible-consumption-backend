'use strict';

import React from 'react';
import {connect} from 'react-redux';

import Dashboard from '../dashboard';
import LoginForm from '../forms/login-form';
import {signupRequest, signinRequest} from '../../actions/login-actions.js';
import {getProfileRequest} from '../../actions/profile-actions.js';

class LoginContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: null,
      hasError: null
    }
    // this.handleLogin = this.handleLogin.bind(this);
  };

  // componentWillMount(){
    // if(document.cookie){
    //   console.log('yes');
    //   superagent.get(`https://responsible-consumption-stagin.herokuapp.com/api/profile`)
    //   .set({Authorization: `Bearer ${document.cookie}`})
    //   .end((err, res) => {
    //     if(err){
    //       this.setState({hasError: err.status});
    //     }else{
    //       this.setState({isLoggedIn: true});
    //     }
    //   });
    // }else{
    //   this.setState({isLoggedIn: false});
    // }

  render(){
    return(
      <section>
        {this.state.hasError || !this.state.isLoggedIn ? <LoginForm /> : <Dashboard />}
      </section>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupRequest: (user) => dispatch(signupRequest(user)),
    signinRequest: (user) => dispatch(signinRequest(user))
  }
}

export default connect(undefined, mapDispatchToProps)(LoginContainer);
