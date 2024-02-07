import React, { useState } from 'react';
import { View } from 'react-native';
import AudioRecordingComponent from '../components/SpeechRecognitionSensor/AudioRecordingComponent';
import SpeechRecognitionComponent from '../components/SpeechRecognitionSensor/SpeechRecognitionComponent';
import RecordingComponent from '../components/SpeechRecognitionSensor/newRecordingComponent';

const SpeechRecognitionPage = () => {
  const [audioUri, setAudioUri] = useState(null);

  const handleRecordingComplete = (uri) => {
    setAudioUri(uri);
  };

  return (
    <View>
      {/* <RecordingComponent></RecordingComponent> */}
      <AudioRecordingComponent onRecordingComplete={handleRecordingComplete} />
      {audioUri && <SpeechRecognitionComponent audioUri={audioUri} />}
    </View>
  );
};

export default SpeechRecognitionPage;
