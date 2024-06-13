// src/reducers/index.js
import { combineReducers } from 'redux';

// Reducers
const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  // Other reducers here...
});

export default rootReducer;