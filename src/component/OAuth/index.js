import React from 'react'

class OAuth extends React.Component{
  render(){
    // let AUTH_URI = 'https://accounts.google.com/o/oauth2/v2/auth'
    // let clientIDQuery = 'client_id=553643806097-d0e4kfacgs7aij4sgr3e13ikkbu5fhtt.apps.googleusercontent.com'
    // let responseTypeQuery = 'response_type=code'
    // let scopeQuery = 'scope=openid%20profile%20email'
    // let promptQuery = 'prompt=consent'
    // let redirectURIQuery = 'redirect_uri=http://localhost:8081/auth/google/callback'
    // let formattedURI = `${AUTH_URI}?${clientIDQuery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`
    // console.log(formattedURI)
    return(
      <section>
        <button><a href='http://localhost:8080/auth/google'>Login with Google</a></button>
        <a href='http://localhost:8080/auth/facebook'>Login with Facebook</a>
      </section>
    )
  }
}
export default OAuth
