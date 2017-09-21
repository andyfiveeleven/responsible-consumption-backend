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
  return superagent.post(`${__API_URL__}/api/profile`)
  .set({Authorization: `Bearer ${token}`})
  .send(profile)
  .then((res) => {
    dispatch(profileCreate(res.body))
    return res;
  });
};

export const userProfileUpdateRequest = (profile) => (dispatch, getState) => {
  let {auth} = getState()
  return superagent.put(`${__API_URL__}/api/profiles/${profile._id}`)
  .set({Authorization: `Bearer ${auth}`})
  .field('bio', profile.bio)
  .attach('avatar', profile.avatar)
  .then(res => {
    dispatch(userProfileCreate(res.body))
    return res
  })
}

export const userProfileFetchRequest = () => (dispatch, getState) => {
  let token = document.cookie.split('=')[1];
  return superagent.get(`${__API_URL__}/profiles/me`)
  .set({Authorization: `Bearer ${token}`})
  .then(res => {
    dispatch(userProfileCreate(res.body))
    return res
  })
}
