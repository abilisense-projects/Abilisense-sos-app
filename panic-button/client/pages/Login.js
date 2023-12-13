// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
// import * as Yup from 'yup';
// import axios from 'axios';
// // import {AsyncStorage} from '@react-native-async-storage/async-storage';
// // import jwt_decode from 'jwt-decode';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .matches(
//       /^(?=.*[0-9])(?=.*[a-zA-Z])/,
//       'Password must include at least one letter and one number'
//     )
//     .required('Password is required'),
// });

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const handleLogin = async () => {
//     try {
//       await LoginSchema.validate({ email, password }, { abortEarly: false });

//       // Make a POST request to your Node.js backend for user authentication- need the code from node
//       const response = await axios.post('YOUR_LOGIN_ENDPOINT', {
//         email,
//         password,
//       });
//       const { token } = response.data; // Assuming server responds with a token upon successful login

//       if (token) {
//         // Save the token securely (you can use AsyncStorage for this)
//         await AsyncStorage.setItem('token', token);

//         // Decode the token to extract user data if needed
//         const decodedToken = jwt_decode(token);
//         console.log(decodedToken);


//         // Assuming your backend responds with a success message upon successful authentication
//         if (response.data && response.data.success) {
//           console.log('Login successful');
//           navigation.navigate('Home');
//         } else {
//           console.error('Invalid credentials');
//         }}
//       } catch (error) {
//         if (error instanceof Yup.ValidationError) {
//           const yupErrors = {};
//           error.inner.forEach((e) => {
//             yupErrors[e.path] = e.message;
//           });
//           setErrors(yupErrors);
//         }
//         console.error(error.message);
//       }
//     };

//     return (
//       <View style={styles.container}>
//         <View style={styles.registerContainer}>
//           <Button title="Register" style={styles.register} onPress={() => navigation.navigate('Register')} />
//         </View>
//         <Text style={styles.header}>Login</Text>
//         <TextInput
//           style={[styles.input, errors.email && styles.invalidInput]}
//           placeholder="Email"
//           onChangeText={(text) => {
//             setEmail(text);
//             setErrors({ ...errors, email: '' });
//           }}
//           value={email}
//         />
//         {errors.email && <Text style={styles.warningText}>{errors.email}</Text>}

//         <TextInput
//           style={[styles.input, errors.password && styles.invalidInput]}
//           placeholder="Password"
//           secureTextEntry
//           onChangeText={(text) => {
//             setPassword(text);
//             setErrors({ ...errors, password: '' });
//           }}
//           value={password}
//         />
//         {errors.password && <Text style={styles.warningText}>{errors.password}</Text>}

//         <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
//           Forgot Password?
//         </Text>
//         <Button title="Login" onPress={handleLogin} />
//       </View>
//     );
//   };

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios';
import { loginValidationSchema } from '../config/ValidationSchemas';
import { Yup } from '../config/ValidationSchemas';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    try {
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });

      // Make a POST request to your Node.js backend for user authentication- need the code from node
      const response = await axios.post('YOUR_LOGIN_ENDPOINT', {
        email,
        password,
      });
      const { token } = response.data; // Assuming server responds with a token upon successful login

      if (token) {
        // Save the token securely (you can use AsyncStorage for this)
        await AsyncStorage.setItem('token', token);

        // Assuming your backend responds with a success message upon successful authentication
        if (response.data && response.data.success) {
          console.log('Login successful');
          navigation.navigate('Home');
        } else {
          console.error('Invalid credentials');
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((e) => {
          yupErrors[e.path] = e.message;
        });
        setErrors(yupErrors);
      }
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Button
          title="Register"
          style={styles.register}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={[styles.input, errors.email && styles.invalidInput]}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
          setErrors({ ...errors, email: '' });
        }}
        value={email}
      />
      {errors.email && <Text style={styles.warningText}>{errors.email}</Text>}
  
      <TextInput
        style={[styles.input, errors.password && styles.invalidInput]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          setErrors({ ...errors, password: '' });
        }}
        value={password}
      />
      {errors.password && <Text style={styles.warningText}>{errors.password}</Text>}
  
      <Text
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '25%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  warningText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  forgotPassword: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  register: {
    fontSize: 16,
    color: 'blue',
  },
  registerContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
});

export default Login;


//login good validations not nice
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';


// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isEmailValid, setIsEmailValid] = useState(true); // State to track email validation
//   const [isPasswordValid, setIsPasswordValid] = useState(true); // State to track password validation
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;888
//     return emailRegex.test(email);
//   };
//   const validatePassword = (password) => {
//     // Password length validation (minimum 6 characters)
//     const isLengthValid = password.length >= 6;
//     // Password special character validation
//     const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
//     const hasSpecialCharacter = specialCharacterRegex.test(password);
//     // Password alphanumeric validation
//     const alphanumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
//     const isAlphanumeric = alphanumericRegex.test(password);
//     // Update password validation state
//     setIsPasswordValid(isLengthValid && hasSpecialCharacter && isAlphanumeric);
//     return isLengthValid && hasSpecialCharacter && isAlphanumeric;
//   };
//   const handleLogin = async () => {
//     try {
//       // Validate email format
//       setIsEmailValid(validateEmail(email));
//       if (!isEmailValid) {
//         console.error('Invalid email format');
//         return;
//       }
//       // Validate password
//       if (!validatePassword(password)) {
//         console.error('Invalid password format');
//         return;
//       }
//       // Connect to MongoDB and verify user credentials
//       // Replace the next line with the actual logic for connecting to MongoDB
//       // const user = await usersCollection.findOne({ email, password });
//       const user = { username: 'test' }; // Example user object
//       if (!user) {
//         console.error('Invalid credentials');
//         return;
//       }

//       console.log(state)
//       // Create JWT token
//       // Replace the next line with the actual logic for creating a JWT token
//       // const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       const token = 'example_token'; // Example token
//       // Store token in local storage and navigate to the home screen
//       // Replace the next line with the actual logic for storing the token
//       // await AsyncStorage.setItem('token', token);
//       console.log('Login successful');
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error(error.message);5
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//         <Button title="Register" style={styles.register} onPress={() => navigation.navigate('Register')}>
//         </Button>
//       </View>
//       <Text style={styles.header}>Login</Text>
//       <TextInput
//         style={[styles.input, !isEmailValid && styles.invalidInput]}
//         placeholder="Email"
//         onChangeText={(text) => {
//           setEmail(text);
//           // Reset email validation on input change
//           setIsEmailValid(true);
//         }}
//         value={email}
//       />
//       {!isEmailValid && <Text style={styles.warningText}>Invalid email format</Text>}
//       <TextInput
//         style={[styles.input, !isPasswordValid && styles.invalidInput]}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={(text) => {
//           setPassword(text);
//           // Reset password validation on input change
//           setIsPasswordValid(true);
//         }}
//         value={password}
//       />
//       {!isPasswordValid && (
//         <Text style={styles.warningText}>
//           Password must be at least 6 characters long and include at least one special character and one number.
//         </Text>
//       )}
//       <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
//         Forgot Password?
//       </Text>
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     fle5x: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '25%',
//     height: 20,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//   },
//   invalidInput: {
//     borderColor: 'red',
//   },
//   warningText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   forgotPassword: {
//     fontSize: 16,
//     color: 'blue',
//     textDecorationLine: 'underline',
//     marginBottom: 10,
//   },
//   register: {
//     fontSize: 16,
//     color: 'blue',
//     flex: 1,
//     justifyContent: "flex-start",
//     // alignSelf: "flex-end"

//   },
// });
// export default Login;
