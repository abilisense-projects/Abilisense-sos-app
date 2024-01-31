import * as Yup from 'yup';

// Function to check if a string contains potential malicious code
const isSafeString = (value) => !/<script.*>.*<\/script>/i.test(value);

export const signUpValidationSchema = (t) => {
  return Yup.object().shape({
    firstname: Yup.string()
      .required(t('First name is required'))
      .matches(/^[A-Za-zא-ת]+$/, t('First name should only contain alphabets'))
      .max(50, t('First name is too long')),

    lastname: Yup.string()
      .required(t('Last name is required'))
      .matches(/^[A-Za-zא-ת]+$/, t('Last name should only contain alphabets'))
      .max(50, t('Last name is too long')),

    email: Yup.string()
      .email(t('Provide a valid email'))
      .required(t('Email is required'))
      .test(
        'Validate Email',
        t('Provide a valid email'),
        (value) => {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(String(value).toLowerCase());
        },
      ),

    password: Yup.string()
      .required(t('Password is required'))
      .min(8, t('Your password must contain at least 8 characters'))
      .matches(/^(?=.*[a-zA-Zא-ת])(?=.*\d)/, t('Password must contain at least one letter and one number')),

    phoneNumber: Yup.string()
      .required(t('Phone Number is required'))
      .matches(/^[0-9]+$/, t('Phone number should only contain digits')),

    country: Yup.string()
      .required(t('Country is required'))
      .test('is-safe', t('Invalid characters in country'), isSafeString),

    city: Yup.string()
      .required(t('City is required'))
      .test('is-safe', t('Invalid characters in city'), isSafeString),

    street: Yup.string()
      .required(t('Street is required'))
      .test('is-safe', t('Invalid characters in street'), isSafeString),

    buildingNumber: Yup.number()
      .required(t('Building number is required'))
      .typeError(t('Building number should only contain numbers'))
      .positive(t('Building number should be a positive number'))
      .integer(t('Building number should be an integer')),

    entrance: Yup.string().test('is-safe', t('Invalid characters in entrance'), isSafeString),

    floor: Yup.number()
      .required(t('Floor is required'))
      .typeError(t('Floor should only contain numbers'))
      .positive(t('Floor should be a positive number'))
      .integer(t('Floor should be an integer')),

    apartmentNumber: Yup.number()
      .required(t('Apartment number is required'))
      .typeError(t('Apartment number should only contain numbers'))
      .positive(t('Apartment number should be a positive number'))
      .integer(t('Apartment number should be an integer')),

    additionalNotes: Yup.string().test('is-safe', t('Invalid characters in additional notes'), isSafeString),

    dateOfBirth: Yup.string()
      .required(t('Date of Birth is required'))
      .matches(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, t('Invalid Date of Birth format. Please use YYYY-MM-DD')),
  });
};
