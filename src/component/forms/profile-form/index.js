import React from 'react';
import * as util from '../../../lib/util.js';
class ProfileForm extends React.component{
  constructor(props){
    super(props);
    console.log('ProfileForm PROPS:', props);
    this.state = props.props.ProfileForm
      ? {...props.profile, preview: ''}
      : {bio: '', avatar: null, preview: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bing(this);
  }

  componentWillRecieveProps(props){
    if(props.profile)
    this.setState(props.profile)
  }

  handleChange(e){
    let {type, name} = e.target;

    if(name ==='bio'){
      this.setState({bio: e.target.value})
    }

    if(name === 'avatar'){
      let {files} = e.target;
      let avater = files[0];
      this.setState({avatar});
      util.photoToDataURL(avatar)
      .then(preview => this.setState({preview}))
      .catch(console.error)
    }
  }
  handleSubmit(e){
    e.preventDefault();
    return this.props.onComplete(this.state)
  }

  render(){
    return(
      <form
        className='profile-form'
        onSubmit='{this.submitChange}'
      />

      <img src={this.state.preview || this.state.avatar} />

      <input
        type='file'
        name='avatar'
        onChange={this.handleChange}
      />

      <p className='profile-field-desc'>Enter in your: Username</p>
      <input
        type='text'
        name='userName'
        placeholder='enter username'
        value={this.state.userName}
        onChange={this.handleChange}
      />

      <p className='profile-field-desc'>Enter in your: Password</p>
      <input
        type='text'
        name='Password'
        placeholder='enter password'
        value={this.state.password}
        onChange={this.handleChange}
      />
      <p className='profile-field-desc'>Enter in your: Email</p>
      <input
        type='text'
        name='Email'
        placeholder='enter Email'
        value={this.state.email}
        onChange={this.handleChange}
      />
      <p className='profile-field-desc'>Enter in your: Experience with cannibus products</p>
      <input
        type='radio'
        name='exp'
        placeholder='enter username'
        value={this.state.userName}
        onChange={this.handleChange}
      />
      <p className='profile-field-desc'>Enter in your: Current Weight</p>
      <input
        type='text'
        name='userName'
        placeholder='enter username'
        value={this.state.userName}
        onChange={this.handleChange}
      />
      <p className='profile-field-desc'>Enter in your: First Name</p>
      <input
        type='text'
        name='firstName'
        placeholder='enter first name'
        value={this.state.firstName}
        onChange={this.handleChange}
      />
      <p className='profile-field-desc'>Enter in your: Last Name</p>
      <input
        type='text'
        name='lastName'
        placeholder='enter last name'
        value={this.state.lastName}
        onChange={this.handleChange}
      />
      <button type='submit'> SAVE </button>
    </form>
    )
  }
}

export default ProfileForm
