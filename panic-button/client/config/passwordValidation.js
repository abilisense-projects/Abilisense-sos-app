import * as Yup from 'yup';

// Password validation schema
export const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Your password must contain at least 8 characters')
      .matches(/^(?=.*[a-zA-Zא-ת])(?=.*\d)/, 'Password must contain at least one letter and one number'),
  });
  