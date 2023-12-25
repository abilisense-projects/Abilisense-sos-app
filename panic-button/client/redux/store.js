import { createStore, combineReducers } from 'redux';
import registerReducers from './reducers/registerReducers';
import userReducer from './reducers/reducers';

const combinedReducers = combineReducers({
  root: rootReducer,
  register: registerReducers,
});
const store = createStore(combinedReducers);
export default store;