import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicalConditions } from '../../redux/actions/registerActions';
import medicalConditionsData from '../../medicinenetDiseases'; // Adjust the path accordingly
import { useTranslation } from 'react-i18next';

const MedicalConditionsList = ({ onStepChange }) => {
  const { t, i18n } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [filteredConditions, setFilteredConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null); // Track the selected condition
  const dispatch = useDispatch();
  const medicalConditions = useSelector((state) => state.register.medicalConditions);

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
      setSelectedCondition(condition); // Set the selected condition
    }
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectCondition(item)}
      style={[
        styles.conditionButton,
        selectedCondition === item && styles.selectedConditionButton,
      ]}
    >
      <Text style={[selectedCondition === item && { color: 'white' }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => onStepChange(3)}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter medical condition"
          value={inputValue}
          onChangeText={handleInputChange}
          style={styles.input}
        />
      </View>

      <View style={styles.centeredContainer}>
        {filteredConditions.length > 0 && (
          <FlatList
            data={filteredConditions}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.listContainer} // Added contentContainerStyle
          />
        )}
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginTop: 30,
  },
  input: {
    height: 40,
    borderColor: 'green',
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
    minWidth: 300, // Adjust the minimum width as needed
  },

  selectedConditionButton: {
    backgroundColor: 'blue',
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
  },
  listContainer: {
    alignItems: 'center', // Center the items horizontally
  },
});

export default MedicalConditionsList;
