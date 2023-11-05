import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Container} from '../components/container';
import {CustomButton} from '../components/customButton';
import {useIsFocused} from '@react-navigation/native';
// import routes from '../navigation/routes';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
// import { TwilioVideo } from 'react-native-twilio-video-webrtc';
import {useFocusEffect} from '@react-navigation/native';
import MainBtn from '../../components/MainBtn';
import socketServcies from '../../socketServices';
import { connect } from 'twilio-video';



export const TVideoCall = ({route,navigation}) => {


  const { chatId, chatName,chatImage,tokens } = route.params

  const AuthSelector = [];
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2NmMGYzOGYxYjc5ZDI0ZDllZTIzODhkZjI2ZDQ4ZTY1LTE2ODI1MzkyMjIiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJNdWJlZW4iLCJ2aWRlbyI6eyJyb29tIjoiNjQyYzIxOTA5ZDE4MDU5NGQ1M2Y2MjJmNjI2OCJ9fSwiaWF0IjoxNjgyNTM5MjIyLCJleHAiOjE2ODI1NDI4MjIsImlzcyI6IlNLY2YwZjM4ZjFiNzlkMjRkOWVlMjM4OGRmMjZkNDhlNjUiLCJzdWIiOiJBQzIxMTEyMThmYWVkYmQzYmRhYjFjZGZjNDExNDcwM2VlIn0.1_WGNLFk05T-Zp7lBAM80SsOZV7l4Rs8rXZbVfy6mDE',
  );

  const [timestamp, settimestamp] = useState(new Date().getTime());
  // console.log('Time stamp for video call ================', timestamp);
  useEffect(() => {

    const mytoken=JSON.parse(tokens)

    console.log(mytoken.data,'aaaaa')

    

connect(mytoken.data, { name:mytoken.room }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});

  }, []);

  // useEffect(() => {

  // }, []);

  useFocusEffect(
    React.useCallback(() => {

      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(
        `http://handybrosapp-8566.twil.io/video-token?identity=${AuthSelector?.fullName}&roomID=${AuthSelector._id}${AuthSelector.otp}`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          setToken(result);
          var requestOptions = {
            method: 'POST',
            redirect: 'follow',
          };
          // console.log('all link ', `https://app.handybros.com/APIRequest.php?t=${timestamp}6&sid=${AuthSelector._id}&e=${AuthSelector.email}&fn=
          // ${AuthSelector?.fullName}&dev=${AuthSelector.otp}`);
          fetch(
            `https://app.handybros.com/APIRequest.php?t=${timestamp}6&sid=${AuthSelector._id}&e=${AuthSelector.email}&fn=
          ${AuthSelector?.fullName}&dev=${AuthSelector.otp}`,

            requestOptions,
          )
            .then(response => response.text())
            .then(async result1 => {
              const data = JSON.parse(result1);
              console.log('result data------', data?.req_Room);

              // setTimeout(async () => {
              if (Platform.OS === 'android') {
                await _requestAudioPermission();
                await _requestCameraPermission();
              }
              twilioVideo.current.connect({
                accessToken: result,
                enableNetworkQualityReporting: true,
                dominantSpeakerEnabled: true,
              });
              setStatus('connecting');
              // }, 10000);
            })
            .catch(error => console.log('error----', error));
        })
        .catch(error => console.log('error', error));
    }, []),
  );

  const twilioVideo = useRef(null);

  const _onConnectButtonPress = async () => {
    if (Platform.OS === 'android') {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    twilioVideo.current.connect({
      accessToken: token,
      enableNetworkQualityReporting: true,
      dominantSpeakerEnabled: true,
    });
    setStatus('connecting');
  };

  const _onEndButtonPress = () => {
    var formdata = new FormData();
    formdata.append('action', 'join_activity');
    formdata.append('activity', 'leave');
    formdata.append('hash', AuthSelector?._id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://support.handybros.com/api/fetcher.php', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const data = JSON.parse(result);
        // if(data?.status === '1'){
        twilioVideo.current.disconnect();
        navigation.goBack();
        // }
      })
      .catch(error => console.log('error', error));
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onShareButtonPressed = () => {
    twilioVideo.current.toggleScreenSharing(!isSharing);
    setIsSharing(!isSharing);
  };

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = () => {
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({error}) => {
    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const newVideoTracks = new Map(videoTracks);
    newVideoTracks.delete(track.trackSid);

    setVideoTracks(newVideoTracks);
  };

  const _onNetworkLevelChanged = ({participant, isLocalUser, quality}) => {
    console.log(
      'Participant',
      participant,
      'isLocalUser',
      isLocalUser,
      'quality',
      quality,
    );
  };

  const _onDominantSpeakerDidChange = ({roomName, roomSid, participant}) => {
    console.log(
      'onDominantSpeakerDidChange',
      `roomName: ${roomName}`,
      `roomSid: ${roomSid}`,
      'participant:',
      participant,
    );
  };

  const _requestAudioPermission = () => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Need permission to access microphone',
        message:
          'To run this demo we need permission to access your microphone',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  };

  const _requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Need permission to access camera',
      message: 'To run this call we need permission to access your camera',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
  };

  const toggleCamera = () => {
    setCameraEnabled(prevCameraEnabled => !prevCameraEnabled);

    var formdata = new FormData();
    formdata.append('action', 'join_activity');
    formdata.append('activity', cameraEnabled ? 'mic_off' : 'camera_on');
    formdata.append('hash', '64932ea505ca097e9e58f2ae6923');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://support.handybros.com/api/fetcher.php', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <>
      {status === 'disconnected' && (
        <View
          heading={route?.params?.type}
          innerStyle={{alignItems: null}}
          textStyle={{marginBottom: 0}}>
          <Text style={styles.text}>You are placed 1 in queue</Text>
          {/* <View style={{marginTop: 30, borderRadius: 20}}>
            <YouTube
              videoId="TGwnBHMPATc" // The YouTube video ID
              // apiKey="AIzaSyCpMuoBdUWV9ScPX3No6x-3P5Iqt8x8uos"
              apiKey="AIzaSyB2Du-PLzhliuNHNVd4Q3tWOsRv7ujpM4c"
              onError={e => console.log(e)}
              play={true}
              style={{height: SIZES.height / 1.8}}
            />
          </View> */}
          <MainBtn
            text={'Back To Home'}
            onPress={() => navigation.goBack()}
            btnStyle={{
              marginTop: 20,
              width: '60%',
              height: 40,
              alignSelf: 'center',
            }}
          />
        </View>
      )}

      {(status === 'connected' || status === 'connecting') && (
        <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>
          <View
            style={{backgroundColor: 'black', height: '30%', width: '100%'}}>
            {cameraEnabled && (
              <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
            )}
          </View>
          <View style={styles.callContainer}>
            {status === 'connected' && (
              <View style={styles.remoteGrid}>
                {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      style={styles.remoteVideo}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  );
                })}
              </View>
            )}

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={_onEndButtonPress}>
                <Text style={{fontSize: 12, color: 'white'}}>End</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={_onMuteButtonPress}>
                <Text style={{fontSize: 12, color: 'white'}}>
                  {isAudioEnabled ? 'Mute' : 'Unmute'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={toggleCamera}
                // onPress={_onShareButtonPressed}
              >
                {cameraEnabled ? (
                  <Text style={{fontSize: 12, color: 'white'}}>Off Camera</Text>
                ) : (
                  <Text style={{fontSize: 12, color: 'white'}}>On Camera</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
        onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#676767',
  },
  callContainer: {
    // flex: 1,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    marginTop: 20,
    // position: 'absolute',
    // bottom: 0,
    // top: 0,
    // left: 0,
    // right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 180,
    position: 'absolute',
    right: 10,
    bottom: 0,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    // marginTop: 20,
    // marginLeft: 10,
    // marginRight: 10,
    width: '100%',
    height: 400,
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 150,
    backgroundColor: 'black',
    width: '100%',
    paddingHorizontal: '5%',
    // backgroundColor: "transparent",
    flexDirection: 'row',
    // alignItems: "center",
    // justifyContent:"flex-end",
    alignItems: 'flex-end',
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  optionButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});