import React, { useState } from 'react';
import SignUpScreen from '../components/signUp/signUp1';
import SignUp2 from '../components/signUp/SignUp2';
import MedicalConditionsComponent from '../components/signUp/SignUp3';
import MedicalConditionsList from '../components/signUp/MedicalConditionsList';

const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <>
      {step === 1 && <SignUpScreen onStepChange={handleStepChange} />}
      {step === 2 && <SignUp2 onStepChange={handleStepChange} />}
      {step === 3 && <MedicalConditionsComponent onStepChange={handleStepChange}/>}
      {step === 4 && <MedicalConditionsList onStepChange={handleStepChange}/>}
    </>
  );
};

export default SignUpPage;