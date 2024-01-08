import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const AudioRecognition = () => {
  // State variables to manage recording, its status, and the recorded sound URI
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [soundUri, setSoundUri] = useState(null);

  // Function to start recording
  const startRecording = async () => {
    try {
      // Request audio recording permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to record audio was denied');
        return;
      }

      // Create a new recording instance and start recording
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  // Function to stop recording
  const stopRecording = async () => {
    try {
      // Stop the ongoing recording and get the recorded audio URI
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setSoundUri(uri);
      setRecording(undefined);
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  // Function to stop recording completely
  const stopRecordingCompletely = async () => {
    if (recording) {
      try {
        // Stop the ongoing recording and release associated resources
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setSoundUri(uri);
        setRecording(undefined);
        setIsRecording(false);
      } catch (error) {
        console.error('Failed to stop recording completely', error);
      }
    }
  };

  // useEffect hook to manage recording intervals and cleanup
  useEffect(() => {
    let timer;
    const intervalDuration = 5000; // Recording interval duration in milliseconds (e.g., every 5 seconds)
    if (isRecording) {
      // Start an interval to stop and start recording after a specific duration
      timer = setInterval(() => {
        stopRecording(); // Stop the ongoing recording
        startRecording(); // Start a new recording
      }, intervalDuration);
    }
    return () => {
      clearInterval(timer);
      stopRecordingCompletely(); // Stop the ongoing recording on component cleanup
    };
  }, [isRecording]);

  // JSX rendering
  return (
    <div>
      {/* Button to toggle start/stop recording */}
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      
      {/* Button to stop recording completely */}
      <button onClick={stopRecordingCompletely}>Stop Recording Completely</button>
      
      {/* Audio player for the recorded sound */}
      {soundUri && <audio controls src={soundUri} />}
    </div>
  );
};

export default AudioRecognition;
