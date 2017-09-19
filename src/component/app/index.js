'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import OAuth from '../OAuth/index.js'

import * as util from '../../lib/util.js'
import LoginContainer from '../login-container';

class App extends React.Component {
  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route path='/' component={LoginContainer} />
          </div>
        </BrowserRouter>
        <OAuth />
      </div>
    )
  };
};

const mapStateToProps = (state) => ({profile: state.profile});

export default connect(mapStateToProps)(App);
