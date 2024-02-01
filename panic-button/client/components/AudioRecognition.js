import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioRecognition = ({ isRecording }) => {
    const [recording, setRecording] = useState();
    const [audioFilesArr, setAudioFilesArr] = useState([]);

    const startRecording = async () => {
        console.log("start!!")
        try {
            const recordingObject = new Audio.Recording();
            await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recordingObject.startAsync();
            setRecording(recordingObject);
            return recordingObject; 
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const recored = async () => {
        const newRecording = await startRecording();
        setTimeout(async () => await stopRecording(newRecording), 5000);
    }

    const stopRecording = async (recordingObject) => {
        console.log("stop!!!")
        try {
            await recordingObject.stopAndUnloadAsync();
            const uri = recordingObject.getURI();
            console.log("uri", uri);
            setAudioFilesArr([...audioFilesArr, uri]);
            // setAudioFilesArr((prevFiles) => [...prevFiles,  uri ]);
            console.log(audioFilesArr)
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    useEffect(() => {
        if (isRecording) {
            recored();
        }
        console.log(isRecording);
    }, [isRecording, recored]);

    return null;
};

export default AudioRecognition;
