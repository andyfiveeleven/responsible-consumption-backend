'use strict';

import superagent from 'superagent';

export const cookieCreate = (obj) => ({
  type: 'COOKIE_CREATE',
  payload: obj
});

export const cookieRemove = () => ({
  type: 'COOKIE_REMOVE'
});

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${__API_URL__}/api/signup`)
  .withCredentials()
  .then((res) => {
    // dispatch(cookieCreate(res.body))
    try{
      document.cookie = JSON.stringify(user);
    }catch(err){
      console.error(err);
    }
    return res;
  })
  .catch(err => {
    console.error(err);
  })
};

export const signinRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/signin`)
  .withCredentials()
  .auth(user.username, user.password)
  .then((res) => {
    // dispatch(cookieCreate(res.body))
    console.log(res);
    document.cookie = JSON.stringify(res.body)
    return res;
  })
  .catch(err => {
    console.error(err);
  })
};
