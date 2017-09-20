import React from 'react';
import * as util from '../../../lib/util';

class ProfileForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.profile) {
      this.setState(props.profile);
    }
  }

  handleChange(e) {
    let {type, name, value} = e.target;

    if(name === 'bio') {
      this.setState({bio: e.target.value})
    }

    if(name == 'avatar') {
      let {files} = e.target;
      let avatar = files[0];
      this.setState({avatar});
      util.photoToDataURL(avatar)
      .then(preview => this.setState({preview}))
      .catch(console.error)
    }

    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return(
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        <img src={this.state.preview || this.state.avatar} />

      <input
        type='file'
        name='avatar'
        onChange={this.handleChange}
        />
      <p className='profile-field-desc'>Enter in your: First Name</p>
      <input
        type='text'
        name='firstname'
        placeholder='enter first name'
        value={this.state.firstname}
        onChange={this.handleChange}
        />
      <p className='profile-field-desc'>Enter in your: Last Name</p>
      <input
        type='text'
        name='lastname'
        placeholder='enter last name'
        value={this.state.lastname}
        onChange={this.handleChange}
        />

        <p className='profile-field-desc'>Enter in your: Experience with cannibus products</p>
        <input
          type='number'
          name='experience'
          placeholder='enter a number out of 10'
          value={this.state.experience}
          onChange={this.handleChange}
          />
        <p className='profile-field-desc'>Enter in your: Current Weight</p>
        <input
          type='text'
          name='weight'
          placeholder='enter username'
          value={this.state.weight}
          onChange={this.handleChange}
          />
      <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default ProfileForm;
