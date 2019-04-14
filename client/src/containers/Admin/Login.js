import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import FormFields from '../../widgetsUI/FormFields';
import { Redirect } from 'react-router-dom';


class Login extends Component {

  state = {
    registerError: '',
    loading: false,
    formData: {
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
    }
  };

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

  submitButton = () => (
    this.state.loading
      ? "loading"
      : <div>
        <button type="submit">
          Login
        </button>
      </div>
  );

  submitForm = (ev) => {
    // const { email, password } = this.state.formData;
    ev.preventDefault();
    this.props.dispatch(loginUser(this.state.formData));
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.user.login &&
      this.props.user.login.isAuth
    ) {
      this.props.history.push('/user');
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="rl_container">
        <form action="" onSubmit={this.submitForm}>
          <h2>Login Here</h2>
          <div className="form_element">
            <FormFields
              id="email"
              formData={this.state.formData.email}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="password"
              formData={this.state.formData.password}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          {this.submitButton()}
          {
            user.login ?
              (<div className="error">{user.login.message}</div>) :
              null
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps)(Login);