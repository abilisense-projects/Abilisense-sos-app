import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioRecordingComponent = ({ onRecordingComplete }) => {
    // State variables to manage recording status and last recorded URI
    const [isListening, setIsListening] = useState(true);
    const [isCurrentlyRecording, setIsCurrentlyRecording] = useState(false);
    const [lastRecordingUri, setLastRecordingUri] = useState(null);

    // Effect hook to manage the recording lifecycle
    useEffect(() => {
        console.log("hi! i'm in AudioRecordingComponent");
        let isComponentMounted = true; // Flag to track component's mount status

        // Function to handle the recording process
        const handleRecording = async () => {
            // Guard clauses to prevent unnecessary recording starts
            if (!isComponentMounted || !isListening || isCurrentlyRecording) return;

            // Request permissions and set up the audio environment
            setIsCurrentlyRecording(true);
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissions not granted');
                setIsCurrentlyRecording(false);
                return;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Start recording
            const recording = new Audio.Recording();
            try {
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();

                // Wait for 5 seconds (5000 milliseconds)
                await new Promise(resolve => setTimeout(resolve, 5000));

                // Stop recording and get the URI
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                console.log("uri:", uri);
                onRecordingComplete(uri); // Callback with the recording URI
                setLastRecordingUri(uri); // Update state with the last recording URI
            } catch (error) {
                console.error('Error during recording', error);
            } finally {
                // Start the next recording if conditions are met
                if (isComponentMounted) {
                    setIsCurrentlyRecording(false);
                    if (isListening) handleRecording();
                }
            }
        };

        // Initiate recording if listening is enabled
        if (isListening) handleRecording();

        // Clean-up function to set the component mount flag to false
        return () => { isComponentMounted = false; };
    }, [isListening]);

    // Function to toggle the listening state
    const toggleListening = () => setIsListening(!isListening);

    // Function to play the last recorded audio
    const playRecording = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            await sound.playAsync();
        } catch (error) {
            console.error('Error during playback', error);
        }
    };

    // Render the component UI
    return (
        <View>
            <TouchableOpacity onPress={toggleListening}>
                <Image
                    source={isListening ? require('../../assets/greenIcon.png') : require('../../assets/grayIcon.png')}
                    style={{ width: 100, height: 100 }}
                />
            </TouchableOpacity>
            {lastRecordingUri && (
                <Button title="Play Last Recording" onPress={() => playRecording(lastRecordingUri)} />
            )}
        </View>
    );
};

export default AudioRecordingComponent;
