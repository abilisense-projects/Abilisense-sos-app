import React, { useState } from 'react';
import SignUpScreen from '../components/signUp/signUp1';
import SignUp2 from '../components/signUp/SignUp2';
import MedicalConditionsComponent from '../components/signUp/SignUp3';
import MedicalConditionsList from '../components/signUp/MedicalConditionsList';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [selectedConditions, setSelectedConditions] = useState([]);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleSelectCondition = (condition) => {
    setSelectedConditions([...selectedConditions, condition]);
  };

  return (
    <>
      {step === 1 && <SignUpScreen onStepChange={handleStepChange} />}
      {step === 2 && <SignUp2 onStepChange={handleStepChange} />}
      {step === 3 && (
        <MedicalConditionsComponent
          onStepChange={handleStepChange}
          selectedConditions={selectedConditions}
          addCondition={(condition) => handleSelectCondition(condition)}
          removeCondition={(condition) => setSelectedConditions(selectedConditions.filter((c) => c !== condition))}
        />
      )}
      {step === 4 && (
        <MedicalConditionsList
          onStepChange={handleStepChange}
          addConditionButton={(condition) => handleSelectCondition(condition)}
        />
      )}
    </>
  );
};

export default SignUpPage;