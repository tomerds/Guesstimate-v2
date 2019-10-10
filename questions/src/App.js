import './App.scss';

import React from 'react';
import { Route } from 'react-router-dom';

import AddQuestion from './components/AddQuestion';
import HomePage from './components/HomePage';
import Multiplayer from './components/Multiplayer';
import Navbar from './components/Navbar';
import Question from './components/Questions';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='mobile-app-container'>
        <Route exact path='/' render={props => (<HomePage {...props} />)} />
        <Route path='/single-player' render={props => (<Question {...props} />)} />
        <Route path='/multi-player' render={props => (<Multiplayer {...props} />)} />
        <Route path='/add-question' render={props => (<AddQuestion {...props} />)} />
        <Route path='/about' render={props => (<About {...props} />)} />
      </div>

    </div>
  );
}

export default App;
