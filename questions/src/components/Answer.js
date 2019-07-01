import './../styles/Question.scss';

import React from 'react';
import { Button, CardText, CardTitle } from 'reactstrap';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <CardTitle className='title'>{this.props.title}</CardTitle>
        <div className='card'>
          <CardText className='card-text'>{this.props.content}</CardText>
          <h2>{this.props.answer}</h2>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
            <Button className='button' onClick={event => { }}>Next Question</Button>
          </div>
        </div>
        <div className="horse">
          {this.props.horse}
        </div>
      </div>
    )
  }
}

export default Answer;