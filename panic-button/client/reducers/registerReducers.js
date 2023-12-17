const initialState = {
    userData: {},
    addressData: {},
    medicalConditions: [],
  };
  
  const registerReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        return { ...state, userData: action.payload };
      case 'SET_ADDRESS_DATA':
        return { ...state, addressData: action.payload };
      case 'SET_MEDICAL_CONDITIONS':
        return { ...state, medicalConditions: action.payload };
      default:
        return state;
    }
  };
  
  export default registerReducers;









// registerReducers.js

// import { combineReducers } from 'redux';

// const initialState = {
//   userData: {},
//   addressData: {},
//   medicalConditions: [],
// };

// const userReducer = (state = initialState.userData, action) => {
//   switch (action.type) {
//     case 'SET_USER_DATA':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const addressReducer = (state = initialState.addressData, action) => {
//   switch (action.type) {
//     case 'SET_ADDRESS_DATA':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const medicalConditionsReducer = (state = initialState.medicalConditions, action) => {
//   switch (action.type) {
//     case 'SET_MEDICAL_CONDITIONS':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   userData: userReducer,
//   addressData: addressReducer,
//   medicalConditions: medicalConditionsReducer,
// });

// export default rootReducer;
