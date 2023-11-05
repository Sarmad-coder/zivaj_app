import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from '../Tab Screens/Chat';
import Explore from '../Tab Screens/Explore';
import Matches from '../Tab Screens/Matches';
import Profile from '../Tab Screens/Profile';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../components/Color';
import { StatusBar } from 'expo-status-bar';
import Reel from '../Tab Screens/Home/Reel';
import HomeTab from '../Tab Screens/Home/HomeTab';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        tabBarActiveTintColor: Color.primary,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: responsiveWidth(98),
          alignSelf: 'center',
          bottom: 3,
        },
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.4),
        },
      }}
      initialRouteName={'userReligion'}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 27,
                height: 25,
                tintColor: focused ? Color.primary : '#7A7C81',
              }}
              source={require('../components/Images/homeIcon.png')}
            />
          ),
        }}
        name="Home"
        component={HomeTab}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 27,
                height: 25,
                tintColor: focused ? Color.primary : '#7A7C81',
              }}
              source={require('../components/Images/chatIcon.png')}
            />
          ),
        }}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 27,
                height: 25,
                tintColor: focused ? Color.primary : '#7A7C81',
              }}
              source={require('../components/Images/searchIcon.png')}
            />
          ),
        }}
        name="Explore"
        component={Explore}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 27,
                height: 25,
                tintColor: focused ? Color.primary : '#7A7C81',
              }}
              source={require('../components/Images/matchIcon.png')}
            />
          ),
        }}
        name="Matches"
        component={Matches}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 27,
                height: 25,
                tintColor: focused ? Color.primary : '#7A7C81',
              }}
              source={require('../components/Images/profileIcon2.png')}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
