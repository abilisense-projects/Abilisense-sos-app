import axios from 'axios';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicalConditions, removeMedicalCondition } from '../../redux/actions/registerActions';
import { useNavigation } from '@react-navigation/native';
import { SERVER_BASE_URL } from '@env';

const MedicalConditionsComponent = ({ onStepChange }) => {
  const [newCondition, setNewCondition] = useState('');

  const user = useSelector((state) => state.register.userData);
  const address = useSelector((state) => state.register.addressData);
  const medicalConditions = useSelector((state) => state.register.medicalConditions);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const data = ({
    fname: user.firstname,
    lname: user.lastname,
    email: user.email,
    password: user.password,
    phone: address.phoneNumber,
    address:
    {
      country: address.country, city: address.city, street: address.street, buildingNumber: address.buildingNumber,
      floor: address.floor, apartmentNumber: address.apartmentNumber, comments: address.additionalNotes
    },
    dateOfBirth: address.dateOfBirth,
  })


  const handleSelectConditions = (condition) => {
    // Check if the condition is not already in the list
    if (!medicalConditions.includes(condition)) {
      dispatch(addMedicalConditions(condition));
    }
    setNewCondition('');
  };

  const GoToLoginPage = async () => {
    console.log("data!!!!", data);
    const clientData = await insertClientDataIntoDB(data);
    console.log("clientData!!!!!", clientData);
    if (clientData) {
      const medicalConditionsInserted = await insertmedicalConditionsInDB(clientData._id);
      if (medicalConditionsInserted) {
        navigation.navigate("Login");
        console.log("Moved to login!!!")
      }
    }
    else {
      console.log("Didn't moved to login!!!")
    }
  }

  const insertClientDataIntoDB = async (ClientData) => {
    try {
      console.log(ClientData);
      return await axios.post(`http://localhost:3000/api/patients//add-patient/`, ClientData)
        .then(response => {
          console.log(response.data);
          return response.data
        })
        .catch(error => {
          console.error(error);
        });
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const insertmedicalConditionsInDB = async (patient_id) => {
    const url = `${SERVER_BASE_URL}/api/medicalConditions/add-medical-conditions/`;
    const data = { patient: patient_id, medicalConditions: medicalConditions };

    try {
      const response = await axios.post(url, data);
      console.log("response.data:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


  const removeCondition = (conditionToRemove) => {
    dispatch(removeMedicalCondition(conditionToRemove));
  };

  const renderConditions = () => {
    return medicalConditions.map((condition, index) => (
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
        <TouchableOpacity onPress={() => handleSelectConditions(newCondition)}>
          <Text style={styles.addButton}>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={() => GoToLoginPage()}>
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