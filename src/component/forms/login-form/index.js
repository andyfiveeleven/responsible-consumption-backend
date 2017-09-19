'use strict';

import React from 'react';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
  };

  render(){
    return(
      <form>
        <input type='text' placeholder='hi' />
      </form>
    )
  }
};

export default LoginForm;
