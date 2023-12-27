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