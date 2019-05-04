import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SideNavItems = ({user}) => {
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Profile',
      link: '/user',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Admins',
      link: '/user/register',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'sign-in',
      text: 'Login',
      link: '/login',
      restricted: false,
      exclude: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Reviews',
      link: '/user/user-reviews',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Reviews',
      link: '/user/add',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'sign-out',
      text: 'Logout',
      link: '/user/logout',
      restricted: true
    }
  ];

  let sideNavElement = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  const renderItems = () => (
    user.login ?
      items.map((item, i) => (
        user.login.isAuth ?
          (!item.exclude ? sideNavElement(item, i) : null) :
          (!item.restricted ? sideNavElement(item, i) : null)
      )) :
    null
  );

  return (
    <>
      {renderItems()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps)(SideNavItems);
