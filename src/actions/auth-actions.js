import superagent from 'superagent'
import * as util from '../lib/util.js'

// sync actions for updating store
export const tokenSet = (token) => {
  return {
    type: 'TOKEN_SET',
    payload: token
  }
}

export const logout = () => {
  util.deleteCookie('Special-Cookie')
  return { type: 'LOGOUT' }
}

// async actions
export const signupRequest =  (user) => (dispatch) => {
  return superagent.post(`${__API_URL__}/api/signup`)
  .withCredentials()
  .send(user)
  .then(res => {
    return res
  })
}

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/login`)
  .withCredentials()
  .auth(user.username, user.password)
  .then(res => {
    return res
  })
}
