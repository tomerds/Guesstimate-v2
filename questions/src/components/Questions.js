import './../styles/Question.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardText, CardTitle } from 'reactstrap';

import { getQuestion } from './../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      userAnswer: '',
      wrongAnswers: 0,
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    })
  }


  componentDidMount() {
    this.props.getQuestion()
  }

  submitAnswer = (event, answer) => {
    const diff = Math.abs(this.state.userAnswer - answer);
    const diffOverAnswer = diff / answer;
    if (diffOverAnswer <= 0.25) {

    }
    else {
      this.setState({
        wrongAnswers: this.state.wrongAnswers + 1
      })
    };

    this.setState({
      index: this.state.index + 1,
      userAnswer: '',
    })
  }

  render() {
    let horse = '';

    switch (this.state.wrongAnswers) {
      case 0:
        horse = '';
        break;
      case 1:
        horse = 'H';
        break;
      case 2:
        horse = 'H O';
        break;
      case 3:
        horse = 'H O R';
        break;
      case 4:
        horse = 'H O R S';
        break;
      case 5:
        horse = 'H O R S E';
        break;
      default:
        horse = 'GAME OVER';
    };

    return (
      <ul>
        {this.props.questions.filter(e => { return e.id === this.state.index }).map(e =>
          <Card className='card-container' body inverse key={e.id}>
            <CardTitle className='title'>{e.title}</CardTitle>
            <div className='card'>
              <CardText className='card-text'>{e.content}</CardText>
              <input
                placeholder='Input your answer'
                type='number'
                name='userAnswer'
                value={this.state.userAnswer}
                onChange={this.handleChange}
              >
              </input>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                <Button className='button' onClick={event => { this.submitAnswer(event, e.answer) }}>Guesstimate</Button>
              </div>
            </div>
            <div className="horse">
              {horse}
            </div>
          </Card>
        )}
      </ul>

    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
})

export default connect(
  mapStateToProps,
  {
    getQuestion
  }
)(Question);