import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { loginValidationSchema } from '../config/loginValidationSchema';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/loginActions';
import { useSelector } from 'react-redux';
import { BY_EMAIL_AND_PASSWORD, SERVER_BASE_URL } from '@env';
import * as Yup from 'yup';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  // on start the app or on reload check in local-storege If there is a logged in user
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const checkLoggedInUser = async () => {
        try {
          const emailUser = await AsyncStorage.getItem('email');
          const passwordUser = await AsyncStorage.getItem('password');
          if (emailUser !== null && passwordUser !== null) {
            navigation.navigate('Home');
          } else {
            console.log('No user is logged in');
          }
        } catch (e) {
          console.error('Error fetching user data:', e);
        }
      };
      checkLoggedInUser();
    });
    return unsubscribe;
  }, [navigation]);

  //on click the button handelLogin:
  const handleLogin = async () => {
    try {
      //validate the email and password valid 
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });

      // Runs the function that accesses the database and waits for an answer
      const response = await checkEmailAndpassword(email, password)
      if (response.success === true) {
        // save the result - the user details to the redux store
        dispatch(loginSuccess(response.user));
        // set the async-storege for staying connected feature
        await AsyncStorage.setItem('email', response.user.email);
        await AsyncStorage.setItem('password', response.user.password);
        // navigate to home page
        navigation.navigate('Home');
      } else {
        // if the response is not good there is a error on login
        setErrorMessage('user name or password invalid');
      }

      // if there is error show them
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = {};
        error.inner.forEach((e) => {
          yupErrors[e.path] = e.message;
        });
        setErrors(yupErrors);
      }
      setErrorMessage('user name or password invalid');
    }
  };

  // go to DB
  const checkEmailAndpassword = async (email, password) => {
    // build the url from .env file
    const url = SERVER_BASE_URL + BY_EMAIL_AND_PASSWORD;
    //send post request to server
    return await axios.post(url, { email, password })
      .then(response => {
        return response.data
      })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() =>{
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpPage' }]
          });}}
      >
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, errors.email && styles.invalidInput]}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Merge state updates
        }}
        value={email}
      />

      <TextInput
        style={[styles.input, errors.password && styles.invalidInput]}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prevErrors) => ({ ...prevErrors, password: '' })); // Merge state updates
        }}
        value={password}
      />
      
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  input: {
    width: '100%',
    height: 50,
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
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  registerContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  register: {
    fontSize: 16,
    color: 'blue',
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Login;