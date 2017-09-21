'use strict';
import './_dashboard-container.scss';
import React from 'react';
import {connect} from 'react-redux'
import * as util from '../../lib/util.js'
import * as expReviewActions from '../../actions/exp-review-action.js'

import ExpReviewForm from '../forms/exp-review-form'
import ExpReviewItem from '../exp-review-item';

class DashboardContainer extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log('MOUNTED');
    this.props.expReviewFetch()
    .catch(util.logError)
  }

  render(){
    return(
      <div className='dashboard-container'>
        <h2>dashboard</h2>
        <ExpReviewForm
          labelText='Enter a new'
          buttonText='post'
          onComplete={this.props.expReviewCreate}
          />
        {console.log('EXP REVIEWZZZZZZ', this.props.expReview)}
        {this.props.expReview.map(expReview =>
          <ExpReviewItem key={expReview._id} expReview={expReview} />
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  userProfile: state.userProfile,
  expReview: state.expReview,
})

let mapDispatchToProps = (dispatch) => ({
  expReviewCreate: (expReview) => dispatch(expReviewActions.expReviewCreateRequest(expReview)),
  expReviewFetch: (expReview) => dispatch(expReviewActions.expReviewFetchRequest()),
  expReviewCreateBasic: (expReview) => dispatch(expReviewActions.expReviewCreate(expReview)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer)
