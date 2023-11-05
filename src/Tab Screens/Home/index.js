import { View, Text, Image, FlatList, StyleSheet, ImageBackground, ScrollView, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SubHeader2 from '../../components/SubHeader2'
import Color from '../../components/Color';
import LinearGradient from 'react-native-linear-gradient';
import InstaPost from '../../components/Reel';
import SubHeader3 from '../../components/SubHeader3';
import Modal from "react-native-modal";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api_url from '../../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Swiper from 'react-native-deck-swiper';
// import { FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons';

// import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import MyLoader from '../../components/MyLoader';
import OpenWhatsapp from '../../OpenWhatsapp';
import openDialPad from '../../OpenPhoneDial';
import openGmail from '../../OpenGmail';
import socketServcies from '../../socketServices';




const Home = () => {

  const [suser, setSuser] = useState({})
  const [myuser, setMyuser] = useState({})
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);


  const navigation = useNavigation()

  const [myId, setMyId] = useState()
  const [isModalVisible, setModalVisible] = useState(false);

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }


  const storeId = async (status) => {
    try {
      await AsyncStorage.setItem("mainuserStatus", JSON.stringify(status));
    } catch (error) {
      console.log(error);
    }
  };



  const [allUser, setAllUser] = useState([])
  const [reelUser, setReelUser] = useState([])


  useEffect(() => {
    if (allCardsSwiped) {
      swiperRef.current.jumpToCardIndex(0);
      setAllCardsSwiped(false);
    }
  }, [allCardsSwiped]);





  const functionGetReel = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    setMyId(userId)

    axios.get(`${api_url}/follow/get/${userId}`).then((res) => {
      // console.log(res.data, 'reel user=========================>>>>>>>>>>');
      setReelUser(res.data?.data)
    })

    axios.get(`${api_url}/users/my/${userId}`).then((res) => {
      console.log(res.data);
      storeId(res.data.data.status)
      setMyuser(res.data.data)
    })
  }




  const functionNotUse = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    axios.put(`${api_url}/users/notUseApp/${userId}`).then((res) => {
      console.log(res.data, 'notUseApp')
    })
  }







  useFocusEffect(
    React.useCallback(() => {
      functionGetReel()
    }, [])
  )






  useFocusEffect(
    React.useCallback(async () => {
      socketServcies.initializeSocket();
      const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
      axios.get(`${api_url}/users/getAll/${userId}`).then((res) => {
        if (res.data.status === 'ok') {
          setAllUser(res.data.data)
          setVisible(false)
        }




      })

    }, [])
  )



  useFocusEffect(
    React.useCallback(() => {
      functionNotUse()
    }, [])
  )




  const images = [];


  reelUser && reelUser.map(i => {
    if (i?.follow === 'like') {
      images.push({ id: i?.userTo?.id, url: i?.userTo?.image1?.length > 0 ? i?.userTo?.image1 : 'https://res.cloudinary.com/ddu4sybue/image/upload/v1677572160/Group_6_ijye6n.png', label: i?.userTo?.firstName });
    }
  })





  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };




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
      if (data.status === 'ok') {
        showToast('success', `You ${name} this user!`);
        if (swiperRef.current.currentIndex === allUser.length - 1) {
          setAllCardsSwiped(true);
        }
        if (name === 'like') {
          swiperRef.current.swipeRight();
        }
        else if (name === 'pass') {
          swiperRef.current.swipeLeft();
        }


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



  // set last direction and decrease current index
  const swiperRef = useRef(null);


  const onSwiped = (index, direction) => {
    if (swiperRef.current.currentIndex === allUser.length - 1) {
      setAllCardsSwiped(true);
    }
    if (direction === 'right') {
      console.log('Liked');
      const user = allUser[index];
      submitFollow(user?.id, 'like'); // Call API to update follow as 'like'
    } else if (direction === 'left') {
      console.log('Disliked');
      const user = allUser[index];
      submitFollow(user?.id, 'pass'); // Call API to update follow as 'pass'
    }
  };




  const [visible, setVisible] = useState(true);




  return (
    <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>

      {visible ? <MyLoader top='25%' /> : null}

      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Text style={{color:'red',fontSize:20,fontWeight:'500'}}>Lets find your soulmate</Text>
      </View>


      {allUser.length > 0 ?
        <View style={homestyleess.container}>
          <Swiper
            ref={swiperRef}
            cards={allUser}
            onSwiped={(index, direction) => onSwiped(index, direction)}
            cardIndex={0}
            backgroundColor={'#000'}
            stackSize={3}
            stackScale={10}
            stackSeparation={14}
            disableTopSwipe={false}
            disableBottomSwipe={false}
            animateOverlayLabelsOpacity
            animateCardOpacity
            cardVerticalMargin={5}
            containerStyle={{ height: '100%' }}
            renderCard={(i, index) => (

              <>
                <View style={homestyles.card}>
                  <ImageBackground style={homestyles.cardImage} source={{ uri: i?.image1?.length > 0 ? i?.image1 : 'https://res.cloudinary.com/ddu4sybue/image/upload/v1677572160/Group_6_ijye6n.png' }} >
                    <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
                      <LinearGradient colors={[
                        'rgba(0,0,0,0.0)',
                        'rgba(0,0,0,0.5)',
                        'rgba(0,0,0,0.7)',

                      ]}>


                        <View style={{ padding: 20 }}>
                          <View>
                            <TouchableOpacity pressRetentionOffset={true} style={{ zIndex: 9999 }} onPress={async () => {
                              const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                              if (userStatus) {
                                navigation.navigate('viewProfile', { 'pairuserid': i?.id })
                              }
                              else {
                                showToast('error', 'You are not verfied from admin.')
                              }
                            }}>

                              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} >

                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 18, height: 18, resizeMode: 'cover' }} />
                                <Text style={homestyles.cardTitle}>{i?.firstName + ' ' + i?.lastName}</Text>
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
                              <Text style={{ color: 'white', fontSize: 12 }}>{i?.dob}, {i?.height} </Text>
                              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}> . {i?.workingAs} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                              {/* {i?.followTo.length > 0
                              ? i?.followTo.map((ite) => {
                                if (ite?.fromUserId === myId) {
                                  return ( */}
                              <>
                                {i?.myFollow.includes((myId)) ? (
                                  <TouchableOpacity onPress={async () => {
                                    const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                    if (userStatus) {
                                      submitFollow(i?.id, 'like')
                                    }
                                    else {
                                      showToast('error', 'You are not verfied from admin.')
                                    }
                                  }}>
                                    <FontAwesome name="heart" size={30} color="red" />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity onPress={async () => {
                                    const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                    if (userStatus) {
                                      submitFollow(i?.id, 'like')
                                    }
                                    else {
                                      showToast('error', 'You are not verfied from admin.')
                                    }
                                  }}>
                                    <FontAwesome name="heart" size={30} color="white" />
                                  </TouchableOpacity>
                                )}
                              </>
                              {/* );
                                }
                                return null;
                              })
                              : (
                                <TouchableOpacity onPress={() => submitFollow(i?.id, 'like')}>
                                  <FontAwesome name="heart" size={30} color="white" />
                                </TouchableOpacity>
                              )
                            } */}
                              <TouchableOpacity onPress={async () => {
                                const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                if (userStatus) {
                                  submitFollow(i?.id, 'pass')
                                }
                                else {
                                  showToast('error', 'You are not verfied from admin.')
                                }
                              }}>
                                <FontAwesome name="times" size={30} color="white" />
                              </TouchableOpacity>
                            </View>

                          </View>

                        </View>
                        <View style={{ borderTopColor: 'white', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>

                          <Text style={{ color: 'white', fontSize: 12, fontStyle: 'italic' }}>Did you like this profile? </Text>
                          <TouchableOpacity onPress={async () => {
                            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                            if (userStatus) {
                              setSuser(i)
                              toggleModal()
                            }
                            else {
                              showToast('error', 'You are not verfied from admin.')
                            }

                          }}>
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
          />

        </View >
        :
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Image source={{ uri: 'https://www.citypng.com/public/uploads/small/11639594337wbxvgbyuzdm9bgbuyrdtztulrs37rnnxig3hapvpw10pbdyuz8tiq8jgyp7e4iif0ecrfsuqqlrngy3dvgrstfuasisyxnd35lzt.png' }} style={{ width: 100, height: 100 }} resizeMode='contain' />
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
            No Users found!
          </Text>
        </View>
      }










      {/* Model */}
      <Modal isVisible={isModalVisible} coverScreen={false}>
        <View style={{ backgroundColor: 'white', width: '100%', height: responsiveHeight(17), top: responsiveHeight(7), elevation: 5 }}>
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
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FontAwesome name="times" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', height: 67, width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>

            {<TouchableOpacity onPress={() => OpenWhatsapp(suser?.phoneNumber, myuser?.premium)} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../../components/Images/whatsapp.png')} />
              <Text style={{ fontSize: 12, color: "black" }}>Whatsapp</Text>
            </TouchableOpacity>}

            {myuser?.myFollow && myuser?.myFollow.includes(suser?.id) ? <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('mainChat', { 'chatId': suser?.id, 'chatName': suser?.firstName + ' ' + suser?.lastName })}>
              <Image style={{ width: 40, height: 35 }} source={require('../../components/Images/chat.png')} />
              <Text style={{ fontSize: 12, color: "black" }}>Chat</Text>
            </TouchableOpacity> : <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => showToast('error', "You can't chat because of no matches found.")}>
              <Image style={{ width: 40, height: 35 }} source={require('../../components/Images/chat.png')} />
              <Text style={{ fontSize: 12, color: "black" }}>Chat</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => openDialPad(suser?.phoneNumber, myuser?.premium)} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../../components/Images/phone.png')} />
              <Text style={{ fontSize: 12, color: "black" }}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openGmail(suser?.email, myuser?.premium)} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: 35, height: 35 }} source={require('../../components/Images/chat2.png')} />
              <Text style={{ fontSize: 12, color: "black" }}>Email</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>



    </View >
  )
}

export default Home




const homestyleess = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});








const homestyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: responsiveWidth(90),
    height: 450,
    // backgroundColor: '#FE474C',
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
  },

});





const homestyles = {
  container: {
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
  },
  cardContainer: {
    width: '95%',
    maxWidth: 320,
    height: 30,
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: 350,
    height: 400,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 10,
    position: 'relative',
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
    margin: 10,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}