import * as Yup from 'yup';

// Function to check if a string contains potential malicious code
const isSafeString = (value) => !/<script.*>.*<\/script>/i.test(value);

export const signUpValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('First name is required')
    .matches(/^[A-Za-zא-ת]+$/, 'First name should only contain alphabets')
    .max(50, 'First name is too long'),

  lastname: Yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-zא-ת]+$/, 'Last name should only contain alphabets')
    .max(50, 'Last name is too long'),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Your password must contain at least 8 characters')
    .matches(/^(?=.*[a-zA-Zא-ת])(?=.*\d)/, 'Password must contain at least one letter and one number'),

  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]+$/, 'Phone number should only contain digits'),

  country: Yup.string()
    .required('Country is required')
    .test('is-safe', 'Invalid characters in country', isSafeString),

  city: Yup.string()
    .required('City is required')
    .test('is-safe', 'Invalid characters in city', isSafeString),

  street: Yup.string()
    .required('Street is required')
    .test('is-safe', 'Invalid characters in street', isSafeString),

  buildingNumber: Yup.number()
    .required('Building number is required')
    .typeError('Building number should only contain numbers')
    .positive('Building number should be a positive number')
    .integer('Building number should be an integer'),

  entrance: Yup.string()
    .test('is-safe', 'Invalid characters in entrance', isSafeString),

  floor: Yup.number()
    .required('Floor is required')
    .typeError('Floor should only contain numbers')
    .positive('Floor should be a positive number')
    .integer('Floor should be an integer'),

  apartmentNumber: Yup.number()
    .required('Apartment number is required')
    .typeError('Apartment number should only contain numbers')
    .positive('Apartment number should be a positive number')
    .integer('Apartment number should be an integer'),

  additionalNotes: Yup.string()
    .test('is-safe', 'Invalid characters in additional notes', isSafeString),

  dateOfBirth: Yup.string()
    .required('Date of Birth is required')
    .matches(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid Date of Birth format. Please use YYYY-MM-DD'),
});

// export { Yup };