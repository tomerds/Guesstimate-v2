import './../styles/Question.scss';

import axios from 'axios';
import React from 'react';
import Countdown from 'react-countdown-now';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      questions: [],
      toggleClock: '',
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  shuffleQuestions = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  componentDidMount() {
    // this.props.getQuestion();

    // let questionHolder = this.props.questions;

    // this.shuffleQuestions(questionHolder);

    // this.setState({
    //   questions: questionHolder.map((e, index) => { return { ...e, id: index } })
    // })



    axios.get('https://boiling-chamber-48923.herokuapp.com/questions')
      .then(res => {
        let questionHolder = res.data;
        this.shuffleQuestions(questionHolder);
        this.setState({
          questions: questionHolder.map((e, index) => { return { ...e, id: index } })
        })
      })
      .catch(err => {
        console.log(err);
      })

  };

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
      toggleClock: 'none',
    })
  }

  nextQuestion = e => {
    this.setState({
      index: this.state.index + 1,
      toggleAnswer: 'hide',
      toggleQuestion: '',
      toggleClock: '',
    })
  }



  render() {
    let horse = '';
    console.log('questions', this.state.questions);
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
      <div>
        {this.state.questions &&
          <ul>
            {this.state.questions.filter(e => { return e.id === this.state.index }).map(e =>
              <Card body inverse key={e.id}>

                <div className='card-container'>
                  <div className={`${this.state.toggleClock}`}>
                    <Countdown
                      date={Date.now() + 10000}
                      zeroPadTime={2}
                      onComplete={this.state.toggleClock === '' ? event => { this.submitAnswer(event, e.answer) } : e => { }}
                      renderer={props => <div className={`timer`}>{props.seconds}</div>}
                    />
                  </div>
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
                      <Button className={`button ${this.state.toggleQuestion}`} onClick={event => { this.submitAnswer(event, e.answer) }}>Guestimate</Button>
                      {this.state.wrongAnswers === 5 ? <Link to='/'><Button className={`button`} >GAME OVER</Button></Link> :
                        <Button className={`button-next ${this.state.toggleAnswer}`} onClick={event => { this.nextQuestion(event) }}>Next Question</Button>
                      }
                    </div>
                  </div>

                  <div className="horse">
                    {horse}
                  </div>

                </div>
              </Card>
            )}
          </ul>
        }
      </div>


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