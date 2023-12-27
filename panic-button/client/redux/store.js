import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import registerReducers from './reducers/registerReducers';
import userReducer from './reducers/loginReducers';

const rootReducer = combineReducers({
  userReducer: userReducer,
  register: registerReducers,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persistor
  storage, // This is your storage backend (localStorage by default)
  // Optionally, you can whitelist specific reducers to persist
  // whitelist: ['userReducer'],
  //need to check with miri...
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
