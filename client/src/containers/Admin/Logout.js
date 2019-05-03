import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';

class Logout extends Component {
  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(logout());
    }, 2000);
  }

  render() {
    return (
      <div className="logout_container">
        <h1>Sorry to see you go!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
};

export default connect(mapStateToProps)(Logout);