// TensorFlowService.js

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { SERVER_BASE_URL } from '@env';
import { useSelector } from 'react-redux';

const TensorFlowService = () => {
    const user = useSelector((state) => state.userReducer.user);
    const sounds = ["crying"]
    const loadModel = async () => {
        try {
            const model = await tf.loadLayersModel('path/to/model/file/model.json');
            return model;
        } catch (error) {
            console.error('Error loading model:', error);
        }
    }

    const classifySound = async (model, soundData) => {
        try {
            // Convert the input (sound) to the format suitable for the model
            // Adjust the format and data to pass the input to the model

            // Use the model for classification
            const prediction = model.predict(soundData);

            // Process the classification result and return the appropriate result for your application
            // This may include processing and displaying the result to the user
            if (prediction in sounds) {
                return true;
            }
            return false;
            // return prediction;
        } catch (error) {
            console.error('Error classifying sound:', error);
        }
    }

    const openAlert = async (soundData) => {
        const model = await loadModel();
        const isSound = await classifySound(model, soundData);
        if (isSound) {
            const url = `${SERVER_BASE_URL}/api/alerts/add-alert/`;

            const alertData = {
                patient: user._id,
                distressDescription: "unusual noise",
                status: 'not treated',
                location: user.address,
                level: "Medium",
            };
            console.log('alert data', alertData)
            try {
                const response = await axios.post(url, alertData);
                console.log('Response from server: ', response.data);
            } catch (error) {
                console.error('Error sending data to server:', error);
            }
        }
    }

    // const runClassification = async () => {
    //     try {
    //       // Load the model
    //       const model = await TensorFlowService.loadModel();

    //       // Example: The input could come from the microphone or a sound file
    //       // Insert the input suitable for the model here
    //       const soundData = tf.tensor(/* Insert your input data in the appropriate format here */);

    //       // Classify the input
    //       const result = await TensorFlowService.classifySound(model, soundData);

    //       // Process and display the result
    //       console.log('Classification result:', result);
    //     } catch (error) {
    //       console.error('Error running classification:', error);
    //     }
    //   };
}

export default TensorFlowService;
