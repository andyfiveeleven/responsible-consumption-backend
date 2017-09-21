//TODO finish this. Need to have a fetch from the database
export default (state=[], action) => {
  let {type, payload} = action
  switch(type){
    case 'EXP_REVIEWS_SET':
      return payload
    case 'EXP_REVIEW_CREATE':
      return [payload, ...state]
    case 'USER_PHOTO_UPDATE':
      return state.map(item => item._id === payload._id ? payload : item)
    case 'USER_PHOTO_DELETE':
      return state.filter(item => item._id !== payload._id)
    case 'LOGOUT':
      return []
    default:
      return state
  }
}
