import React, { useEffect, useState } from 'react';
import SignUpScreen from '../components/signUp/signUp1';
import SignUp2 from '../components/signUp/SignUp2';
import MedicalConditionsComponent from '../components/signUp/SignUp3';
import MedicalConditionsList from '../components/signUp/MedicalConditionsList';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetRegisterData } from '../redux/actions/registerActions';
import BackButton from '../components/signUp/LoginButton';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to reset the Redux state
    dispatch(resetRegisterData());
  }, [dispatch]);
  const { t, i18n } = useTranslation();

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/AbiliSense_Lgo-sos.png')}
        style={styles.logoImage}
      />

      {/* BackButton */}
      <View style={styles.backButtonContainer}>
        <BackButton
          onPress={() => navigation.navigate('Login')}
          style={styles.backButton}
          textStyle={styles.backButtonText} // Pass the textStyle prop
        />
      </View>
      <View style={styles.languageButtonContainer}>
        <TouchableOpacity style={styles.translateButton} onPress={() => { i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}>
          <Text style={styles.translateButtonText}>{i18n.language == "he" ? "English" : "עברית"}</Text>
        </TouchableOpacity>
      </View>

      {step === 1 && <SignUpScreen onStepChange={handleStepChange} />}
      {step === 2 && <SignUp2 onStepChange={handleStepChange} />}
      {step === 3 && (
        <View style={styles.medicalConditionsContainer}>
          <MedicalConditionsComponent onStepChange={handleStepChange} />
        </View>
      )}
      {step === 4 && <MedicalConditionsList onStepChange={handleStepChange} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoImage: {
    width: 270,
    height: 40,
    marginTop: 20,
  },
  languageButtonContainer: {
    position: 'absolute',
    top: 80,
    right: -30,
    minWidth: 130,
    borderRadius: 20, // Rounded corners
    overflow: 'hidden', // Ensure overflow is hidden to clip the rounded corners
  },
  translateButton: {
    padding: 10,
    backgroundColor: '#E33458', // Background color
  },
  translateButtonText: {
    fontSize: 16,
    color: '#FFFFFF', // Text color
    textAlign: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 80,
    left: -20,
    minWidth: 150,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#E33458',
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  medicalConditionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20, // Adjust this value as needed for proper alignment
  },
});

export default SignUpPage;