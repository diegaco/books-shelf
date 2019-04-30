import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FormFields } from '../../widgetsUI/FormFields';
import { getUsers } from '../../actions';

class Register extends Component {

  state = {
    registerError: '',
    loading: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      lastName: {
        element: 'input',
        value: '',
        validation: {
          required: true,
        },
        config: {
          name: 'lastaname_input',
          type: 'text',
          placeholder: 'Enter your Lastname',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        validation: {
          required: true,
          password: true
        },
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    },
  };

  componentDidMount() {
    this.props.dispatch(getUsers());
  }


  handleFormChange = (element) => {
    const newFormData = {
      ...this.state.formData
    }

    const newElement = {
      ...newFormData[element.id]
    }

    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    })
  };

  validate = (element) => {
    let error = [true, ''];

    // validate email
    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const msg = `${!valid ? "Must enter a valid email" : ""}`;
      error = !valid ? [valid, msg] : error;
    }

    // validate password
    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const msg = `${!valid ? "Must be greater than 5" : ""}`;
      error = !valid ? [valid, msg] : error;
    }

    // validate required
    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const msg = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, msg] : error;
    }
    return error;
  };

  submitForm = (ev) => {
    ev.preventDefault();
  };

  renderUsers = () => {
    return this.props.user.users ?
      this.props.user.users.map(user => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
        </tr>
      )) :
      null
  }

  render() {
    return (
      <div className="rl_container">
        <form action="" onSubmit={this.submitForm}>
          <h2>Add user</h2>
        </form>
        <div className="current_users">
          <h4>Current Users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps)(Register);