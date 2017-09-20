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
    this.props.expReviewFetch()
    .catch(util.logError)
  }

  render(){
    return(
      <div className='dashboard-container'>
        <h2>dashboard</h2>
        <ExpReviewForm
          buttonText='post'
          onComplete={(expReview) => {
            return this.props.ExpReveiwCreate(expReview)
            .catch(console.error)
          }}
          />
        {this.props.expReviews.map(expReview =>
          <ExpReviewItem key={expReview._id} photo={photo} />
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer)
