'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {signupRequest} from '../../../actions/login-actions.js';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        email: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e){
    let name = e.target.name;
    if(name === 'username') this.setState({user: {username: e.target.value}});
    if(name === 'password') this.setState({user: {password: e.target.value}});
    if(name === 'email') this.setState({user: {email: e.target.value}});
  };

  handleSubmit(e){
    e.preventDefault();
    try{
      this.props.signupRequest(this.state);
    }catch(err){

    }
  };

  render(){
    return(
      <div className='signup'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' placeholder='username' onChange={this.handleChange} />
          <input type='text' name='password' placeholder='password' onChange={this.handleChange} />
          <input type='text' name='email' placeholder='email' onChange={this.handleChange} />
          <button type='submit'>Push yo shit</button>
        </form>
        <p>or login with</p>
        <h1>Output</h1>
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>
        <p>{this.state.email}</p>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  signupRequest: (user) => dispatch(signupRequest(user))
})

export default connect(undefined, mapDispatchToProps)(LoginForm);
