import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import SideNavbar from './SideNavbar';


export default class Header extends Component {
  state = {
    showNav: false
  }

  hideNav = () => {
    this.setState({
      showNav: false
    })
  }

  showNav = () => {
    this.setState({
      showNav: true
    })
  }

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome name="bars"
            onClick={this.showNav}
            style={{
              color: '#fff',
              padding: '10px',
              cursor: 'pointer'
            }}
          />
        </div>

        <SideNavbar
          showNav={this.state.showNav}
          hideNav={this.hideNav}
        />

        <Link to="/" className="logo">
          The Book Shelf
        </Link>
      </header>
    )
  }
}
