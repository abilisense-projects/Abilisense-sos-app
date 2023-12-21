import { createStore } from 'redux';
import registerReducers from './reducers/registerReducers';
//change to toolkit

const store = createStore(registerReducers);

export default store;