import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div className='nav-bar'>
        <h1>Guesstimate</h1>
        <Link exact to='/' style={{ textDecoration: 'none' }}>
          <h1 className='logo'>?</h1>
        </Link>
      </div>
    )
  }
}

export default Navbar;