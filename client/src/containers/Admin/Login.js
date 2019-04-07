import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';


class Login extends Component {

  submitForm = () => {

  }

  render() {
    return (
      <div className="rl_container">
        <form action="" onSubmit={this.submitForm}>
          <h2>Login Here</h2>
          <div className="form_element">
            <input />
          </div>
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