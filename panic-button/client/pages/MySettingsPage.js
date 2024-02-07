import React, { useState, useEffect } from 'react';
import KeyWordSenserComponent from '../components/mySettingsComponents/KeyWordSenserComponent';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MySettingsPage = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Perform any necessary setup or cleanup here
    return () => {
      // Cleanup code here
    };
  }, []);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <>
      <TouchableOpacity style={styles.translateButton} onPress={() => {i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}>
        <Text style={styles.translateButtonText}>{i18n.language == "he" ? "English" : "עברית"}</Text>
      </TouchableOpacity>
      {step === 1 && <KeyWordSenserComponent onStepChange={handleStepChange} />}
    </>
  );
};

const styles = StyleSheet.create({
  translateButton: {
    padding: 10,
    margin: 10,
  },
  translateButtonText: {
    color: 'blue',
  },
});

export default MySettingsPage;
