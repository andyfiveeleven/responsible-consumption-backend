'use strict';
import './_dashboard-container.scss';
import React from 'react';
import {connect} from 'react-redux'
import * as util from '../../lib/util.js'
import * as expReviewActions from '../../actions/exp-review-action.js'

import ExpReviewForm from '../forms/exp-review-form'
import ExpReviewItem from '../exp-review-item';

class Dashboard extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.expReviewFetch()
    .catch(util.logError)
  }

  render(){
    return(
      <section>
        <h1>You are Logged In! Bioootch / snow hoe</h1>
      </section>
    )
  }
};

export default Dashboard;
