'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import OAuth from '../OAuth/index.js';

import * as util from '../../lib/util.js'
import LoginContainer from '../login-container';
import Dashboard from '../dashboard';
import LandingPage from '../landing-page';
import Navbar from '../navbar';

class App extends React.Component {
  render(){
    return (
      <div className='app'>
        <Navbar />
        <BrowserRouter>
          <div>
            <Route path='/' component={LandingPage} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/login' component={LoginContainer} />
          </div>
        </BrowserRouter>
        <OAuth />
      </div>
    )
  };
};

const mapStateToProps = (state) => ({profile: state.profile});

export default connect(mapStateToProps)(App);
