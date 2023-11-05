
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Alert,
  PanResponder
} from 'react-native';
import Color from '../../components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api_url from '../../../ApiUrl';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import socketServcies from '../../socketServices';
import io from 'socket.io-client';

import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
// import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

const mainChat = ({ route, navigation }) => {

  const { chatId, chatName, chatImage } = route.params
  console.log(chatId, chatName)

  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);

  const blankPressedHandle = () => {
    viewRef.current.blur();
  };

  const changeTextHandle = (value) => {
    setInvitees(value ? value.split(',') : []);
  };

  useFocusEffect(
    React.useCallback(
      async () => {
        const chatId = await AsyncStorage.getItem('mainuserId');
        const chatNamess = await AsyncStorage.getItem('chatuserName');

        const myinvites = ('abvcer' + chatId ? 'abvcer' + chatId.split(',') : []);

        console.log(invitees, 'my invites')

        // Simulated auto login if there is login info cache
        setUserID(chatId);
        setUserName(chatNamess);

        // Initialize Zego Cloud video call service
        ZegoUIKitPrebuiltCallService.init(
          578362321,
          '5d1024e91a8474af89d5f3f9a1a116c354c5ca3f53ea2830ddab4e04a4f967d1',
          'zivaj' + userID,
          chatNamess,
          // 'abvcer' + userID,
          [ZIM, ZPNs],
          {
            // innerText:{},
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

      }, []));


  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }


  useFocusEffect(React.useCallback(() => {
    socketServcies.initializeSocket()

  }, []))








  const storeId = async (name) => {
    try {
      await AsyncStorage.setItem("chatuserName", JSON.stringify(name));
    } catch (error) {
      console.log(error);
    }
  };



  const [aChat, setAChat] = useState([])


  useEffect(() => {
    setInterval(async () => {
      const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
      axios.get(`${api_url}/chat/get/${chatId}/${userId}`).then((res) => {
        console.log(res.data);
        setAChat(res.data?.data)
      })
    }, 1000)
  }, [])

  const flatListRef = useRef(null);

  // Function to scroll to the bottom of the FlatList
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // Whenever aChat is updated, scroll to the bottom
  // useEffect(() => {
  //   scrollToBottom();
  // }, [aChat]);


  useFocusEffect(
    React.useCallback(() => {
      functionGet()
    }, [])
  )

  const [myChat, setMyChat] = useState()
  const [my, setMy] = useState()
  const [Other, setOther] = useState()
  const [disable, setDisable] = useState(false)



  const functionGet = async () => {



    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    setMyChat(userId)

    axios.get(`${api_url}/chat/get/${chatId}/${userId}`).then((res) => {
      console.log(res.data);
      setAChat(res.data?.data)
    })



    axios.get(`${api_url}/users/my/${userId}`).then((res) => {
      console.log(res.data);
      setMy(res.data.data);
      storeId(res.data?.data?.firstName)
      if (res.data.data?.calls !== '1') {
        // showToast('error', 'You did not buy any package')
        setDisable(true)
      }
    })



    axios.get(`${api_url}/users/my/${chatId}`).then((res) => {
      console.log(res.data.data.calls, 'asdgjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
      setOther(res.data.data);
      if (res.data.data?.calls !== '1') {
        showToast('error', res.data.data?.firstName + ' ' + 'did not buy any package')
        setDisable(true)
      }
    })




    console.log(my.calls, 'calllllllllllllllllllsssssssssssss')







  }




  const [text, setText] = useState('');

  const sendMessage = async () => {
    if (text.trim()) {

      const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

      console.log(userId, '=========================');

      const params = {
        'fromUserId': userId,
        'toUserId': chatId,
        'sendBy': userId,
        'message': text
      }

      fetch(`${api_url}/chat/create`, {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(params),
      }).then(response => response.json()).then(async (data) => {
        console.log(data)
        scrollToBottom()
        if (data.status === 'ok') {
          const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

          axios.get(`${api_url}/chat/get/${chatId}/${userId}`).then((res) => {
            console.log(res.data);
            setAChat(res.data?.data)
          })
          setText('');
        } else if (data.status === 'fail') {
          showToast('error', data?.message)
          navigation.replace('premium')
        }
      })




    }
  };



  // 58645001693403
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />

      {/*Chat Header  */}
      <View style={styles.headerContainer}>
        <View style={styles.backBtn}>
          <AntDesign name={'left'} color="black" size={22} onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.headerTxtContainer}>
          <Text style={styles.headerTxt}>{chatName}</Text>
        </View>
        <View style={styles.rightIconsContainer}>
          {!disable ?
            <>
              <ZegoSendCallInvitationButton
                invitees={[`zivaj${chatId}`].map((inviteeID) => ({
                  userID: inviteeID,
                  userName: chatName,
                }))}
                isVideoCall={false}
                resourceID={"zegouikit_call"}

              />

              <ZegoSendCallInvitationButton
                invitees={[`zivaj${chatId}`].map((inviteeID) => ({
                  userID: inviteeID,
                  userName: chatName,
                }))}
                isVideoCall={true}
                resourceID={"zegouikit_call"}

              />

            </>
            : <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => {
              if (Other?.calls !== '1') {
                showToast('error', Other?.firstName + ' ' + ' did not buy any package')
              }

              else if (my?.calls !== '1') {
                showToast('error', 'You did not buy any package')
              }

            }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray', width: 35, height: 35, borderRadius: 35 }}>
                <Ionicons name='call' color='gray' size={20} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray', width: 35, height: 35, borderRadius: 35 }}>
                <MaterialIcons name='videocam-off' color='gray' size={20} />
              </View>


            </TouchableOpacity>}







          {/* <TouchableOpacity>
          <FontAwesome name={'phone'} color={'black'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={createRoom}>
          <FontAwesome name={'video-camera'} color={'black'} size={24} />
          </TouchableOpacity> */}
          {/* <View style={styles.headerMenu}>
            <Entypo name={'dots-three-vertical'} color={'white'} size={16} />
          </View> */}
        </View>
      </View>
      {/* Chats Data */}

      <FlatList
        ref={flatListRef}
        data={aChat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.log(item?.sendBy, 'sendby');
          console.log(myChat, 'mychat');
          console.log(item?.sendBy === myChat.toString(), 'mychat');

          return (

            <>
              <View
                style={{
                  alignSelf: item.sendBy === myChat.toString() ? 'flex-end' : 'flex-start',
                }}>
                <View style={{ padding: 10, flexDirection: 'row' }}>

                  <Text
                    style={{
                      backgroundColor: item.sendBy === myChat.toString() ? Color.primary : '#eee',
                      padding: 10,
                      // borderRadius: ,
                      color: item.sendBy === myChat.toString() ? 'white' : 'black',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: item.sendBy === myChat.toString() ? 10 : 0,
                      borderBottomRightRadius: item.sendBy === myChat.toString() ? 0 : 10,
                      margin: 5,
                    }}>
                    {item.message}
                  </Text>
                </View>
              </View>
            </>
          )
        }}
      />

      {/* Bottom Tabs Container */}
      <View style={styles.bottomSheet}>
        <Entypo name="plus" color={'black'} size={24} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor={'gray'}
            value={text}
            onChangeText={setText}
          />

        </View>

        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Feather name={'send'} color={'black'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default mainChat;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 70,
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    height: 50,
    width: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTxtContainer: { height: '100%', width: '60%', justifyContent: 'center' },
  headerTxt: { color: 'black', fontSize: 18 },
  rightIconsContainer: {
    height: 40,
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  headerMenu: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#676767',
    borderRadius: 20,
  },
  bottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: "98%",
    marginHorizontal: "1%",
    // backgroundColor: '#676767',
    borderWidth: 1, borderColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputContainer: {
    height: 45,
    width: '75%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    marginHorizontal: 10,
    borderRadius: 100,
  },
  sendBtn: {
    backgroundColor: '#f1f1f1',
    height: 45,
    width: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { width: '80%', color: 'black', fontSize: 13 },
});