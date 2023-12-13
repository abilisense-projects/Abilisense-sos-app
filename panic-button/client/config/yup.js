import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email address'),

    password: Yup.string()
        .required('Password is required')
        .min(12, 'Your password must contain at least 12 characters')
        .matches(/^(?=.*[a-zA-Zא-ת])(?=.*\d)/, 'Password must contain at least:\n  one letter and one number'),
});
