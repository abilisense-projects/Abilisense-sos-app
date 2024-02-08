import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import { signUpValidationSchema } from '../../config/ValidationSchemas';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressData } from '../../redux/actions/registerActions';
import { useTranslation } from 'react-i18next';

const SignUp2 = ({ onStepChange }) => {
  const addressData = useSelector((state) => state.register.addressData);
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    phoneNumber: addressData.phoneNumber,
    dateOfBirth: addressData.dateOfBirth,
    country: addressData.country,
    city: addressData.city,
    street: addressData.street,
    buildingNumber: addressData.buildingNumber,
    entrance: addressData.entrance,
    floor: addressData.floor,
    apartmentNumber: addressData.apartmentNumber,
    additionalNotes: addressData.additionalNotes,
  });

  const placeholderText = {
    phoneNumber: t('Phone number'),
    dateOfBirth: t('YYYY-MM-DD'),
    country: t('Country'),
    city: t('City'),
    street: t('Street'),
    buildingNumber: t('Building number'),
    entrance: t('Entrance'),
    floor: t('Floor'),
    apartmentNumber: t('Apartment number'),
    additionalNotes: t('Additional notes'),
  };

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (key, text) => {
    setFormData({ ...formData, [key]: text });
    setErrors({ ...errors, [key]: null }); // Reset error when the user starts typing
  };

  const isFieldValid = (key) => {
    if (formData[key] && !errors[key]) {
      // Check validation conditions
      try {
        signUpValidationSchema(t).validateSyncAt(key, formData);
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
        {key === 'dateOfBirth' ? t('Date of birth') : formData[key] ? placeholderText[key] : ''}
      </Text>
    );
  };

  const handleSignUp = (newStep) => {
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      try {
        signUpValidationSchema(t).validateSyncAt(key, formData);
      } catch (validationError) {
        formErrors[key] = validationError.message;
      }
    });

    if (Object.keys(formErrors).length === 0) {
      // No errors, proceed to the next step
      setErrors({});
      // Send data to store
      dispatch(setAddressData(formData));
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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>{("Sign Up - Step 2")}</Text>

          {Object.keys(formData).map((key) => (
            <View key={key} style={styles.inputContainer}>
              {renderLabel(key)}
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFieldValid(key)
                    ? 'green'
                    : errors[key]
                      ? 'red'
                      : 'gray',
                }}
                placeholder={placeholderText[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                value={formData[key]}
                keyboardType={key === 'dateOfBirth' ? 'numeric' : 'default'}
              />
              {isFieldValid(key) && (
                <View style={styles.iconContainer}>
                  <MaterialIcons name="check" size={24} color="green" style={styles.icon} />
                </View>
              )}
              {errors[key] && <Text style={styles.error}>{errors[key]}</Text>}

              {key === 'dateOfBirth' && (
                <Text style={styles.additionalText}>
                  {t("Year-Month-Day")}
                </Text>
              )}
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonPrev} onPress={() => onStepChange(1)}>
              <Text style={styles.buttonText}>{t("Prev")}</Text>
            </Pressable>

            <Pressable style={styles.buttonNext} onPress={() => handleSignUp(3)}>
              <Text style={styles.buttonText}>{t("Next")}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, // Add padding bottom to accommodate buttons
    height: '80%', // Limit the height of ScrollView to 80% of the screen height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
    width: '80%', // Added for consistent width with SignUpScreen
  },
  input: {
    width: '100%', // Adjusted width for consistency
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: 'gray', // Changed default border color to gray
    borderRadius: 8,
    marginBottom: 5,
    fontSize: 18,
    height: 40, // Set a fixed height for the input
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
    justifyContent: 'center', // Center the buttons horizontally
    width: '80%',
    marginTop: 20,
  },
  buttonPrev: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    maxWidth: 150, // Set your desired maximum width
  },
  buttonNext: {
    backgroundColor: '#E33458',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    maxWidth: 150, // Set your desired maximum width
  },
  icon: {
    marginLeft: 10, // Adjust the margin as needed
  },
  iconContainer: {
    position: 'absolute',
    top: 12,
    right: -22,
  },
  placeholderLabel: {
    position: 'absolute',
    left: 10,
    top: -8,
    fontSize: 12,
    backgroundColor: 'rgb(243, 243, 243)',
    paddingHorizontal: 5,
    color: 'black',
  },
  additionalText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
});

export default SignUp2;
