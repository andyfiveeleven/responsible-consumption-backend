import superagent from 'superagent';

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile
});

export const userProfileUpdate = (profile) => ({
  type: 'USER_PROFILE_UPDATE',
  payload: profile
});

export const profileCreateRequest = (profile) => (dispatch) => {
  console.log(profile);
  let token = document.cookie.split('=')[1];

  console.log('weeeeeeeeeeeeeeeeeeee', token);
  return superagent.post(`${API_URL}/api/profile`)
  .set({Authorization: `Bearer ${token}`})
  .send(profile)
  .then((res) => {
    console.log(res.body);
    dispatch(profileCreate(res.body))
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
};

export const userProfileUpdateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.put(`${API_URL}/api/profiles/${profile._id}`)
  .set({Authorization: `Bearer ${auth}`})
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    dispatch(userProfileCreate(res.body))
    return res
  })
  .catch((err) => {
    console.log(err);
  })
}

export const userProfileFetchRequest = () => (dispatch, getState) => {
  let token = document.cookie.split('=')[1];
  return superagent.get(`${API_URL}/profile/me`)
  .set({Authorization: `Bearer ${token}`})
  .then(res => {
    superagent.get(`${API_URL}/profile/${res.body.userID}`)
    .set({Authorization: `Bearer ${token}`})
    .then((profile) => {
      return profile
    })
    .catch((err) => {
      console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
}
