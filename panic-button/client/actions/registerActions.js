 export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });
  
  export const setAddressData = (addressData) => ({
    type: 'SET_ADDRESS_DATA',
    payload: addressData,
  });
  
  export const setMedicalConditions = (conditions) => ({
    type: 'SET_MEDICAL_CONDITIONS',
    payload: conditions,
  });