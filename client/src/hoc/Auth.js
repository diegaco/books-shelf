import React, { Component } from 'react';
import { auth } from '../actions';
import { connect } from 'react-redux';

export default function (WrappedComponent, reload) {

  class AuthenticationCheck extends Component {

    state = {
      loading: true
    }

    componentDidMount() {
      this.props.dispatch(auth());
    }

    componentDidUpdate(prevProps, prevState) {
      if (!this.props.user.login.isAuth) {
        if (reload === true) {
          this.props.history.push('/login');
        }
      } else {
        if (reload === false) {
          this.props.history.push('/user');
        }
      }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.user.login) {
        return {
          loading: false
        }
      }
      return null;
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="loader">
            Loading...
          </div>
        )
      } else {
        return (
          <WrappedComponent {...this.props} user={this.props.user}/>
        )
      }
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.users
    }
  };

  return connect(mapStateToProps)(AuthenticationCheck);

};