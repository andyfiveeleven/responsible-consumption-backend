import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

// import Icon from '../icon-component/index'
import './_navbar.scss';
import Avatar from '../avatar/index'
import LoginForm from '../forms/login-form/index'
import {tokenSet} from '../../actions/auth-actions'
import * as util from '../../lib/util'
import * as authActions from '../../actions/auth-actions'
import {signupRequest, loginRequest} from '../../actions/auth-actions'
import {userProfileFetchRequest} from '../../actions/profile-actions'

let NavLink = (props) => (
  <li className={util.classToggler({selected: props.url === `/${props.route}` })} >
    <Link to={`/${props.route}`}>
      {props.route}
    </Link>
  </li>
)

class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.validateRoute = this.validateRoute.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount(){
    this.validateRoute(this.props)
  }

  validateRoute(props){
    let {match, history} = props
    let token = util.readCookie('Special-Cookie')

    if(!token){
      return history.replace('/welcome')
    }

    this.props.tokenSet(token)
    this.props.profileFetch()
    .catch(() => {
      console.log('PROFILE FETCH ERROR: user does not have a profile')
      if(!match.url.startsWith('/settings')){
        return history.replace('/settings')
      }
    })
  }


  handleLogin(user){
    this.setState({
      isLoggedIn: true
    })
    let {profileFetch, history} = this.props
    return this.props.login(user)
    .then(() => this.props.profileFetch())
    .then(() => history.push('/dashboard'))
    .catch(util.logError)
  }

  handleLogout(){
    this.setState({
      loggedIn: null
    })
    this.props.logout()
    this.props.history.push('/welcome')
  }

  render(){
    console.log('path', this.props.match)
    let {url} = this.props.match
    return (
      <header className='navbar'>
        <main>
        <h1 id='title'>Responsible Consumption</h1>

        {util.renderIf(this.props.loggedIn,
          <div className='panel'>
            <nav>
              <ul>
                <NavLink route='settings' url={url} />
                <NavLink route='dashboard' url={url} />
              </ul>
            </nav>
          </div>
        )}
        <span className='clearfix'></span>
        </main>

        {util.renderIf(this.props.profile,
          <Avatar profile={this.props.profile} />)}

        {util.renderIf(this.props.loggedIn,
          <button className='logout' onClick={this.handleLogout}>logout</button>
        )}

        {util.renderIf(!this.props.loggedIn,
          <LoginForm
            onComplete={this.handleLogin}
            buttonText= 'Login'
          />
        )}
      </header>
    )
  }
}

let mapStateToProps = (state) => ({
  loggedIn: !!state.auth,
  profile: state.profile,
})

let mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signupRequest(user)),
  login: (user) => dispatch(loginRequest(user)),
  logout: () => dispatch(authActions.logout()),
  tokenSet: (token) => dispatch(tokenSet(token)),
  profileFetch: () => dispatch(userProfileFetchRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
