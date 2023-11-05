import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

const VideoRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedVideoPath, setRecordedVideoPath] = useState(null);
  const cameraRef = useRef();
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    requestCameraPermission(); // Ask for camera permission when component mounts
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera access to capture photos and videos.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          initializeCamera(); // Initialize camera after permission is granted
        } else {
          console.log('Camera permission denied');
        }
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    }
  };

  const initializeCamera = async () => {
    const devices = await Camera.getAvailableCameraDevices();
    if (devices.length > 0) {
      setSelectedDevice(devices[0]); // Choose the first available device
    }
  };

  useEffect(() => {
    if (isRecording) {
      const timerId = setInterval(() => {
        setRecordingDuration(prevDuration => prevDuration + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isRecording]);

  const toggleRecording = async () => {
    if (!selectedDevice) {
      console.log('No available camera device.');
      return;
    }

    if (!isRecording) {
      const videoPath = `${RNFS.DocumentDirectoryPath}/myVideo.mp4`;
      try {
        await cameraRef.current.startRecording({
          path: videoPath,
          onRecordingError: (error) => {
            console.error('Recording error:', error);
          },
          onRecordingFinished: async (result) => {
            console.log('Recording finished:', result);
            setRecordedVideoPath(result.video?.path);
          },
          video: true, // Enable video capture
        });
        console.log('Recording started');
      } catch (error) {
        console.error('Recording start error:', error);
      }
    } else {
      try {
        await cameraRef.current.stopRecording();
        console.log('Recording stopped');
        if (recordingDuration >= 30) {
          console.log('Auto-saving video...');
          await cameraRef.current.saveRecording();
          console.log('Video saved');
        }
      } catch (error) {
        console.error('Recording error:', error);
      }
      setRecordedVideoPath(null);
    }
    setIsRecording(!isRecording);
    setRecordingDuration(0);
  };

  return (
    <View style={{ flex: 1 }}>
      {selectedDevice && (
        <Camera
          style={{ flex: 1 }}
          ref={cameraRef}
          device={selectedDevice}
          isActive={true}
          video={true}
          mode="video"
        />
      )}
      {recordedVideoPath && (
        <Video
          source={{ uri: recordedVideoPath }}
          style={{ flex: 1 }}
          resizeMode="contain"
          controls
        />
      )}
      <TouchableOpacity
        onPress={toggleRecording}
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          backgroundColor: isRecording ? 'red' : 'green',
          padding: 10,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: 'white' }}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoRecording;
