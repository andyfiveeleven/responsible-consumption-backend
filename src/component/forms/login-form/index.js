'use strict';

import React from 'react';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e){
    let name = e.target.name;
    if(name === 'username') this.setState({username: e.target.value});
    if(name === 'password') this.setState({password: e.target.value});
    if(name === 'email') this.setState({email: e.target.value});
  };

  handleSubmit(e){
    e.preventDefault();
    
  };

  render(){
    return(
      <div className='signup'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' placeholder='username' onChange={this.handleChange} />
          <input type='text' name='password' placeholder='password' onChange={this.handleChange} />
          <input type='text' name='email' placeholder='email' onChange={this.handleChange} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    signupRequest: (user) => dispatch(signupRequest(user)),
    signinRequest: (user) => dispatch(signinRequest(user))
  }
}

export default LoginForm;
