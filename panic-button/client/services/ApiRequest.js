import React from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';


export const checkIfWordInRecord = async (recording) => {
    const apiUrl = `${SERVER_BASE_URL}/api/speechToText/speech-to-text`;
    const formData = new FormData();
    // Convert audio URI to a blob
    const audioBlob = await fetch(recording).then(response => response.blob());
    // Create a File object from the blob
    const audioFile = new File([audioBlob], `audiofile-1.mp3`, { type: 'audio/mpeg' });

    // Append the audio file and keyword to the form data
    formData.append('recordFile', audioFile);
    formData.append('keyWord', 'help'); // Replace 'your_keyword_here' with the actual keyword

    try {
        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data); // Handle the response from the server
        return response.data;
    } catch (error) {
        console.error('Error sending request:', error);
    }
};

export const addAlert = async (transcription, user) => {
    const url = `${SERVER_BASE_URL}/api/alerts/add-alert/`;

    console.log('user:', user);

    const alertData = {
        patient: user._id,
        distressDescription: transcription,
        status: 'not treated',
        location: user.address,
        level: 'Medium',
    };

    try {
        const response = await axios.post(url, alertData);
        return response;
    } catch (error) {
        console.error('Error sending data to the server:', error);
    }
};
