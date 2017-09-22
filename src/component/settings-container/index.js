import React from 'react'
import { Route, Redirect } from 'react-router'
import {connect} from 'react-redux'
import ProfileForm from '../forms/profile-form/index'
import {
  profileCreateRequest,
  profileUpdateRequest,
} from '../../actions/profile-actions.js'

class SettingsContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleProfileCreate = this.handleProfileCreate.bind(this)
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
  }

  handleProfileCreate(profile){
    return this.props.profileCreate(profile)
    .then(() => {
      this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }

  handleProfileUpdate(profile){
    return this.props.profileUpdate(profile)
    .catch(console.error)
  }

  render(){
    let handleComplete = this.props.profile
      ? this.handleProfileUpdate
      : this.handleProfileCreate

    return (
      <div className='settings-container'>

        <ProfileForm
          profile={this.props.profile}
          buttonText='create profile'
          onComplete={this.handleProfileCreate}
          />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile
})

let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
  profileUpdate: (profile) => dispatch(profileUpdateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
