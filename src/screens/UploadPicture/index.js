import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import style from './style';
import ToggleSwitch from 'toggle-switch-react-native';

import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SubHeader from '../../components/SubHeader';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import api_url from '../../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLoader from '../../components/MyLoader';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const UploadPicture = ({ route, navigation }) => {
  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  const [imageupload, setImageUpload] = useState([]);

  const storeId = async (value,name,status) => {
    try {
      await AsyncStorage.setItem("mainuserId", JSON.stringify(value));
      await AsyncStorage.setItem("mainuserName", JSON.stringify(name));
      await AsyncStorage.setItem("mainuserStatus", JSON.stringify(status));
    } catch (error) {
      console.log(error);
    }
  };




  const [image1, setImage1] = useState(null)

  const pickImage1 = async () => {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage1(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image2, setImage2] = useState(null)

  const pickImage2 = async () => {


    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage2(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image3, setImage3] = useState(null)

  const pickImage3 = async () => {
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage3(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });

  };

  const [image4, setImage4] = useState(null)

  const pickImage4 = async () => {
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage4(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image5, setImage5] = useState(null)

  const pickImage5 = async () => {
    
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage5(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image6, setImage6] = useState(null)

  const pickImage6 = async () => {
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage6(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });



  };

  const [image7, setImage7] = useState(null)

  const pickImage7 = async () => {

    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage7(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });



  };


  const image = [image1, image2, image3, image4, image5, image6, image7];



  const { email, phone, profileFor, gender, firstName, lastName, dob, religion, community, country,selfie } = route.params;

  // const email = ''
  // const phone = ''
  // const profileFor = ''
  // const gender = ''
  // const firstName = ''
  // const lastName = ''
  // const dob = ''
  // const religion = ''
  // const community = ''
  // const country = ''


  const submit = async () => {
    if (imageupload.length === 0) {
      showToast('error', 'Must add images')
    }

    else {

      console.log(imageupload)

      const param = new FormData()
      param.append('email', email)
      param.append('phoneNumber', phone)
      param.append('profileFor', profileFor)
      param.append('gender', gender)
      param.append('firstName', firstName)
      param.append('lastName', lastName)
      param.append('dob', dob)
      param.append('religion', religion)
      param.append('community', community)
      param.append('country', country)

      if (selfie !== null) {
        param.append('selfie', {
          uri: selfie,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }
      if (image1 !== null) {
        param.append('image1', {
          uri: image1,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }


      if (image2 !== null) {
        param.append('image2', {
          uri: image2,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }


      if (image3 !== null) {
        param.append('image3', {
          uri: image3,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }



      if (image4 !== null) {
        param.append('image4', {
          uri: image4,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }


      if (image5 !== null) {
        param.append('image5', {
          uri: image5,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }


      if (image6 !== null) {
        param.append('image6', {
          uri: image6,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }



      if (image7 !== null) {
        param.append('image7', {
          uri: image7,
          type: 'image/jpeg',
          name: 'image.jpg',
        })
      }

      // const param = {
      //   'email': email,
      //   'phoneNumber': phone,
      //   'profileFor': profileFor,
      //   'gender': gender,
      //   'firstName': firstName,
      //   'lastName': lastName,
      //   'dob': dob,
      //   'religion':religion,
      //   'community': community,
      //   'country': country,

      // }




      console.log(param)

      // await axios.post(`${api_url}/users/create`, param,{headers: {
      //   // 'Accept': 'application/json',
      //   'Content-Type': 'multipart/form-data',
      // },}).then((res) => {
      //   console.log(JSON.stringify(res.data));

      //   if (res.data.status === 'ok') {
      //     showToast('success', 'User Registered.');
      // storeId(data?.data?.id)
      //     navigation.replace(`home`);

      //   } else if (res.data.status === 'fail') {
      //     showToast('error', res.data?.message)
      //   }
      // });


      setVisible(true)

      fetch(`${api_url}/users/create`, {
        method: 'POST',
        // headers: {
        //   'Accept': 'application/json',
        //   // 'Accept': 'multipart/form-data',
        //   'Content-Type': 'application/json',
        //   // 'Content-Type': 'multipart/form-data',
        // },
        body: param,
        // body: param,
      }).then(response => response.json()).then(async(data) => {
        console.log(data)
        if (data.status === 'ok') {
          showToast('success', 'User Registered.');
          storeId(data?.data?.id,data?.data?.firstName,data?.data?.status)
          navigation.replace(`home`);

        } else if (data.status === 'fail') {
          await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          showToast('error', data?.message)
          navigation.replace(`phoneNumber`);
        }
      })




    }
  }


  const [visible, setVisible] = useState(false)




  return (
    <View style={style.container}>


      {visible ? <MyLoader top='45%' /> : null}


      <Image
        style={style.halfCircle}
        source={require('../../components/Images/half.png')}
      />
      <View style={{ bottom: responsiveHeight(8) }}>
        <SubHeader />
      </View>

      <View style={style.subContainer}>
        <Text style={style.headerTxt}>Upload your pictures</Text>
        <Text style={style.headerSubTxt}>
          Please share your recent pictures for a perfect match
        </Text>
        <View style={style.ImageSection}>
          <TouchableOpacity onPress={pickImage1}
            style={{
              width: '70%',
              height: '70%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'black',
              backgroundColor: '#E7E5EB',
              overflow: 'hidden'

            }}>
            {image1 ? <Image source={{ uri: image1 }} style={{
              width: '100%',
              height: '100%',
            }} /> :
              <Image
                style={{
                  width: '70%',
                  height: '100%',
                }}
                source={require('../../components/Images/profileIcon1.png')}
              />}

          </TouchableOpacity>
          <View style={{ width: '28%', height: '70%', }}>
            <TouchableOpacity onPress={pickImage2}
              style={{
                width: '95%',
                height: '49%',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#E7E5EB',
                overflow: 'hidden'
              }}>
              {image2 ? <Image source={{ uri: image2 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../components/Images/profileIcon1.png')}
                />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage3}
              style={{
                width: '95%',
                height: '49%',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                top: 5,
                backgroundColor: '#E7E5EB',
                overflow: 'hidden'
              }}>
              {image3 ? <Image source={{ uri: image3 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../components/Images/profileIcon1.png')}
                />}

            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          width: '100%',
          height: '20%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              bottom: 85,
            }}>
            <TouchableOpacity onPress={pickImage4}
              style={{
                width: '32%',
                height: '70%',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#E7E5EB',
                overflow: 'hidden'
              }}>
              {image4 ? <Image source={{ uri: image4 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../components/Images/profileIcon1.png')}
                />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage5}
              style={{
                width: '32%',
                height: '70%',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#E7E5EB',
                overflow: 'hidden'
              }}>
              {image5 ? <Image source={{ uri: image5 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../components/Images/profileIcon1.png')}
                />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage6}
              style={{
                width: '32%',
                height: '70%',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#E7E5EB',
                overflow: 'hidden'
              }}>
              {image6 ? <Image source={{ uri: image6 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../components/Images/profileIcon1.png')}
                />}
            </TouchableOpacity>
          </View>
          <View style={{ width: '30%', height: '70%', bottom: 103, }}>
            <TouchableOpacity onPress={pickImage7}
              style={{
                width: '87%',
                height: '97%',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#E7E5EB',
                overflow: 'hidden'
              }}>
              {image7 ? <Image source={{ uri: image7 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={require('../../components/Images/profileIcon1.png')}
                />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ bottom: responsiveHeight(4) }}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={[style.headerTxt, { fontSize: responsiveFontSize(2.8) }]}>
              Blur my photos
            </Text>
            <ToggleSwitch
              isOn={true}
              onColor="#E7E5EB"
              offColor="#E7E5EB"
              size="medium"
              icon={
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../components/Images/cross.webp')}
                />
              }
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View> */}
          {/* <Text
            style={[
              style.headerSubTxt,
              { fontSize: responsiveFontSize(1.4), marginTop: 5 },
            ]}>
            Are you sure? Profiles with visible photos get 300%{'\n'}more
            matches
          </Text> */}
        </View>

        <MainBtn
          style={{
            backgroundColor: Color.primary,
            marginTop: responsiveHeight(15),
          }}
          title={'Continue'}
          onPress={submit}
        />
      </View>
      <Image
        style={{
          width: 60,
          height: 60,
          bottom: -1,
          position: 'absolute',
          alignSelf: 'flex-end',
        }}
        source={require('../../components/Images/halfCircle.png')}
      />
    </View>
  );
};

export default UploadPicture;