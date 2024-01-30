import React, { useState } from 'react';
import { View } from 'react-native';
import AudioRecordingComponent from '../components/SpeechRecognitionSensor/AudioRecordingComponent';
import SpeechRecognitionComponent from '../components/SpeechRecognitionSensor/SpeechRecognitionComponent';

const SpeechRecognitionPage = () => {
  const [audioUri, setAudioUri] = useState(null);

  const handleRecordingComplete = (uri) => {
    setAudioUri(uri);
  };

  return (
    <View>
      <AudioRecordingComponent onRecordingComplete={handleRecordingComplete} />
      {audioUri && <SpeechRecognitionComponent audioUri={audioUri} />}
    </View>
  );
};

export default SpeechRecognitionPage;
