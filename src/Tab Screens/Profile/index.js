import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Animated,
} from 'react-native';

// import ImageCropPicker from 'react-native-image-crop-picker';
import ProgressCircle from 'react-native-progress-circle';
// icons libraries
import api_url from '../../../ApiUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth';


import MyLoader from '../../components/MyLoader';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = ({ navigation }) => {
  // profile useState
  const [image, setImage] = useState(require('../../components/Images/selfie.jpeg'));

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }


  const storeId = async (value) => {
    try {
      await AsyncStorage.setItem("mainuserId", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };


  const [image1, setImage1] = useState(null)


  // cam permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        {
          

        
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true
            }).then(result => {
        
              setImage1(result.path);
        
              // const obj = {
              //   name: result.path.split('/')[result.path.split('/').length - 1],
              //   uri: result?.path, type: result?.mime,
              // };
              // setImageUpload(prev => [...prev, obj])
        
            });
        
        
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };




  const submit = async () => {


    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    console.log(userId, '--------------------------------')

    requestCameraPermission()

    
    const param = new FormData()

    if(image1!==null){
      param.append('image1', {
        uri: image1,
        type: 'image/jpeg',
        name: 'image.jpg',
      })

 
    console.log(param)

    


    fetch(`${api_url}/users/update/${userId}`, {
      method: 'PUT',
      // headers: {
      //   // 'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   // 'Content-Type': 'multipart/form-data',
      // },
      body: param._parts.length===0?'':param,
    }).then(response => response.json()).then(data => {
      console.log(data)
      if (data.status === 'ok') {
        showToast('success', 'Users Updated.');
        // storeId(data?.data?.id)

      } else if (data.status === 'fail') {
        showToast('error', data?.message)
      }
    }).catch(err=>{
      console.log(err)
    })




    }



  }





  const [allUser, setAllUser] = useState()
  const [count, setcount] = useState()


  useFocusEffect(
    React.useCallback(() => {
      functionGet()
    }, [])
  )



  const functionGet = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    console.log(userId, '--------------------------------')
    axios.get(`${api_url}/users/my/${userId}`).then((res) => {
      console.log(res.data)
      setAllUser(res.data?.data)
      setcount(res.data?.count)
    })
  }



  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setVisible(false);
    }, 1000);
  }, []);







  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: 'white',
      }}>

      {visible ? <MyLoader top='45%' /> : null}
      <View
        style={{
          backgroundColor: 'white',
        }}>
        <View style={styles.topContainer}>
          <View style={{ flexDirection: 'row' }}>
            {/* <TouchableOpacity style={{ marginHorizontal: 5 }}>
              <AntDesign size={25} color={'white'} name="arrowleft" />
            </TouchableOpacity> */}
            <Text style={styles.Heading}>My Profile</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={async() => {
              const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
              if (userStatus) {
                navigation.navigate('Chat')
              }
              else {
                  showToast('error', 'You are not verfied from admin.')
              }
              }}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
            {/* <Feather
              style={{ paddingLeft: 10 }}
              name="align-right"
              size={20}
              color={'white'}
            /> */}
          </View>
        </View>

        <View style={styles.profileWrapper}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: '180deg',
                },
              ],
              position: 'absolute',
            }}>
            <ProgressCircle
              percent={count}
              radius={80}
              borderWidth={8}
              color="#EC302E"
              shadowColor="#999"
              bgColor="#fff"
            />
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              alignSelf: 'flex-end',
              width: '100%',
              height: 35,
              bottom: -30,
            }}
          />
          <View>
          {image1 ? 
            <Image
              style={styles.Image}
              source={{ uri: image1 }}
            />
            :
            <Image
              style={styles.Image}
              source={{ uri: allUser?.image1 }}
            />
            }
            {/* <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: '#EC302E',
                borderRadius: 100,
                width: 28,
                height: 28,
              }}
              activeOpacity={0.6}
            onPress={submit}
            >
              <AntDesign
                style={styles.icon}
                name="camera"
                size={18}
                color={'white'}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.textView}>
          <Text style={styles.name}>{allUser?.firstName + " " + allUser?.lastName}</Text>
          <AntDesign
            style={{ marginHorizontal: 5 }}
            name="checkcircle"
            size={25}
            color={'#EC302E'}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={async() =>{
          const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
          if (userStatus) {
            navigation.navigate('updateProfile')
          }
          else {
              showToast('error', 'You are not verfied from admin.')
          }
           }}>
          <Text style={styles.btnText}>Let's complete your Profile</Text>
        </TouchableOpacity>

        {allUser?.premium?null:<TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: 'orange',
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          ]}
        onPress={async() => {
          const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
          if (userStatus) {
            navigation.navigate('premium')
          }
          else {
              showToast('error', 'You are not verfied from admin.')
          }
        }
          }
        >
          <AntDesign name="star" color={'white'} size={16} />
          <Text style={styles.btnText}>Upgrade Premium</Text>
          <AntDesign name="star" color={'white'} size={16} />
        </TouchableOpacity>}

        <Text style={styles.setting}>Setting</Text>


        <TouchableOpacity onPress={async() => {
          const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
          if (userStatus) {
            navigation.navigate('preferences')
          }
          else {
              showToast('error', 'You are not verfied from admin.')
          }
          }} style={{ paddingRight: 10 }}>
          <View style={styles.PrefView}>
            <View style={styles.iconView}>
              <AntDesign
                style={{ marginHorizontal: 20 }}
                name="bars"
                color={'black'}
                size={16}
              />
              <Text style={{ color: 'black', fontSize: 16 }}>Prefrence</Text>
            </View>
            <AntDesign name="caretright" color={'black'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.navigate('help')}>
          <View style={styles.PrefView}>
            <View style={styles.iconView}>
              <MaterialIcons
                style={{ marginHorizontal: 20 }}
                name="privacy-tip"
                color={'black'}
                size={16}
              />
              <Text style={{ color: 'black', fontSize: 16 }}>
                Privacy & Policies
              </Text>
            </View>

            <AntDesign name="caretright" color={'black'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('feedBack')} style={{ paddingRight: 10 }}>
          <View style={styles.PrefView}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                style={{ marginHorizontal: 20 }}
                name="message-text"
                color={'black'}
                size={16}
              />
              <Text style={{ color: 'black', fontSize: 16 }}>
                Feedback & Reviews
              </Text>
            </View>

            <AntDesign name="caretright" color={'black'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('help')} style={{ paddingRight: 10 }}>
          <View style={styles.PrefView}>
            <View style={styles.iconView}>
              <FontAwesome5
                style={{ marginHorizontal: 20 }}
                name="hands-helping"
                color={'black'}
                size={16}
              />
              <Text style={{ color: 'black', fontSize: 16 }}>
                Help & Information
              </Text>
            </View>
            <AntDesign name="caretright" color={'black'} size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={async() => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await AsyncStorage.clear()
            // storeId(0)

            navigation.navigate('splach')
          } catch (error) {
            // storeId(0)
            await AsyncStorage.clear()
            navigation.navigate('splach')
            console.error(error);
          }
        }
        } style={{ paddingRight: 10 }}>
          <View style={styles.PrefView}>
            <View style={styles.iconView}>
              <AntDesign
                style={{ marginHorizontal: 20 }}
                name="logout"
                color={'black'}
                size={16}
              />
              <Text style={{ color: 'black', fontSize: 16 }}>
                Logout
              </Text>
            </View>
            <AntDesign name="caretright" color={'black'} size={16} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#EC302E',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  Heading: {
    color: 'white',
    fontSize: 20,
  },
  Image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    alignSelf: 'center',
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    height: 40,
    width: '90%',
    backgroundColor: '#EC302E',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  setting: {
    color: 'black',
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  PrefView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 160,
    height: 35,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: '#0B2265',
    bottom: 0,
    paddingHorizontal: 20,
  },
  profileTag: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  profileWrapper: {
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
});