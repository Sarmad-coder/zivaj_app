import { View, Text, Image } from 'react-native'
import React, {useEffect} from 'react'
import Color from '../../components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import socketServcies from '../../socketServices';
import { io } from 'socket.io-client';
const Splach = ({navigation}) => {


  const storeId = async (value) => {
    try {
      await AsyncStorage.setItem("mainuserId", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

 

  

// storeId(0)


  useEffect(async() => {

    const checkId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

    if(checkId>0){
      storeId(checkId)
    }
    else{
      storeId(0)
    }


    setTimeout(async() => {

      const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

      console.log(userId)
      if(userId> 0) {
        navigation.replace('home')
        // navigation.replace('splach')
      }
      else if(userId===0){
        navigation.replace('splach')
      }

      // navigation.replace('splach')

    }, 3000);
  }, []);
  return (
    <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:Color.primary}}>
      <Image style={{width:'100%' , height:'100%',resizeMode:'cover'}} source={require('../../components/Images/splash.jpg')}/>
    </View>
  )
}

export default Splach