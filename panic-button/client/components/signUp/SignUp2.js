import React, { useState } from 'react';
import {
  View,Text,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,StyleSheet,
} from 'react-native';
import { signUpValidationSchema } from '../../config/ValidationSchemas';
import { MaterialIcons } from '@expo/vector-icons';

const SignUp2 = ({ onStepChange }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    country: '',
    city: '',
    street: '',
    buildingNumber: '',
    entrance: '',
    floor: '',
    apartmentNumber: '',
    additionalNotes: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (key, text) => {
    setFormData({ ...formData, [key]: text });
    setErrors({ ...errors, [key]: null }); // Reset error when the user starts typing
  };

  const isFieldValid = (key) => {
    if (formData[key] && !errors[key]) {
      // Check validation conditions
      try {
        signUpValidationSchema.validateSyncAt(key, formData);
        return true;
      } catch (validationError) {
        return false;
      }
    }
    return false;
  };

  const renderLabel = (key) => {
    return (
      <Text style={styles.placeholderLabel}>
        {formData[key] ? key.charAt(0).toUpperCase() + key.slice(1) : ''}
      </Text>
    );
  };

  const handleSignUp = (newStep) => {
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      try {
        signUpValidationSchema.validateSyncAt(key, formData);
      } catch (validationError) {
        formErrors[key] = validationError.message;
      }
    });

    if (Object.keys(formErrors).length === 0) {
      // No errors, proceed to the next step
      setErrors({});
      onStepChange(newStep);
    } else {
      // Validation failed, set the errors
      setErrors(formErrors);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign Up - Step 2</Text>

        {Object.keys(formData).map((key) => (
          <View key={key} style={styles.inputContainer}>
            {renderLabel(key)}
            <TextInput
              style={{
                ...styles.input,
                height: 40, // Set a fixed height for the input
                borderColor: isFieldValid(key)
                  ? 'green'
                  : errors[key]
                  ? 'red'
                  : 'gray',
              }}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              onChangeText={(text) => handleInputChange(key, text)}
              value={formData[key]}
              keyboardType={key === 'dob' ? 'numeric' : 'default'}
            />
            {isFieldValid(key) && (
              <View style={styles.iconContainer}>
                <MaterialIcons name="check" size={24} color="green" style={styles.icon} />
              </View>
            )}
            {errors[key] && <Text style={styles.error}>{errors[key]}</Text>}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonPrev} onPress={() => onStepChange(1)}>
            <Text style={styles.buttonText}>Prev</Text>
          </Pressable>

          <Pressable style={styles.buttonNext} onPress={() => handleSignUp(3)}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center', // Center the icon vertically
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  buttonPrev: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonNext: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  icon: {
    marginLeft: 10, // Adjust the margin as needed
  },
  iconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  placeholderLabel: {
    position: 'absolute',
    left: 10,
    top: -8,
    backgroundColor: 'rgb(243, 243, 243)',
    paddingHorizontal: 5,
    color: 'black',
  },
});

export default SignUp2;