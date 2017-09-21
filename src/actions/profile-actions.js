'use strict';

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
  let token = document.cookie.findHash;
  return superagent.post('https://responsible-consumption-stagin.herokuapp.com/profile')
  .set({Authorization: `Bearer ${token}`})
  .send(profile)
  .then((res) => {
    dispatch(profileCreate(res.body))
    return res;
  });
};
