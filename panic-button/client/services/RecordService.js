import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const startRecording = async () => {
    console.log("start!!!")
    try {
        const recordingObject = new Audio.Recording();
        await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recordingObject.startAsync();
        return recordingObject; // Return the recording object for use in other functions
    } catch (error) {
        console.error('Failed to start recording', error);
    }
};

const stopRecording = async (recordingObject) => {
    console.log("stop!!!")
    try {
        await recordingObject.stopAndUnloadAsync();
        const uri = recordingObject.getURI();
        console.log("uri", uri);
    } catch (error) {
        console.error('Failed to stop recording', error);
    }
};

//this fun is just for the developer
export const playRecording = async (uri) => {
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({ uri });
        await soundObject.playAsync();
    } catch (error) {
        console.error('Failed to play recording', error);
    }
};


// Modify recordFor10Seconds function to return a promise
export const recordFor10Seconds = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const newRecording = await startRecording();
            setTimeout(async () => {
                await stopRecording(newRecording);
                const recordingURI = await newRecording.getURI(); // Get the URI of the recording
                resolve(recordingURI); // Resolve the promise with the URI after recording is complete
            }, 5000);
        } catch (error) {
            reject(error); // Reject the promise if an error occurs
        }
    });
}
