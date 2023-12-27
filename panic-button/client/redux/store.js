import { createStore, combineReducers } from 'redux';
import registerReducers from './reducers/registerReducers';
import rootReducer from './reducers/reducers';
// change to toolkit

// Assuming you have multiple reducers, use combineReducers
const combinedReducers = combineReducers({
  root: rootReducer,
  register: registerReducers,
  // Add other reducers as needed
});

const store = createStore(combinedReducers);

export default store;