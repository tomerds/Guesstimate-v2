import '../styles/SubmitQuestion.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardText, CardTitle } from 'reactstrap';

import { submitQuestion } from '../actions';

class AddQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      question: '',
      answer: '',
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitQuestion = e => {
    e.preventDefault();
    const question = {
      title: this.state.title,
      question: this.state.question,
      answer: this.state.answer,
    };

    this.props.submitQuestion(question);


    this.setState({
      title: '',
      question: '',
      answer: ''
    });
  }


  render() {
    return (
      <div className='add-card-container'>
        <Card body inverse>
          <div className='add-container'>
            <h1 >Submit A Question</h1>
            <CardTitle >
              <input
                placeholder='Add a title...'
                type='text'
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
              ></input>
            </CardTitle>

            <div className='add-card'>

              <div className={`add-card-question`}>
                <CardText className='add-card-text'>
                  <textarea
                    placeholder='Add question...'
                    type='text'
                    name='question'
                    value={this.state.question}
                    onChange={this.handleChange}
                  ></textarea>
                </CardText>
                <input
                  placeholder='Add answer'
                  type='number'
                  name='answer'
                  value={this.state.answer}
                  onChange={this.handleChange}
                >
                </input>
              </div>

              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                <Button className={`button`} onClick={(event) => this.submitQuestion(event)}>Submit Question</Button>

              </div>
            </div>

          </div>
        </Card>
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
    submitQuestion
  }
)(AddQuestion);