import {
  FETCH_QUESTION_FAIL,
  FETCH_QUESTION_START,
  FETCH_QUESTION_SUCCESS,
  SUBMIT_QUESTION_FAIL,
  SUBMIT_QUESTION_START,
  SUBMIT_QUESTION_SUCCESS,
} from '../actions';

//add more to inital state when working through app

const initialState = {
  questions: [],
  userAnswer: null,
  error: null,
  fetchingData: false,
  submittingQuestion: false,
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        error: null
      };
    case FETCH_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_QUESTION_START:
      return {
        ...state,
        fetchingData: true,
      }
    case SUBMIT_QUESTION_START:
      return {
        ...state,
        submittingQuestion: true,
      };
    case SUBMIT_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        error: null,
        submittingQuestion: false,
      };
    case SUBMIT_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;