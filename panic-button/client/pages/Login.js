import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { loginValidationSchema } from '../config/ValidationSchemas';
import { Yup } from '../config/ValidationSchemas';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/actions';
import { useSelector } from 'react-redux';
import { BY_EMAIL_AND_PASSWORD, SERVER_BASE_URL } from '@env';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     const checkLoggedInUser = async () => {
  //       try {
  //         const emailUser = await AsyncStorage.getItem('email');
  //         const passwordUser = await AsyncStorage.getItem('password');
  //         if (emailUser !== null && passwordUser !== null) {
  //           navigation.navigate('HomeScreem');
  //         } else {
  //           console.log('No user is logged in');
  //         }
  //       } catch (e) {
  //         console.error('Error fetching user data:', e);
  //       }
  //     };
  //     checkLoggedInUser();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleLogin = async () => {
    try {
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });

      const response = await checkEmailAndpassword(email, password)
      // console.log(response.user)
      // console.log('after checkEmailAndpassword')
      if (response.success === true) {
        // console.log('in the if...')
        dispatch(loginSuccess(response.user));
        // console.log('after dispach')
        await AsyncStorage.setItem('email', response.user.email);
        await AsyncStorage.setItem('password', response.user.password);
        // console.log('after AsyncStorage')
        navigation.navigate('HomeScreem');
      } else {
        // console.error('Invalid credentials');
        setErrorMessage('user name or password invalid');
      }

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

  const checkEmailAndpassword = async (email, password) => {
    // try {
      const url = SERVER_BASE_URL + BY_EMAIL_AND_PASSWORD;
      return await axios.post(url, { email, password })
      .then(response => {
        console.log('Data in checkEmailAndpassword:', response.data);
        return response.data
      })
      // .catch(error => {
      //   // console.error('Error:', error);
      //   // console.log('error')
      // });
    }
    // catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  
  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Button
          title="Register"
          style={styles.register}
          onPress={() => navigation.navigate('SignUpPage')}
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
        onPress={() => navigation.navigate('check')}
      >
        Forgot Password?
      </Text>
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );}

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