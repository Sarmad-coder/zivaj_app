
import React, { useState, useRef } from 'react';
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
import { AntDesign, Entypo, Feather, FontAwesome } from 'react-native-vector-icons';

// import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

const adminChat = ({ route, navigation }) => {

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }


  const [visible, setVisible] = useState(false);

  const { chatId, chatName } = route.params
  console.log(chatId)



  const [aChat, setAChat] = useState([])


  useFocusEffect(
    React.useCallback(() => {
      functionGet()
    }, [])
  )

  const [myChat, setMyChat] = useState()


  useEffect(()=>{
    setInterval(async()=>{
      const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    setMyChat(userId)

    axios.get(`${api_url}/adminUserChat/get/${userId}`).then((res) => {
      console.log(res.data);
      setAChat(res.data?.data)
    })
    },1000)
  },[])

  



  const functionGet = async () => {

    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    setMyChat(userId)

    axios.get(`${api_url}/chat/get/${chatId}/${userId}`).then((res) => {
      console.log(res.data);
      setAChat(res.data?.data)
    })
  }






  const hideMenu = () => setVisible(false);

  const showMenu = index => {
    setVisible(true);
  };
  const [messages, setMessages] = useState([
    {
      text: 'Hello dani How are your\n doing?',
      isSelf: false,
    },
  ]);
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
      }).then(response => response.json()).then(async(data) => {
        console.log(data)
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



  const ChatMessage = ({ message }) => {
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // Implement the swipe to reply logic here
        },
        onPanResponderRelease: (evt, gestureState) => {
          // Reset the component state here
        },
      })
    ).current;

    return (
      <View {...panResponder.panHandlers}>
        <Text>{message.text}</Text>
      </View>
    );
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
          <FontAwesome name={'phone'} color={'black'} size={24} />
          <FontAwesome name={'video-camera'} color={'black'} size={24} />
          {/* <View style={styles.headerMenu}>
            <Entypo name={'dots-three-vertical'} color={'white'} size={16} />
          </View> */}
        </View>
      </View>
      {/* Chats Data */}

      <FlatList
        data={aChat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>{
          console.log(item?.sendBy,'sendby');
          console.log(myChat, 'mychat');
          console.log(item?.sendBy===myChat.toString(), 'mychat');

          return( 

          <>
            <View
              style={{
                alignSelf: item.sendBy === myChat.toString() ? 'flex-end' : 'flex-start',
              }}>
              <View style={{ padding: 10, flexDirection: 'row' }}>

                <Text
                  onLongPress={() => {
                    // alert('hello long press!')
                    showMenu(item.sendBy === myChat.toString());
                  }}
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
              {/* <Menu
              visible={visible}
              anchor={item.sendBy===myChat}
              onRequestClose={hideMenu}>
              <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
              <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
              <MenuItem disabled>Disabled item</MenuItem>
              <MenuDivider />
              <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
            </Menu> */}
            </View>
          </>
        )}}
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
      {/* <View style={{ height: '100%', alignItems: 'center',position:"absolute", justifyContent: 'center' }}>
    
    </View> */}
    </View>
  );
};

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

export default adminChat;