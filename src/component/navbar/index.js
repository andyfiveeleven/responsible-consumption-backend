import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

// import Icon from '../icon-component/index'
import Avatar from '../avatar/index'
import {tokenSet} from '../../actions/auth-actions'
import * as util from '../../lib/util'
import * as authActions from '../../actions/auth-actions'
import {profileFetchRequest} from '../../actions/profile-actions'

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

  handleLogout(){
    this.props.logout()
    this.props.history.push('/welcome')
  }

  render(){
    console.log('path', this.props.match)
    let {url} = this.props.match
    return (
      <header className='navbar'>
        <main>
        <h1>Responsible Consumption</h1>

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

        </main>

        {util.renderIf(this.props.profile,
          <Avatar profile={this.props.profile} />)}

        {util.renderIf(this.props.loggedIn,
          <button onClick={this.handleLogout}>logout</button>
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
  logout: () => dispatch(authActions.logout()),
  tokenSet: (token) => dispatch(tokenSet(token)),
  profileFetch: () => dispatch(profileFetchRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
