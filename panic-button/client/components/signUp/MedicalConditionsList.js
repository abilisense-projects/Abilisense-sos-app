import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicalConditions } from '../../redux/actions/registerActions';
import medicalConditionsData from '../../medicinenetDiseases'; // Adjust the path accordingly

const MedicalConditionsList = ({ onStepChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredConditions, setFilteredConditions] = useState([]);
  const dispatch = useDispatch();
  const medicalConditions = useSelector((state) => state.medicalConditions);

  const handleInputChange = (text) => {
    setInputValue(text);

    // Filter the list of medical conditions according to the entered input
    const filteredData = text.trim() !== ''
      ? medicalConditionsData
        .filter(conditionObj => conditionObj.disease.toLowerCase().startsWith(text.toLowerCase()))
        .map(conditionObj => conditionObj.disease)
      : [];

    setFilteredConditions(filteredData);
  };

  const handleSelectCondition = (condition) => {
    if (!medicalConditions.includes(condition)) {
      dispatch(addMedicalConditions(condition));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter medical condition"
        value={inputValue}
        onChangeText={handleInputChange}
        style={styles.input}
      />

      {filteredConditions.length > 0 && (
        <FlatList
          data={filteredConditions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectCondition(item)}
              style={styles.conditionButton}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
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




// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { addMedicalConditions } from '../../redux/actions/registerActions';
// import medicalConditionsData from '../../medicinenetDiseases';

// const MedicalConditionsList = ({ onStepChange }) => {
//   const [medicalConditions, setMedicalConditions] = useState([]);
//   const dispach = useDispatch()

//   useEffect(() => {
//     // Extracting values from the "disease" key in the JSON data
//     const conditions = medicalConditionsData.map((conditionObj) => conditionObj.disease);
//     setMedicalConditions(conditions);
//   }, []);

//   const handleSelectCondition = (condition) => {
//    dispach(addMedicalConditions(condition))
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