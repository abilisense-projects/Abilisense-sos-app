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
      // const { token } = response.data; // Assuming server responds with a token upon successful login
      // if (token) {
      //   // Save the token securely (you can use AsyncStorage for this)
      //   // await AsyncStorage.setItem('token', token);
      //   // Assuming your backend responds with a success message upon successful authentication
        if (response.data && response.data.success) {
          console.log('Login successful');
          navigation.navigate('Home');
        } else {
          console.error('Invalid credentials');
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
