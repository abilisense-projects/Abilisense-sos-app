const initialState = {
    userData:{
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    addressData: {
      phoneNumber: '',
      country: '',
      city: '',
      street: '',
      buildingNumber: '',
      entrance: '',
      floor: '',
      apartmentNumber: '',
      additionalNotes: '',
      dateOfBirth: '',
    },
    medicalConditions: [],
  };
  
  const registerReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        return { ...state, userData: action.payload};
      case 'SET_ADDRESS_DATA':
        return { ...state, addressData: action.payload };
      case 'ADD_MEDICAL_CONDITIONS':
        return { ...state, medicalConditions:[...state.medicalConditions , action.payload ]};
      case 'REMOVE_MEDICAL_CONDITION':
      return {
        ...state,
        medicalConditions: state.medicalConditions.filter(
          (condition) => condition !== action.payload
        ),
      };
      default:
        return state;
    }
  };
  
  export default registerReducers;