import axios from 'axios';


export const FETCH_QUESTION_START = 'FETCH_QUESTION_START';
export const FETCH_QUESTION_FAIL = 'FETCH_QUESTION_FAIL';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';

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

