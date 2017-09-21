import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-redux'

// import {tokenSet} from '../../actions/login-actions.js'
import Avatar from '../avatar';
import * as util from '../../lib/util.js'
import * as authActions from '../../actions/login-actions.js'
import {userProfileFetchRequest} from '../../actions/profile-actions.js'

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
    this.state = {

    };
  };

  // componentDidMount(){
  //   this.validate(this.props)
  // }
  //
  // validateRoute(props){
  //   let {match, history} = props
  //   let token = util.readcookie(X-Token)
  //   if(!token){
  //     return history.replace('welcome/signup')
  //   }
  //
  //   this.props.tokenSet(token)
  //   this.props.userProfileFetch()
  //   .catch(() => {
  //     console.log(error)
  //   })
  // }

  handleLogout(){
    this.props.logout();
    this.props.history.push('/welcome/login')
  }

  render(){
    console.log('path', this.props.match)

    //<Icon className='logo name='' />   ++++ ADD to return with icon
    // <NavLink route='settings' url={url} />
    // <NavLink route='dashboard' url={url} />


    return(
      <header className='navbar'>
        <main>
        <h1>Responsible Consumption</h1>

        {util.renderIf(this.props.loggedIn,
          <div className='panel>'>
            <nav>
              <ul>
              </ul>
            </nav>
          </div>
        )}
        </main>
        {util.renderIf(this.props.userProfile,
          <Avatar profile={this.props.userprofile} />
        )}

        {util.renderIf(this.props.loggedIn,
          <button onClick={this.handleLogout}>Logout</button>
        )}
      </header>
    )
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  tokenSet: (token) => dispatch(tokenSet(token)),
  userprofileFetch: () => dispatch(userProfileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
