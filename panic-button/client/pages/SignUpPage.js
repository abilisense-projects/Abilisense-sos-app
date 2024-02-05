import React, { useEffect, useState } from 'react';
import SignUpScreen from '../components/signUp/signUp1';
import SignUp2 from '../components/signUp/SignUp2';
import MedicalConditionsComponent from '../components/signUp/SignUp3';
import MedicalConditionsList from '../components/signUp/MedicalConditionsList';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';
import { resetRegisterData } from '../redux/actions/registerActions';

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
    <>
      <TouchableOpacity style={styles.translateButton} onPress={() => {i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}>
        <Text style={styles.translateButtonText}>{i18n.language == "he" ? "English" : "עברית"}</Text>
      </TouchableOpacity>
      {step === 1 && <SignUpScreen onStepChange={handleStepChange} />}
      {step === 2 && <SignUp2 onStepChange={handleStepChange} />}
      {step === 3 && <MedicalConditionsComponent onStepChange={handleStepChange} />}
      {step === 4 && <MedicalConditionsList onStepChange={handleStepChange} />}
    </>
  );
};



const styles = StyleSheet.create({
  translateButton: {
    // position: 'absolute',
    padding: 10,
    margin: 10,
  },
  translateButtonText: {
    color: 'blue',
  },
});

export default SignUpPage;