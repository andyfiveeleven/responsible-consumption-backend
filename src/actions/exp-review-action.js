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

export const expReviewFetchRequest = () => (dispatch, getState) => {
  let token = document.cookie.split('=')[1];
  return superagent.get(`${API_URL}/api/expReview/me`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    dispatch(expReviewsSet(res.body))
    return res.body
  })
  .catch((err) => {
    console.log(err);
  })
}

export const expReviewCreateRequest = (expReview) => (dispatch, getState) => {
  let token = document.cookie.split('=')[1];
  console.log('ur posting')
  return superagent.post(`${API_URL}/api/expReview`)
  .set('Authorization', `Bearer ${token}`)
  .send(expReview)
  .then((res) => {
    console.log('EXPREVIEW', res.body);
    dispatch(expReviewCreate(res.body))
    return res
  })
  .catch((err) => {
    console.log(err);
  })
}

export const expReviewDeleteRequest = (expReview) => (dispatch, getState) => {
  let token = document.cookie.split('=')[1];
  return superagent.delete(`${API_URL}/api/expReview/${expReview._id}`)
  .set('Authorization', `Bearer ${token}`)
  .then( res => {
    dispatch(expReviewDelete(expReview))
    return res
  })
  .catch((err) => {
    console.log(err);
  })
}

export const expReviewUpdateRequest = (expReview) => (dispatch, getState) => {
  console.log('GET STATE', expReview);
  let token = document.cookie.split('=')[1];
  return superagent.put(`${API_URL}/api/expReview/${expReview._id}`)
  .set('Authorization', `Bearer ${token}`)
  .send(expReview)
  .then( res => {
    console.log('RESBODY',res.body);
    dispatch(expReviewUpdate(res.body))
    return res
  })
  .catch((err) => {
    console.log(err);
  })
}
