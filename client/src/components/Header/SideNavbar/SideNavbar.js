import React from 'react';
import SideNav from 'react-simple-sidenav';

const SideNavbar = (props) => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.hideNav}
      navStyle={{
        backgroundColor: '#242424',
        maxWidth: '220px'
      }}
    >
      Items
    </SideNav>
  );
};

export default SideNavbar;