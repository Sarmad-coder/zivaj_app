import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SubHeader2 from '../../components/SubHeader2'
import Color from '../../components/Color'
import LinearGradient from 'react-native-linear-gradient'
// import CardStack, { Card } from 'react-native-card-stack-swiper'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import api_url from '../../../ApiUrl'
import { Toast } from 'react-native-toast-message/lib/src/Toast'


const Explore = ({navigation}) => {



  const showToast = (type, text) => {
    Toast.show({
        type: type,
        text1: text,
    });
}


  const [allUser, setAllUser] = useState([])
  const [likeYou, setlikeYou] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      functionGet()
      functionLikeYou()
    }, [])
  )


  
  const functionGet = async () => {

    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

    axios.get(`${api_url}/follow/get/${userId}`).then((res) => {
      console.log(res.data);
      setAllUser(res.data?.data)
    })
  }




  const functionLikeYou = async () => {

    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

    axios.get(`${api_url}/follow/likeYou/${userId}`).then((res) => {
      console.log(res.data);
      setlikeYou(res.data?.data)
    })
  }



  function countLikesAndDislikes(array) {
    const result = { like: 0, pass: 0 };

    array.map(i => {
      if (i?.follow === 'like') {
        result.like++;
      } else if (i?.follow === 'pass') {
        result.pass++;
      }
    })


    return result;
  }


  const count = countLikesAndDislikes(allUser);

  console.log(count)


  return (
    <SafeAreaView>
      <View style={{ marginVertical: 10 }}>
        <SubHeader2 />
      </View>
      <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        <View style={{ width: '95%', alignSelf: "center", height: 400, flexDirection: "row", justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ width: '49%', height: '100%', backgroundColor: Color.primary, borderRadius: 10 }} onPress={async()=>{
            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
            if (userStatus) {
              navigation.navigate('likeBy')
            }
            else {
                showToast('error', 'You are not verfied from admin.')
            }
            }}>
         
            <Text style={{ fontSize: 24, color: 'white', fontWeight: '600', alignSelf: 'center', marginTop: 20 }}>People Liked {"\n"}you</Text>
            <Text style={{ fontSize: 14, color: 'white', marginLeft: 20 }}>{likeYou?.length} People Liked you</Text>
            <View style={{ width: '90%', height: 100, bottom: 0, position: 'absolute', flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ paddingHorizontal: 20, fontSize: 16, color: 'white' }}>Check Now</Text>
              <Image style={{ width: 25, height: 20 }} source={require('../../components/Images/lArrow.png')} />
            </View>
          
          </TouchableOpacity>
          <View style={{ width: '50%', height: '100%', justifyContent: "space-between" }}>
          <TouchableOpacity style={{ width: '100%', height: '49%', backgroundColor: '#3AAE9B', borderRadius: 10 }} onPress={async()=>{
            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
            if (userStatus) {
              navigation.navigate('youLike')
            }
            else {
                showToast('error', 'You are not verfied from admin.')
            }
            }}>
          
              <Text style={{ fontSize: 24, color: 'white', fontWeight: '600', marginTop: 20, marginLeft: 20 }}>I Liked</Text>
              <Text style={{ fontSize: 14, color: 'white', marginLeft: 20 }}>{count?.like} People you liked</Text>
              <View style={{ width: '100%', height: 100, bottom: 0, position: 'absolute', flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ paddingHorizontal: 20, fontSize: 14, color: 'white' }}>Check Now</Text>
                <Image style={{ width: 25, height: 20, marginLeft: 30 }} source={require('../../components/Images/lArrow.png')} />
              </View>
            
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', height: '49%', backgroundColor: '#F9A727', borderRadius: 10 }} onPress={async()=>{
              const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
              if (userStatus) {
                navigation.navigate('youPass')
              }
              else {
                  showToast('error', 'You are not verfied from admin.')
              }
              }}>
 
              <Text style={{ fontSize: 24, color: 'white', fontWeight: '600', marginTop: 20, marginLeft: 20 }}>I Passed</Text>
              <Text style={{ fontSize: 14, color: 'white', marginLeft: 20 }}>{count?.pass} People you passed</Text>
              <View style={{ width: '100%', height: 100, bottom: 0, position: 'absolute', flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ paddingHorizontal: 20, fontSize: 14, color: 'white' }}>Check Now</Text>
                <Image style={{ width: 25, height: 20, marginLeft: 30 }} source={require('../../components/Images/lArrow.png')} />
              </View>
            
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Explore

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    top: responsiveHeight(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: responsiveWidth(90),
    height: 300,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card1: {
    // backgroundColor: '#FE474C',
  },
  card2: {
    // backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  }
});