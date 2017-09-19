'use strict';

import React from 'react';
import superagent from 'superagent';
// import dotenv from 'dotenv';

import Dashboard from '../dashboard';
import LoginForm from '../forms/login-form';

class LoginContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  };

  handleLogin(){
    document.cookie = JSON.stringify({passHash: 'b8e7531f6fed41d87a822bff5ceb4a92580faabe9c0879edadd68b1bb937bfec', userID: '59c00d2066b9c5c04d57060f'});
    let cookie = JSON.parse(document.cookie)
    console.log(cookie);
    console.log(cookie.passHash);
    console.log(`Bearer ${cookie.passHash}`);
    if(document.cookie){
      console.log(process.env.API_URL);
      superagent.get(`https://responsible-consumption-stagin.herokuapp.com/api/signin`)
      .auth('Logan', '123')
      .end((err, res) => {
        console.log(`Bearer ${res.body.findHash}`);
        superagent.post(`https://responsible-consumption-stagin.herokuapp.com/api/profile`)
        .set({Authorization: `Bearer ${res.body.findHash}`})
        .send({firstname: 'Logan', lastname: 'Absher', productHistory: [], weight: 170, experience: 5, userID: res.body.userID})
        .end((err, res) => {
          console.log(res);
          console.log(err);
        })
      })
      // superagent.get(`http://localhost:8080/api/profile/`)
      // .set({Authorization: `Bearer ${cookie.passHash}`})
      // .end((err, res) => {
      //   if(err){
      //     return(
      //       <LoginForm />
      //     )
      //   }else{
      //     return(
      //       <Dashboard />
      //     )
      //   }
      // })
    }else{
      return(
        <LoginForm />
      )
    }
  };

  render(){
    return(
      <section>
        {this.handleLogin()}
      </section>
    )
  }
};

export default LoginContainer;
