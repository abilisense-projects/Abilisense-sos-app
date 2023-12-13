import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const MedicalConditionsComponent = ({ onStepChange, selectedConditions, addCondition, removeCondition }) => {
  const [newCondition, setNewCondition] = useState('');

  const handleSelectConditions = (condition) => {
    addCondition(condition);
    setNewCondition('');
  };

  const renderConditions = () => {
    return selectedConditions.map((condition, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => removeCondition(condition)}
        style={styles.selectedConditionButton}
      >
        <Text style={styles.selectedConditionButtonText}>{condition}</Text>
        <Text style={styles.removeButton}>X</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onStepChange(4)} style={styles.selectConditionsButton}>
        <Text style={styles.selectConditionsButtonText}>Select Medical Conditions</Text>
      </TouchableOpacity>

      <View style={styles.selectedConditionsContainer}>{renderConditions()}</View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Other medical condition"
          value={newCondition}
          onChangeText={(text) => setNewCondition(text)}
        />
        <TouchableOpacity onPress={() => addCondition(newCondition)}>
          <Text style={styles.addButton}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrev} onPress={() => onStepChange(2)}>
          <Text style={styles.buttonText}>Prev</Text>
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
  selectConditionsButton: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  selectConditionsButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedConditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedConditionButton: {
    backgroundColor: 'rgb(214, 153, 167)',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedConditionButtonText: {
    color: 'white',
    marginRight: 5,
  },
  removeButton: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    color: 'blue',
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonPrev: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
});

export default MedicalConditionsComponent;