import axios from 'axios';


export const FETCH_QUESTION_START = 'FETCH_QUESTION_START';
export const FETCH_QUESTION_FAIL = 'FETCH_QUESTION_FAIL';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';

export const SUBMIT_QUESTION_START = 'SUBMIT_QUESTION_START';
export const SUBMIT_QUESTION_FAIL = 'SUBMIT_QUESTION_FAIL';
export const SUBMIT_QUESTION_SUCCESS = 'SUBMIT_QUESTION_SUCCESS';

export const getQuestion = () => dispatch => {
  dispatch({ type: FETCH_QUESTION_START });
  axios.get('http://localhost:5000/questions')
    .then(res => {
      dispatch({
        type: FETCH_QUESTION_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_QUESTION_FAIL,
        payload: err.response
      })
    })
}

export const submitQuestion = (question) => dispatch => {
  dispatch({ type: SUBMIT_QUESTION_START });
  axios.post('http://localhost:5000/questions', question)
    .then(res => {
      dispatch({
        type: SUBMIT_QUESTION_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SUBMIT_QUESTION_FAIL,
        payload: err.response
      })
    })
}

