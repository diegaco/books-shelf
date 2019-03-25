import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './SideNavItems';

const SideNavbar = (props) => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        backgroundColor: '#242424',
        maxWidth: '220px'
      }}
    >
      <SideNavItems />
    </SideNav>
  );
};

export default SideNavbar;