import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MedicalConditionsList = ({ onStepChange, addConditionButton }) => {
  const medicalConditions = [
    'Gallstones', 'Myocarditis', 'Infertility in Men', 'Infertility in Women', 'Chronic Instability of the Ankle',
    'Alzheimer\'s Disease', 'Endometriosis', 'Insulin', 'Asthma of the Skin in Children', 'Hammer Finger',
  ];

  const handleSelectCondition = (condition) => {
    addConditionButton(condition);
  };

  return (
    <View style={styles.container}>
      <Text>List of Medical Conditions:</Text>
      {medicalConditions.map((condition, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectCondition(condition)}
          style={styles.conditionButton}
        >
          <Text>{condition}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onStepChange(3)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  conditionButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicalConditionsList;

//ישן טוב



// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const MedicalConditionsList = ({ onStepChange }) => {
//   const medicalConditions = [
//     'Gallstones', 'Myocarditis', 'Infertility in Men', 'Infertility in Women', 'Chronic Instability of the Ankle',
//     'Alzheimer\'s Disease', 'Endometriosis', 'Insulin', 'Asthma of the Skin in Children', 'Hammer Finger',
//   ];

//   const handleSelectCondition = (condition) => {
//     addConditionButton(condition);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>List of Medical Conditions:</Text>
//       {medicalConditions.map((condition, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => handleSelectCondition(condition)}
//           style={styles.conditionButton}
//         >
//           <Text>{condition}</Text>
//         </TouchableOpacity>
//       ))}
//       <View style={styles.closeButtonContainer}>
//         <TouchableOpacity style={styles.closeButton} onPress={() => onStepChange(3)}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   conditionButton: {
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 5,
//     alignItems: 'center',
//   },
//   closeButtonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   closeButton: {
//     backgroundColor: 'red',
//     padding: 15,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default MedicalConditionsList;
