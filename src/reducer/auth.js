export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
    case 'COOKIE_CREATE':
      return payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};
