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



// import React, { useState } from 'react';
// import SignUpScreen from '../components/signUp/signUp1';
// import SignUp2 from '../components/signUp/SignUp2';
// import MedicalConditionsComponent from '../components/signUp/SignUp3';
// import MedicalConditionsList from '../components/signUp/MedicalConditionsList';

// const SignUpPage = () => {
//   const [step, setStep] = useState(1);
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [data1,setData1]=useState({});

//   const handleStepChange = (newStep) => {
//     console.log(newStep);
//     setStep(newStep);
//   };

//   const handleSelectCondition = (condition) => {
//     setSelectedConditions([...selectedConditions, condition]);
//   };

//   const handleData = (data) =>{
//     setData1(data)
//   }

//   return (
//     <>
//       {step === 1 && <SignUpScreen onStepChange={handleStepChange} handleData={handleData}/>}
//       {step === 2 && <SignUp2 onStepChange={handleStepChange}/>}
//       {step === 3 && (
//         <MedicalConditionsComponent
//           onStepChange={handleStepChange}
//           selectedConditions={selectedConditions}
//           addCondition={(condition) => handleSelectCondition(condition)}
//           removeCondition={(condition) => setSelectedConditions(selectedConditions.filter((c) => c !== condition))}
//           dataFromSignUp1={data1}
//         />
//       )}
//       {step === 4 && (
//         <MedicalConditionsList
//           onStepChange={handleStepChange}
//           addConditionButton={(condition) => handleSelectCondition(condition)}
//         />
//       )}
//     </>
//   );
// };

// export default SignUpPage;











//ישן טוב
// import React, { useState } from 'react';
// import SignUpScreen from '../components/signUp/signUp1';
// import SignUp2 from '../components/signUp/SignUp2';
// import MedicalConditionsComponent from '../components/signUp/SignUp3';
// import MedicalConditionsList from '../components/signUp/MedicalConditionsList';

// const SignUpPage = () => {
//   const [step, setStep] = useState(1);

//   const handleStepChange = (newStep) => {
//     setStep(newStep);
//   };

//   return (
//     <>
//       {step === 1 && <SignUpScreen onStepChange={handleStepChange}/>}
//       {step === 2 && <SignUp2 onStepChange={handleStepChange} />}
//       {step === 3 && <MedicalConditionsComponent onStepChange={handleStepChange}/>}
//       {step === 4 && <MedicalConditionsList onStepChange={handleStepChange}/>}
//     </>
//   );
// };

// export default SignUpPage;





// //2

// // import React, { useState } from 'react';
// // import SignUpScreen from '../components/signUp/signUp1';
// // import SignUp2 from '../components/signUp/SignUp2';
// // import MedicalConditionsComponent from '../components/signUp/SignUp3';
// // import MedicalConditionsList from '../components/signUp/MedicalConditionsList';


// // const SignUpPage = () => {
// //   const [step, setStep] = useState(1);
// //   const [selectedConditions, setSelectedConditions] = useState([]);

// //   const handleStepChange = (newStep) => {
// //     setStep(newStep);
// //   };

// //   const handleSelectCondition = (condition) => {
// //     setSelectedConditions([...selectedConditions, condition]);
// //     // setStep(4); // Assuming you want to move to step 4 after selecting conditions
// //   };

// //   return (
// //     <>
// //       {step === 1 && <SignUpScreen onStepChange={handleStepChange} />}
// //       {step === 2 && <SignUp2 onStepChange={handleStepChange} />}
// //       {step === 3 && (
// //         <MedicalConditionsComponent
// //           onStepChange={handleStepChange}
// //           onSelectCondition={handleSelectCondition}
// //         />
// //       )}
// //       {step === 4 && (
// //         <MedicalConditionsList
// //           onStepChange={handleStepChange}
// //           onSelectCondition={handleSelectCondition} // Pass the prop here
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default SignUpPage;

