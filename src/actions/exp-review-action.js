import superagent from 'superagent'
//TODO make this. make it good.

export const expReviewsSet = (expReviews) => ({
  type: 'EXP_REVIEWS_SET',
  payload: expReviews,
})

export const expReviewCreate = (expReview) => ({
  type: 'EXP_REVIEW_CREATE',
  payload: expReview,
})

export const expReviewUpdate = (expReview) => ({
  type: 'EXP_REVIEW_UPDATE',
  payload: expReview,
})

export const expReviewDelete = (expReview) => ({
  type: 'EXP_REVIEW_DELETE',
  payload: expReview,
})

//async actions

export const expReviewFetchRequest = (expReview) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.get(`${__API_URL__}/expReview/me`) //TODO Build that route in the exp review. or find the "get all"
  .set('Authorization', `Bearer ${auth}`)
  .then(res => {
    dispatch(expReviewsSet(res.body.data))
    return res
  })
}

export const expReviewCreateRequest = (expReview) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.post(`${__API_URL__}/user/${userId}/expReview`)
  .set('Authorization', `Bearer ${auth}`)
  .field('edibleName', expReview.edibleName)
  .field('lastMeal', expReview.lastMeal)
  .field('dayDescription', expReview.dayDescription)
  .field('reaction', expReview.reaction)
  .field('edibleThc', expReview.edibleThc)
  .then((res) => {
    dispatch(expReviewCreate(res.body))
    return res
  })
}

export const expReviewDeleteRequest = (expReview) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.delete(`${__API_URL__}/expReview/${expReview._id}`)
  .set('Authorization', `Bearer ${auth}`)
  .then( res => {
    dispatch(expReviewDelete(expReview))
    return res
  })
}

export const expReviewUpdateRequest = (expReview) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.put(`${__API_URL__}/expReview/${expReview._id}`)
  .set('Authorization', `Bearer ${auth}`)
  .field('edibleName', expReview.edibleName)
  .field('lastMeal', expReview.lastMeal)
  .field('dayDescription', expReview.dayDescription)
  .field('reaction', expReview.reaction)
  .field('edibleThc', expReview.edibleThc)
  .then( res => {
    dispatch(expReviewUpdate(res.body))
    return res
  })
}
