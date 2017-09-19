import React from 'react'
import {connect} from 'react-redux'

import ExpReviewForm from '../../exp-review-form'
import * as util from '../../lib/util.js'
import * as expReviewActions from '../../action/exp-review-actions.js'

export class ExpReviewItem extends React.Component {
  constructor(props){
    super(props);

    this.state= {
      editing: false;
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete(){
    return this.props.deleteExpReview(this.props.expReview)
    .then(console.log)
    .catch(console.error)
  }

  handleUpdate(expReview){
    return this.props.updateExpReview(expReview)
    .then(() => {
      this.setState({editing:false})
    })
    .catch(console.error)
  }

  render() {
    let {expReview} = this.props
    return(
      <div>
        {util.renderIf(!this.state.editing,
          <div>
            <p className='use-date'> {expReview.date}</p>
            <p className='edible-name'> {expReview.edibleName}</p>
            <p className='edible-thc'> Edible thc content {expReview.edibleThc}</p>
            <p className='meal-size'> Meal size: {expReview.lastMeal}</p>
            <p className='day-description'>Description of the day: {expReview.dayDescription}</p>
            <p className='exp-rating'>Rating of Experience: {expReview.reaction}</p>
          </div>
        )}

        {util.renderIf(this.state.editing,
          <div>
            <PhotoForm
              photo={this.props.photo}
              buttonText='update photo'
              onComplete={this.handleUpdate}
              />
          </div>
        )}
      </div>
    )
  }
}

let mapStateToProps=() => ({})
let mapDispatchToProps = (dispatch) => ({
  deleteExpReview: (expReview) => dispatch(expReviewActions.expReviewDeleteRequest(expReview)),
  updateExpReview: (expReview) => dispatch(expReviewAction.expReviewUpdateRequest(expReview)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpItem)