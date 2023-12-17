import { createStore } from 'redux';
import registerReducers from './registerReducers';

const store = createStore(registerReducers);

export default store;