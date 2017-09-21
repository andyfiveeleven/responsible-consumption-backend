import './_profile-form.scss';
import React from 'react';
import * as util from '../../../lib/util';
import Rating from '../../rating/index'

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
      <div className='profile-fields'>
        <input
          className='avatar-upload'
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
        </div>
        <div className='rate-fields'>
          <div className='exp-review-rating-radio'>
            <p className='profile-field-desc'>Enter in your: Experience with cannabis products</p>
            <Rating
              name='experience'
              low='new user'
              high='very experienced'
              min={1}
              max={5}
              onChange={(experience) => this.setState({ experience })}
              value={this.state.experience}
              />
          </div>

          <div className='exp-review-rating-radio'>
            <p className='profile-field-desc'>Enter in your: Current Weight</p>
            <Rating className='rating-weight'
              label1 = 'under 110 lbs'
              label2 = '   110 - 150 lbs'
              label3 = '   150 - 190 lbs'
              label4 = '   190 - 230 lbs'
              label5 = '   230+ lbs'
              name='weight'
              min={1}
              max={5}
              onChange={(weight) => this.setState({ weight })}
              value={this.state.weight}
              />
          </div>
        </div>
      <button type='submit'>{this.props.buttonText || 'Submit'}</button>
      </form>
    )
  }
}

export default ProfileForm;
