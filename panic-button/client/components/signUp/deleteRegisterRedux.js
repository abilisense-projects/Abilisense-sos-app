import { setUserData, setAddressData, addMedicalConditions } from '../../redux/actions/registerActions';

export const deleteRegisterReduxFun = (dispatch) => {
    console.log("i'm in deleteRegisterReduxFun");
    // Reset user data
    dispatch(setUserData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    }));

    // Reset address data
    dispatch(setAddressData({
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
    }));

    // Reset medical conditions
    dispatch(addMedicalConditions([]));
};