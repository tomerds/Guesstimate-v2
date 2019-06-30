import './App.scss';

import React from 'react';

import Question from './components/Questions';

function App() {
  return (
    <div className="App">
      <div className='nav-bar'>
        <h1>Guesstimate</h1>
        <h1 className='logo'>?</h1>
      </div>
      <div className='mobile-app-container'>
        <Question />
      </div>
    </div>
  );
}

export default App;
