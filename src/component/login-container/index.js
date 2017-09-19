'use strict';

import React from 'react';
import {withRouter} from 'react-router';

import LoginForm from '../forms/login-form';

class LoginContainer extends React.Component{
  render(){
    return(
      <section>
        <LoginForm />
      </section>
    )
  }
};

export default LoginContainer;
