import React from 'react'
import {connect} from 'react-redux'

import ExpReviewForm from '../forms/exp-review-form'
import * as util from '../../lib/util.js'
import * as expReviewActions from '../../actions/exp-review-action.js'

export class ExpReviewItem extends React.Component {
  constructor(props){
    super(props);

    this.state= {
      editing: false
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
    expReview._id = this.props.expReview._id
    console.log('WHOLEBUNCHOFSHIT',expReview);
    return this.props.updateExpReview(expReview)
    .then(() => {
      this.setState({editing:false})
    })
    .catch(console.error)
  }

  render() {
    let {expReview} = this.props
    let log = expReview.date.toString().split('T').splice(0,1).join(' ').split('-');
    let date = log[1]+'/'+log[2]+'/'+log[0].split('').splice(2,2).join('')
    let thcContent= expReview.edibleThc * 2.5
    return(
      <div>
        {util.renderIf(!this.state.editing,
          <div className='exp-review-item'>
            <div className='exp-item-head'>
              <p className='use-date'> {date}</p>
              <p className='edible-name'> {expReview.edibleName}</p>
              <p className='edible-thc'>THC content: {thcContent}mg</p>
            </div>
            <div className='exp-item-body'>
              <p className='exp-rating'>Rating of Experience: {expReview.reaction} stars</p>
              <p className='meal-size'> Meal size: {expReview.lastMeal}/5</p>
              <p className='day-description'>Description of the day: {expReview.description}</p>
              <p className='dosage'>Recomended dose of {expReview.edibleName} based on body weight and experience: {expReview.dosage *2.5}mg</p>
            </div>

            <button onClick={() => this.setState({editing: true})} className='edit-button'>Edit</button>
            <button onClick={this.handleDelete} className='delete-button'>Delete</button>
            <div className='clearfix'></div>
          </div>
        )}

        {util.renderIf(this.state.editing,
          <div>
            <ExpReviewForm
              labelText='Edit your'
              expReview={this.props.expReview}
              buttonText='update'
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
  updateExpReview: (expReview) => dispatch(expReviewActions.expReviewUpdateRequest(expReview)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpReviewItem)
