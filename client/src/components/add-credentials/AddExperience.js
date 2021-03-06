import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// if we want to redirect by an action, we need withRouter
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
  constructor (props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false // this is for a checkBox
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors })
  //     }
  //   }

  // we realy should write this part for getting errors work
  componentDidUpdate (prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit (e) {
    e.preventDefault();

    // Getting the data for passing into action
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(expData, this.props.history);
  }
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck (e) {
    this.setState({
      // whenever we check the box, we call onCheck(), so it will read disabled & current from component state,
      // and reverse them
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render () {
    const { errors } = this.state;
    return <div className='add-experience'>
             <div className='container'>
               <div className='row'>
                 <div className='col-md-8 m-auto'>
                   <Link to='/dashboard' className='btn btn-light componentBody'>
                   {" "} Go Back
                   </Link>
                   <h1 className='display-4 text-center'>Add Experience</h1>
                   <p className='lead text-center'>
                     Add any job or position that you have had in the past or current
                   </p>
                   <small className='d-block pb-3'>* = required fields</small>
                   <form onSubmit={this.onSubmit}>
                     <TextFieldGroup
                       placeholder='* Company'
                       name='company'
                       value={this.state.company}
                       onChange={this.onChange}
                       error={errors.company} />
                     <TextFieldGroup
                       placeholder='* Job Title'
                       name='title'
                       value={this.state.title}
                       onChange={this.onChange}
                       error={errors.title} />
                     <TextFieldGroup
                       placeholder='Location'
                       name='location'
                       value={this.state.location}
                       onChange={this.onChange}
                       error={errors.location} />
                     <h6>From Date</h6>
                     <TextFieldGroup
                       name='from'
                       type='date'
                       value={this.state.from}
                       onChange={this.onChange}
                       error={errors.from} />
                     <h6>To Date</h6>
                     <TextFieldGroup
                       name='to'
                       type='date'
                       value={this.state.to}
                       onChange={this.onChange}
                       error={errors.to}
                       disabled={this.state.disabled ? 'disabled' : ''} />
                     {/* // *** // whenever we check the box, disabled will change,so at first, disabled is set to false... // by clicking the check box, disabled in state component, */}
                     {/* will change, so this field will be disable, so we can't change it */}
                     <div className='form-check mb-4'>
                       <input
                         type='checkbox'
                         className='form-check-input'
                         name='current'
                         value={this.state.current}
                         checked={this.state.current}
                         onChange={this.onCheck}
                         id='current' />
                       {/* // if we check the box, we will call onCheck() */}
                       <label htmlFor='current' className='form-check-label'>
                         Current Job
                       </label>
                     </div>
                     <TextAreaFieldGroup
                       placeholder='Job Description'
                       name='description'
                       value={this.state.description}
                       onChange={this.onChange}
                       error={errors.description}
                       info='Tell us about the the position' />
                     <input type='submit' value='Submit' className='btn btn-info btn-block mt-4 lastComponent' />
                   </form>
                 </div>
               </div>
             </div>
           </div>;
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience}
)(withRouter(AddExperience));
// if we want to redirect by an action, we need withRouter
