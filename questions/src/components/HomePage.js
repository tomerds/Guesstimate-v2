import '../styles/Homepage.scss';

import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Link to='/single-player' style={{ textDecoration: 'none' }}>
          <h2 className='h2-link'>Single Player</h2>
        </Link>
        <Link to='/multi-player' style={{ textDecoration: 'none' }}>
          <h2 className='h2-link'>Multiplayer </h2>
        </Link>
        <Link to='/add-question' style={{ textDecoration: 'none' }}>
          <h2 className='h2-link'>Add Questions</h2>
        </Link>
      </div>
    )
  }
}

export default HomePage;