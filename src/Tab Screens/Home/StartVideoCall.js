import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { useFocusEffect } from '@react-navigation/native';

const StartVideoCall = (props) => {


  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);

  const blankPressedHandle = () => {
    viewRef.current.blur();
  };

  const changeTextHandle = (value) => {
    setInvitees(value ? value.split(',') : []);

    console.log(value)
  };


    useEffect(async () => {
      const chatId = await AsyncStorage.getItem('mainuserId');
      const chatName = await AsyncStorage.getItem('mainuserName');

      // Simulated auto login if there is login info cache
      setUserID(chatId);
      setUserName(chatName);

      // Initialize Zego Cloud video call service
      ZegoUIKitPrebuiltCallService.init(
        578362321,
        '5d1024e91a8474af89d5f3f9a1a116c354c5ca3f53ea2830ddab4e04a4f967d1',
        'abvcer' + userID,
        'abvcer' + userID,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: require('./IPhone Call Tone.mp3'),
            outgoingCallFileName: require('./Msn Outgoing Ctone.mp3'),
          },
          notifyWhenAppRunningInBackgroundOrQuit: true,
          isIOSSandboxEnvironment: true,
          androidNotificationConfig: {
            channelID: 'ZegoUIKit',
            channelName: 'ZegoUIKit',
          },
        }
      );
    }, [])






  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={styles.container}>
        <Text>Your user id: {userID}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={viewRef}
            style={styles.input}
            onChangeText={changeTextHandle}
            placeholder="Invitees ID, Separate ids by ','"
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map((inviteeID) => ({
              userID: inviteeID,
              userName: 'user_' + inviteeID,
            }))}
            isVideoCall={false}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map((inviteeID) => ({
              userID: inviteeID,
              userName: 'user_' + inviteeID,
            }))}
            isVideoCall={true}
          />
        </View>
        <View style={{ width: 220, marginTop: 100 }}>
          <Button
            title="Back To Login Screen"
            onPress={() => {
              props.navigation.navigate('home');
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});

export default StartVideoCall;
