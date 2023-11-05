import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, TextInput, PermissionsAndroid } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api_url from '../../../ApiUrl';
import Video from 'react-native-video';
import Toast from 'react-native-toast-message';
import { useWindowDimensions } from 'react-native';
import MyLoader from '../../components/MyLoader';
// import CameraRoll from '@react-native-community/cameraroll';
// import * as MediaLibrary from "expo-media-library";
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
// import BeautifulVideoRecorder from 'react-native-beautiful-video-recorder';

import { Video as VideoCompress } from 'react-native-compressor';
import { useFocusEffect } from '@react-navigation/native';

const VideoCapture = ({ navigation }) => {








  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timerCount, setTimerCount] = useState(5);
  const [timerDisplay, setTimerDisplay] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [cameraType, setCameraType] = useState();

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  };

  const mydevice = useCameraDevices()

  // console.log(cameraRef.current,'mera camera reference')


  const initializeCamera = async () => {
    const devices = await Camera.getAvailableCameraDevices();
    if (devices.length > 0) {
      setSelectedDevice(devices[0]);
      setCameraType(mydevice.back);
      // Choose the first available device
    }
  };




  useFocusEffect(
    React.useCallback(async () => {
      const devices = await Camera.getAvailableCameraDevices();
      const cameraPermission = await Camera.getCameraPermissionStatus()
      const microphonePermission = await Camera.getMicrophonePermissionStatus()

      console.log(cameraPermission)
      console.log(microphonePermission)
      requestMicrophone(); // Ask for camera permission when component mounts
    requestCameraPermission();
      initializeCamera();
    }, [])
  )






  const requestMicrophone = async () => { //replace your function with this code.
    if (Platform.OS === 'android') {
      try {

        const grantedC = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera access to capture photos and videos.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );
        if (grantedC === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          initializeCamera(); // Initialize camera after permission is granted
        } else {
          console.log('Camera permission denied');
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for record audio',
            message: 'Give permission to your device to record audio',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          initializeCamera();
          console.log('permission granted');
        } else {
          console.log('permission denied');
          return;
        }



      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

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


  const startRecording = async () => {
    if (!selectedDevice) {
      // console.log('No available camera device.');
      initializeCamera()
      return startRecording;
    }

    

    setIsRecording(true);
    setRecordingDuration(0);
    const timer = setInterval(() => {
      setRecordingDuration((prevDuration) => prevDuration + 1);
    }, 1000);
    setTimerInterval(timer);


    const videoPath = `${RNFS.DocumentDirectoryPath}/video.mp4`;

    // console.log(videoPath, '=========>>>>> video path =====');

    try {
      const video = await cameraRef.current.startRecording({
        quality: '720p',
        videoBitrate: 2000000,
        maxDuration: 30, // Set the maximum duration in seconds (optional)
        maxFileSize: 100 * 1024 * 1024, // Set the maximum file size in bytes (optional)
        flash: 'on',

        onRecordingFinished: async (video) => {
          const result = await VideoCompress.compress(
            video.path,
            {
              compressionMethod: 'auto',
            },
            (progress) => {
              setVisible(true)
              console.log(progress)
            }
          );
          setVisible(false)
          console.log(result, 'myvideo')
          console.log(video, 'myvideo')
          setIsRecording(false);
          setRecordedUri(result);
          clearInterval(timer);
          setTimerInterval(null);
        },
        onRecordingError: (error) => console.error(error),
        outputPath: videoPath,
      });

    } catch (error) {
      console.log('Recording failed', error);
    }
  };

  const stopRecording = () => {
    if (!cameraRef.current) {
      return;
    }

    cameraRef.current.stopRecording();
    setIsRecording(false);
    setRecordingDuration(0);
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const saveVideo = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem('mainuserId'));
    console.log(userId, '--------------------------------');

    setVisible(true)

    const param = new FormData();
    param.append('userId', userId);
    param.append('about', about);
    param.append('image', {
      uri: recordedUri,
      type: 'video/mp4',
      name: 'video.mp4',
    });

    fetch(`${api_url}/reel/create`, {
      method: 'POST',
      body: param,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'ok') {
          showToast('success', 'Reel Created.');
          navigation.navigate('home');
        } else if (data.status === 'fail') {
          showToast('error', data?.message);
          setVisible(false)
        }
      })
      .catch((err) => {
        console.log(err);
        setVisible(false)
      });
  };



  const requestWriteStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs permission to save videos to the gallery.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };




  const saveVideoToGallery = async (videoUri) => {
    const hasPermission = await requestWriteStoragePermission();

    if (!hasPermission) {
      showToast('error', 'Permission to access storage denied.');
      return;
    }

    try {

      // const LOCAL_PATH_TO_VIDEO = Platform.OS === 'ios' ? `${RNFS.DownloadDirectoryPath}/zivaj.mp4` : `${RNFS.DownloadDirectoryPath}/zivaj.mp4`

      // RNFS.downloadFile({
      //   fromUrl: videoUri,
      //   toFile: LOCAL_PATH_TO_VIDEO,
      // })


      const destinationPath = `${RNFS.DownloadDirectoryPath}/zivaj${Date.now()}.mp4`; // Use ExternalDirectoryPath
      await RNFS.downloadFile({ fromUrl: videoUri, toFile: destinationPath });
      await RNFS.copyFile(videoUri, destinationPath);

      console.log(destinationPath);

      if (Platform.OS === 'android') {
        // Use the MediaScanner to make the video available in the gallery
        await RNFS.scanFile(destinationPath);
      }

      showToast('success', 'Video saved to gallery!');
    } catch (error) {
      console.error('Error saving video to gallery:', error);
    }
  };





  const saveImage = async (uri) => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // Save image to media library
        await MediaLibrary.saveToLibraryAsync(uri);

        showToast('success', "Image successfully saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = () => {
    setRecordedUri(null);
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const renderTimer = () => {
    const minutes = Math.floor(recordingDuration / 60);
    const seconds = recordingDuration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // const openGallery = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     console.log('Permission denied');
  //     return;
  //   }

  //   const mediaResult = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //   });

  //   if (!mediaResult.cancelled) {
  //     setRecordedUri(mediaResult.uri);
  //   }
  // };




  const pickVideo = () => {


      ImagePicker.openPicker({
        // compressImageMaxWidth: 300,
        // compressImageMaxHeight: 300,
        // cropping: true,
        // compressImageQuality: 0.7,
        // multiple: true,
        mediaType: 'video',
      }).then(async(image) => {
        console.log('image data----', image);
        // setImage(image[0].data);
        // console.log(image);


        const result = await VideoCompress.compress(
          image?.path,
          {
            compressionMethod: 'auto',
          },
          (progress) => {
            setVisible(true)
            console.log(progress)
          }
        );
        setVisible(false)
        setRecordedUri(result);



        
      });



  };


  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false); // Add this line



  const toggleFlash = () => {
    if (cameraRef.current) {
      setIsFlashOn((prevIsFlashOn) => !prevIsFlashOn);
      cameraRef.current.setFlash(isFlashOn ? 'off' : 'on');
    }
  };



  const rotateCamera = () => {
    setIsFrontCamera((prevIsFront) => !prevIsFront); // Toggle between front and back cameras
  };

  const changeDuration = () => {
    setTimerCount((prevCountdown => prevCountdown - 1));
  };

  const timer = () => {
    setTimerDisplay(true)

    var timee = 5

    const interval = setInterval(() => {
      if (timee > 0) {
        setTimerCount(prevCountdown => prevCountdown - 1);
        timee -= 1
        console.log(timerCount)
      } else {
        clearInterval(interval);
        setTimerDisplay(false);
        setTimerCount(0);
        startRecording();
      }
    }, 1000);

  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };




  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [about, setAbout] = useState('');


  return (
    <>

      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {visible ? <MyLoader top='45%' /> : null}
        {recordedUri ? (<>
          <View style={{ flex: 1 }}>
            <Video source={{ uri: recordedUri }} autoplay={true} repeat={true} style={{ height: '100%' }} resizeMode="contain" />
            <TouchableOpacity style={{
              position: 'absolute',
              paddingHorizontal: 20,
              paddingVertical: 10,
              width: '90%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 5,
              top: '5%',
              right: '5%'
            }} onPress={() => setModalVisible(true)}>
              {/* <FontAwesome name="comment" size={20} color="white" /> */}
              <Text style={{ color: 'white', fontSize: 14 }}>About Reel</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TextInput placeholder='About your reel...' placeholderTextColor='gray' style={{ color: 'white' }} value={about} onChangeText={(value) => setAbout(value)} />
              </View>
              <TouchableOpacity style={{ backgroundColor: 'red', alignSelf: 'flex-end', padding: 6, borderRadius: 5, paddingHorizontal: 10 }} onPress={saveVideo}>
                <Text style={{ color: 'white' }}>Post a reel</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={deleteVideo}>
                <FontAwesome name="trash" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => saveVideoToGallery(recordedUri)}>
                <FontAwesome name="save" size={20} color="white" />
              </TouchableOpacity>

            </View>
          </View>







        </>
        ) : (
          <View style={{ flex: 1 }}>
            {selectedDevice ? <Camera
              style={{ height: '100%' }}
              ref={cameraRef}
              device={isFrontCamera ? mydevice.front : selectedDevice} // Use the selected device or front camera based on state
              isActive={true}
              video={true}
              audio={true}
              mode="video"
              onCameraReady={handleCameraReady} // Add this line


            /> : <MyLoader top='45%' />}



            <View style={[styles.optionsContainer, { backgroundColor: 'transparent' }]}>
              <TouchableOpacity style={styles.optionButton} onPress={pickVideo}>
                <FontAwesome name="image" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.recordButton} onPressIn={startRecording} onPressOut={stopRecording} disabled={!selectedDevice}>
                <FontAwesome name={isRecording ? 'stop' : 'play'} size={30} color={isRecording ? 'red' : 'black'} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionButton} onPress={rotateCamera}>
                <FontAwesome name="retweet" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{renderTimer()}</Text>
            </View>


            {timerDisplay ? <View style={{ position: 'absolute', top: '50%', left: '50%', alignSelf: 'center' }}>
              <Text style={{ fontSize: 24, color: 'white' }}>{timerCount}</Text>
            </View> : null}

            <View style={{ position: 'absolute', right: 20, bottom: '50%' }}>
              {/* <TouchableOpacity style={styles.optionButton} onPress={toggleFlash}>
          <MaterialCommunityIcons
            name={isFlashOn ? 'flash' : 'flash-off'}
            size={20}
            color="white"
          />
          </TouchableOpacity> */}

              <TouchableOpacity
                style={{ marginBottom: 20, backgroundColor: 'transparent', width: 25, height: 25, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
                onPress={timer}
              >
                <MaterialCommunityIcons name="timer-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>









          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  timerText: {
    fontSize: 20,
    color: 'white',
  },
  recordButton: {
    width: 75,
    height: 75,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 75,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 45,
  },
  optionText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

export default VideoCapture;
