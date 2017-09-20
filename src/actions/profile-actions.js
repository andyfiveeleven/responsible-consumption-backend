import superagent from 'superagent';

export const profileCreate = (profile) => ({
  type:'USER_PROFILE_CREATE',
  payload: profile
})

export const profileUpdate = (profile) => ({
  type: 'USER_PROFILE_UPDATE',
  payload: profile
})

export const profileCreateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.post(`${__API_URL__}/api/profile`)
  .set('Authorization', `Bearer {auth}`)
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    dispatch(profileCreate(res.body))
    return res
  })
}

export const profileUpdateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.put(`${__API_URL__}/api/profile/${profile._id}`)
  .set('Authorization', `Bearer ${auth}`)
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    dispatch(profileCreate(res.body))
    return res
  })
}

export const profileFetchRequest = () => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.get(`${__API_URL__}/api/profile/me`)
  .set('Authorization', `Bearer ${auth}`)
  .then(res => {
    dispatch(profileCreate(res.body))
    return res
  })
}
