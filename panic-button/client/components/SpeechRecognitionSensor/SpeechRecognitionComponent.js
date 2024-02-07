import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const SpeechRecognitionComponent = ({ audioUri }) => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    console.log("i'm in SpeechRecognitionComponent");
    // const sendAudioToGoogleSpeechToText = async () => {
    //   let audioData;
    //   if (Platform.OS !== 'web') {
    //     // Native platform: Convert file to base64
    //     const fileInfo = await FileSystem.getInfoAsync(audioUri);
    //     audioData = await FileSystem.readAsStringAsync(fileInfo.uri, { encoding: 'base64' });
    //   } else {
    //     // Web platform: Convert Blob to base64
    //     const reader = new FileReader();
    //     reader.readAsDataURL(audioUri);
    //     reader.onloadend = () => {
    //       const base64data = reader.result.split(',')[1];
    //       audioData = base64data;
    //     };
    //     await new Promise(resolve => reader.onload = resolve);
    //   }

    //   // Send base64 audio data to Google Speech-to-Text API
    //   const response = await axios.post(
    //     'https://speech.googleapis.com/v1/speech:recognize?key=YOUR_GOOGLE_CLOUD_API_KEY',
    //     {
    //       config: {
    //         encoding: 'LINEAR16',
    //         languageCode: 'en-US',
    //       },
    //       audio: {
    //         content: audioData,
    //       },
    //     }
    //   );
    //   setTranscript(response.data.results.map(result => result.alternatives[0].transcript).join('\n'));
    // };

    // if (audioUri) {
    //   sendAudioToGoogleSpeechToText();
    // }
  }, [audioUri]);

  return (
    <View>
      <Text>Transcript: {transcript}</Text>
    </View>
  );
};

export default SpeechRecognitionComponent;