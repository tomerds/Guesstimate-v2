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
      toggleAnswer: 'hide',
      toggleQuestion: '',
      successMessage: '',
      successMessageClass: '',
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
      this.setState({
        successMessage: 'Correct!',
        successMessageClass: 'correct'
      })
    }
    else {
      this.setState({
        wrongAnswers: this.state.wrongAnswers + 1,
        successMessage: 'Wrong...',
        successMessageClass: 'incorrect'
      })
    };

    this.setState({
      userAnswer: '',
      toggleAnswer: '',
      toggleQuestion: 'hide',
    })
  }

  nextQuestion = e => {
    this.setState({
      index: this.state.index + 1,
      toggleAnswer: 'hide',
      toggleQuestion: '',
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
          <Card body inverse key={e.id}>
            <div className='card-container'>
              <CardTitle className={`title ${this.state.toggleQuestion}`}>{e.title}</CardTitle>
              <CardTitle className={`title-success-message ${this.state.toggleAnswer} ${this.state.successMessageClass}`}>{this.state.successMessage}</CardTitle>

              <div className='card'>

                <div className={`card-question ${this.state.toggleQuestion}`}>
                  <CardText className='card-text'>{e.content}</CardText>
                  <input
                    placeholder='Input your answer'
                    type='number'
                    name='userAnswer'
                    value={this.state.userAnswer}
                    onChange={this.handleChange}
                  >
                  </input>
                </div>

                <div className={`card-answer ${this.state.toggleAnswer}`}>
                  <CardText className='card-text'>{e.content}</CardText>
                  <h2>{e.answer}</h2>
                </div>

                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                  <Button className={`button ${this.state.toggleQuestion}`} onClick={event => { this.submitAnswer(event, e.answer) }}>Guesstimate</Button>
                  <Button className={`button-next ${this.state.toggleAnswer}`} onClick={event => { this.nextQuestion(event) }}>Next Question</Button>
                </div>
              </div>

              <div className="horse">
                {horse}
              </div>

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