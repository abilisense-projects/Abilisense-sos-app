// import React, { useState, useRef, useEffect } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import { Audio } from 'expo-av';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const RecordingComponent = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const recordingObject = useRef(null);
//   const recordingDuration = 5000; // 5 seconds

//   useEffect(() => {
//     return () => {
//       // Cleanup recording resources if the component unmounts
//       if (isRecording) {
//         stopRecording();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isRecording) {
//       const timer = setTimeout(() => {
//         stopRecording();
//       }, recordingDuration);

//       return () => clearTimeout(timer);
//     }
//   }, [isRecording]);

//   const startRecording = async () => {
//     try {
//       await Audio.requestPermissionsAsync();

//       // Create a new recording object
//       recordingObject.current = new Audio.Recording();
//       await recordingObject.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//       await recordingObject.current.startAsync();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     console.log(recordingObject);
//     try {
//       if (isRecording) {
//         await recordingObject.current.stopAndUnloadAsync();
//         setIsRecording(false);
//       }
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//     }
//   };

//   const handleRecordingToggle = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={handleRecordingToggle}>
//         <MaterialCommunityIcons
//           name={isRecording ? 'microphone' : 'microphone-off'}
//           size={50}
//           color={isRecording ? 'green' : 'gray'}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default RecordingComponent;

import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RecordingComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isScheduledToStop, setIsScheduledToStop] = useState(false);
  const recordingObject = useRef(null);
  const soundObject = useRef(new Audio.Sound());
  const recordingDuration = 5000; // 5 seconds
  const [lastRecordingUri, setLastRecordingUri] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup recording resources if the component unmounts
      if (isRecording) {
        stopRecording();
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        stopRecording();
      }, recordingDuration);

      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();

      // Create a new recording object
      recordingObject.current = new Audio.Recording();
      await recordingObject.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingObject.current.startAsync();
      setIsRecording(true);

      // Reset the flag for the new recording
      setIsScheduledToStop(false);

      // Schedule stopping the recording after the specified duration
      setTimeout(() => {
        stopRecording();
      }, recordingDuration);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (isRecording && !isScheduledToStop) {
        setIsScheduledToStop(true);
        await recordingObject.current.stopAndUnloadAsync();
        setIsRecording(false);

        // Set the last recording URI for playback
        setLastRecordingUri(recordingObject.current.getURI());
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const playLastRecording = async () => {
    try {
      if (lastRecordingUri) {
        await soundObject.current.loadAsync({ uri: lastRecordingUri });
        await soundObject.current.playAsync();
      }
    } catch (error) {
      console.error('Error playing recording:', error);
    }
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleRecordingToggle}>
        <MaterialCommunityIcons
          name={isRecording ? 'microphone' : 'microphone-off'}
          size={50}
          color={isRecording ? 'green' : 'gray'}
        />
      </TouchableOpacity>
      <Button title="Play Last Recording" onPress={playLastRecording} />
    </View>
  );
};

export default RecordingComponent;
