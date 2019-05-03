import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import FormFields from '../../widgetsUI/FormFields';
import { getUsers, registerUser } from '../../actions';

class Register extends PureComponent {

  state = {
    registerError: '',
    register: '',
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
      lastname: {
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

  static getDerivedStateFromProps(nextProps, prevState) {
    let newFormData = {...prevState.formData};
    if (
      nextProps.user.register &&
      nextProps.user.register === true &&
      prevState.register !== true
    ) {
      for (const prop in newFormData) {
        if (newFormData[prop]) {
          const newElement = {
            ...newFormData[prop],
          };
          newElement.value = '';
          newFormData[prop] = newElement;
        }
      }

      return {
        registerError: '',
        register: nextProps.user.register,
        loading: false,
        formData: newFormData
      }
    } else if (nextProps.user.register === false) {
      return {
        registerError: 'There was an error. Try again'
      };
    } else {
      return null;
    }
  }


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
    this.setState({
      registerError: ''
    });
    this.props.dispatch(registerUser(this.state.formData, this.props.user.users));
  };

  renderUsers = () => {
    console.log(this.props.user);
    return this.props.user.users ?
      this.props.user.users.map(user => user !== undefined ? (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
        </tr>
      ) :
      null) :
      null
  }

  submitButton = () => (
    this.state.loading
      ? "loading"
      : <div>
        <button type="submit">
          Register User
        </button>
      </div>
  );

  render() {
    return (
      <div className="rl_container">
        <form action="" onSubmit={this.submitForm}>
          <h2>Add user</h2>
          <div className="form_element">
            <FormFields
              id="name"
              formData={this.state.formData.name}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
          <div className="form_element">
            <FormFields
              id="lastname"
              formData={this.state.formData.lastname}
              handleChange={element => this.handleFormChange(element)}
            />
          </div>
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
              <div className="error">{this.state.registerError}</div>
          }
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