import React from 'react'

class OAuth extends React.Component{
  render(){
    let AUTH_URI = 'https://accounts.google.com/o/oauth2/v2/auth'
    let clientIDQuery = 'client_id=148625409311-i637qdjui9qn2g90be479r74gcjnpseg.apps.googleusercontent.com'
    let responseTypeQuery = 'response_type=code'
    let scopeQuery = 'scope=openid%20profile%20email'
    let promptQuery = 'prompt=consent'
    let redirectURIQuery = 'redirect_uri=https://responsible-consumption-stagin.herokuapp.com/oauth/google/code'

    let formattedURI = `${AUTH_URI}?${clientIDQuery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`
    console.log(formattedURI)
    return(
      <button><a href={formattedURI}>Login with Google</a></button>
    )
  }
}
export default OAuth
