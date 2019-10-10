import React from 'react';

function About() {

  return (
    <div style={{ width: '90%' }} >
      <h1>About Guestimate</h1>
      <span>Guestimate is a hobby project made by Tomer du Sautoy to improve peoples number literacy.< br />
        In an increasingly data orientated and expanding world numbers are getting out of control!
        Unfortunately we don't have a great grasp of large numbers, so in a simple (and hopefully) fun game,
        Guestimate hopes to improve your ability to make rapid numerical judgments. <br />

        Guestimate was built using ReactJS on frontend,
        scss for styling, NodeJS and Express for the backend and is hosted on netlify (client) and heroku (server).
        Tech used include: styled-components, CSS in JS, redux, redux-thunk, axios, react router.
      </span>
    </div>
  )
}

export default About;