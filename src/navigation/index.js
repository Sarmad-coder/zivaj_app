import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackNavigationList } from './navigationlist';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNav = () => {




  const onUserLogin = async (userID, userName, props) => {

    const chatId = await AsyncStorage.getItem("mainuserId")
    const chatName = await AsyncStorage.getItem("chatuserName")

    if(chatId.length>0 || chatId!=='' || chatId!==null){
      return ZegoUIKitPrebuiltCallService.init(
        578362321,
        '5d1024e91a8474af89d5f3f9a1a116c354c5ca3f53ea2830ddab4e04a4f967d1',
        'zivaj'+chatId,
        chatName,
        [ZIM,ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: require('./IPhone Call Tone.mp3'),
            outgoingCallFileName: require('./Msn Outgoing Ctone.mp3'),
          },
          requireConfig: (data) => {
            return {
              durationConfig: {
                isVisible: true,
                onDurationUpdate: (duration) => {
                  console.log('########CallWithInvitation onDurationUpdate', duration);
                  if (duration === 10 * 60) {
                    ZegoUIKitPrebuiltCallService.hangUp();
                  }
                }
              },
              topMenuBarConfig: {
                buttons: [
                  ZegoMenuBarButtonName.minimizingButton,
                ],
              },
              onWindowMinimized: () => {
                console.log('[Demo]CallInvitation onWindowMinimized');
                props.navigation.navigate('HomeScreen');
              },
              onWindowMaximized: () => {
                console.log('[Demo]CallInvitation onWindowMaximized');
                props.navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
              },
            }
          }
        }
      );

    }

    


  }


  onUserLogin()

  return (
    <NavigationContainer>

      <ZegoCallInvitationDialog />

      <Stack.Navigator initialRouteName={stackNavigationList[0].name}>
        {stackNavigationList.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{ headerShown: false }}
            />
          )
        })}

        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name 
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />
      </Stack.Navigator>


      <ZegoUIKitPrebuiltCallFloatingMinimizedView />
    </NavigationContainer>
  );
};

export default MainNav