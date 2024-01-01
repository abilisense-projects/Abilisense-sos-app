 export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });
  
  export const setAddressData = (addressData) => ({
    type: 'SET_ADDRESS_DATA',
    payload: addressData,
  });

  export const addMedicalConditions = (conditions) => ({
    type: 'ADD_MEDICAL_CONDITIONS',
    payload: conditions,
  });

  export const removeMedicalCondition = (condition) => ({
    type: 'REMOVE_MEDICAL_CONDITION',
    payload: condition,
  });

  export const resetRegisterData = () => ({
    type: 'RESET_REGISTER_DATA',
  });
  