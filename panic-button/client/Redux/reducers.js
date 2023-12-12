import { combineReducers } from 'redux';

const userReducer = (state = {
  username: null,
}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;

