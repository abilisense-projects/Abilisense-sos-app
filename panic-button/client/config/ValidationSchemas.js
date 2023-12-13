
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])/,
      'Password must include at least one letter and one number'
    )
    .required('Password is required'),
});

export const signUpValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('First name is required')
    .matches(/^[A-Za-zא-ת]+$/, 'First name should only contain alphabets')
    .max(50, 'First name is too long'),

  lastname: Yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-zא-ת]+$/, 'Last name should only contain alphabets')
    .max(50, 'Last name is too long'),

  email: Yup.string().required('Email is required').email('Invalid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(12, 'Your password must contain at least 12 characters')
    .matches(/^(?=.*[a-zA-Zא-ת])(?=.*\d)/, 'Password must contain at least one letter and one number'),

  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]+$/, 'Phone number should only contain digits'),

  country: Yup.string(),
  city: Yup.string(),
  street: Yup.string(),
  streetNum: Yup.string(),
  entrance: Yup.string(),
  houseNumber: Yup.string(),

  dob: Yup.string()
    .required('Date of Birth is required')
    .matches(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid Date of Birth format. Please use YYYY-MM-DD'),
});

export { Yup };