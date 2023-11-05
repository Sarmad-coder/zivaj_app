import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import Color from '../../components/Color'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Modal from "react-native-modal";
import api_url from '../../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import { FontAwesome, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Toast from 'react-native-toast-message';
import OpenWhatsapp from '../../OpenWhatsapp';
import openDialPad from '../../OpenPhoneDial';
import openGmail from '../../OpenGmail';


const YouLiked = ({ navigation }) => {

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const [suser,setSuser]=useState({})
  const [myuser,setMyuser]=useState({})

  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const [allUser, setAllUser] = useState([])


  useFocusEffect(
    React.useCallback(() => {
      functionGet()
    }, [])
  )



  const functionGet = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

    axios.get(`${api_url}/follow/get/${userId}`).then((res) => {
      console.log(res.data);
      setAllUser(res.data.data)
    })


    axios.get(`${api_url}/users/my/${userId}`).then((res) => {
      console.log(res.data);
      setMyuser(res.data.data)
    })
  }


  const submitFollow = async (fid, name) => {

    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

    const params = {
      'fromUserId': userId,
      'toUserId': fid,
      'follow': name
    }


    fetch(`${api_url}/follow/create`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(params),
    }).then(response => response.json()).then(data => {
      console.log(data)
      if (data.status === 'ok') {
        showToast('success', `You ${name} this user!`);
        functionGet()


      } else if (data.status === 'fail') {
        showToast('error', data?.message)
      }
    })


    // axios.post(`${api_url}follow/create`, params).then((res) => {
    //   if (res.data.status === 'ok') {
    //     showToast('success', `You ${name} this posts!`);

    //   }
    //   else {
    //     showToast('error', res.data.message);
    //   }
    // })


  }


  return (
    <View>
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#EC302E',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { navigation.navigate('home') }}>
            <AntDesign size={25} color={'white'} name="arrowleft" />
          </TouchableOpacity>
          <Text style={{
            color: 'white',
            fontSize: 20,
          }}>Your Liked Users</Text>
        </View>
      </View>




      <Modal isVisible={isModalVisible} coverScreen={false}>
        <View style={{ backgroundColor: 'white', width: '100%', height: responsiveHeight(17), top: responsiveHeight(37), elevation: 5 }}>
          <View style={{ flexDirection: 'row', height: 50, width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontSize: 12 }}>
              To connect her Directly
            </Text>
            <TouchableOpacity style={{ width: 130, height: 30, backgroundColor: '#E4C549', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              navigation.navigate('premium')
              setModalVisible(false)
            }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>Go Premium Now</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setModalVisible(false)}>
              <FontAwesome name="times" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', height: 67, width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>

            {<TouchableOpacity onPress={()=>OpenWhatsapp(suser?.phoneNumber,myuser?.premium)} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../../components/Images/whatsapp.png')} />
              <Text style={{ fontSize: 12,color: "black" }}>Whatsapp</Text>
            </TouchableOpacity>}
            
            {myuser?.myFollow && myuser?.myFollow.includes(suser?.id)?<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('mainChat', { 'chatId': suser?.id, 'chatName': suser?.firstName + ' ' + suser?.lastName })}>
              <Image style={{ width: 40, height: 35 }} source={require('../../components/Images/chat.png')} />
              <Text style={{ fontSize: 12,color: "black" }}>Chat</Text>
            </TouchableOpacity>:<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => showToast('error', "You can't chat because of no matches found.")}>
              <Image style={{ width: 40, height: 35 }} source={require('../../components/Images/chat.png')} />
              <Text style={{ fontSize: 12,color: "black" }}>Chat</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={()=>openDialPad(suser?.phoneNumber,myuser?.premium)} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../../components/Images/phone.png')} />
              <Text style={{ fontSize: 12,color: "black" }}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openGmail(suser?.email,myuser?.premium)} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../../components/Images/chat2.png')} />
              <Text style={{ fontSize: 12,color: "black" }}>Email</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>







      <ScrollView style={{ width: '100%', height: '90%', padding: 20 }}>


        {allUser.length > 0 ? allUser.map(i => {
          if (i?.follow === 'like') {
            return (
              <>
                <View style={styles.card}>
                  <ImageBackground style={styles.cardImage} source={{ uri: i?.userTo?.image1.length > 0 ? i?.userTo?.image1 : 'https://res.cloudinary.com/ddu4sybue/image/upload/v1677572160/Group_6_ijye6n.png' }} >
                    <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
                      <LinearGradient colors={[
                        'rgba(0,0,0,0.0)',
                        'rgba(0,0,0,0.5)',
                        'rgba(0,0,0,0.7)',

                      ]}>


                        <View style={{ padding: 20 }}>
                          <View>
                            <TouchableOpacity pressRetentionOffset={true} style={{ zIndex: 9999 }} onPress={() => navigation.navigate('viewProfile', { 'pairuserid': i?.userTo?.id })}>

                              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} >

                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 18, height: 18, resizeMode: 'cover' }} />
                                <Text style={styles.cardTitle}>{i?.userTo?.firstName + ' ' + i?.userTo?.lastName}</Text>
                              </View>

                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                              <View style={{ backgroundColor: 'black', padding: 3, borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>. Online</Text>
                              </View>
                              <View style={{ backgroundColor: 'black', padding: 3, borderRadius: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Image source={require('../../components/Images/relationIcon.png')} style={{ width: 10, height: 10, resizeMode: 'cover' }} />
                                <Text style={{ color: 'white', fontSize: 12 }}>
                                  You and Her
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={{ color: 'white', fontSize: 12 }}>{i?.userTo?.dob}, {i?.userTo?.height} </Text>
                              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}> . {i?.userTo?.workingAs} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10 }}>

                              {i?.follow === 'like' ?
                                <TouchableOpacity onPress={() => submitFollow(i?.toUserId, 'like')}>
                                  <FontAwesome name="heart" size={30} color="red" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => submitFollow(i?.toUserId, 'like')}>
                                  <FontAwesome name="heart" size={30} color="white" />
                                </TouchableOpacity>
                              }
                              <TouchableOpacity onPress={() => submitFollow(i?.toUserId, 'pass')}>
                                <FontAwesome name="times" size={30} color="white" />
                              </TouchableOpacity>
                            </View>
                          </View>

                        </View>
                        <View style={{ borderTopColor: 'white', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>

                          <Text style={{ color: 'white', fontSize: 12, fontStyle: 'italic' }}>Did you like this profile? </Text>
                          <TouchableOpacity onPress={() => {
                            setSuser(i?.userTo)
                            toggleModal()}}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Connect Now </Text>
                          </TouchableOpacity>
                          <Image source={require('../../components/Images/greenTick.png')} style={{ width: 20, height: 20, resizeMode: 'cover' }} />
                        </View>


                      </LinearGradient>
                    </View>



                  </ImageBackground>
                </View>

              </>
            )
          }
        }) : null}





      </ScrollView>



    </View>
  )
}

export default YouLiked



const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: '95%',
    maxWidth: 320,
    height: 380,
  },
  card: {
    backgroundColor: '#aaa',
    width: '100%',
    maxWidth: 350,
    height: 400,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 15
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardTitle: {
    // position: 'absolute',
    bottom: 0,
    padding: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}