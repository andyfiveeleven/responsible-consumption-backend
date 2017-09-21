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
    this.props.expReviewCreateBasic({date: '5/11/92', edibleName: 'brownie', edibleThc: '5mg', lastMeal: 'large meal'})
    this.props.expReviewCreateBasic({date: '6/21/17', edibleName: 'Zoot Drops', edibleThc: '2.5mg', lastMeal: 'small meal', reaction: 5, dayDescription: 'went to the park with erin'})
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
          onComplete={(expReview) => {
            return this.props.expReviewCreate(expReview)
            .catch(console.error)
          }}
          />
        {console.log('EXP REVIEWZZZZZZ', this.props.expReviews)}
        {this.props.expReviews.map(expReview =>
          <ExpReviewItem key={expReview._id} expReview={expReview} />
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  userProfile: state.userProfile,
  expReviews: state.expReviews,
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
