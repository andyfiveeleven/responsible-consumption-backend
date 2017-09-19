'use strict';

import React from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router'

import * as util from '../../lib/util.js';

class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: null,
      hasError: null
    }
  };

  componentWillMount(){
    if(document.cookie){
      console.log('yes');
      let cookie = JSON.parse(document.cookie)
      console.log(cookie.findHash);
      superagent.get(`https://responsible-consumption-stagin.herokuapp.com/api/profile/${cookie.userID}`)
      .set({Authorization: `Bearer ${cookie.findHash}`})
      .end((err, res) => {
        if(err){
          this.setState({hasError: err.status});
          document.cookie = {};
        }else{
          this.setState({isLoggedIn: true});
        }
      });
    }else{
      this.setState({isLoggedIn: false});
    }
  }

  render(){
    return(
      <section>
        {this.state.isLoggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
      </section>
    )
  }
};

export default LandingPage;
