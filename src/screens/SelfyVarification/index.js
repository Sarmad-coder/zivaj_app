import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import BackBtn from '../../components/BackBtn';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import { ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ProfileVerification = ({ route, navigation }) => {

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  const [selfie, setSelfie] = useState(null)

  const handleMainBtn = () => {

    ImagePicker.openCamera({
      mediaType: 'image',
      useFrontCamera: true,
      
    }).then(async (image) => {
      console.log('image data----', image);
      setSelfie(image.path);
      // console.log(image);     
    });
  };


  const { email, phone, profileFor, gender, firstName, lastName, dob, religion, community, country } = route.params;

  return (
    <View style={style.container}>
      <ScrollView>
        <Image
          style={style.halfCircle}
          source={require('../../components/Images/half.png')}
        />
        <BackBtn onPress={() => navigation.goBack()} style={style.backBtn} />
        <View style={style.avatar}>

          <Image
            style={style.avatarStyle}
            source={require('../../components/Images/subLogo.png')}
          />



          <View style={style.SelfieVerification}>
            <Text style={style.headerTxt}>Selfie Verification</Text>
            <Text style={style.subHeaderTxt}>
              We use sefies to verfiy that this profile in yours to keep our
              community safe and authentic.
            </Text>
            <TouchableOpacity onPress={handleMainBtn}>
              <Image
                style={style.selfie}
                source={{uri:selfie?selfie:'https://www.klippa.com/wp-content/uploads/2023/06/selfie-verification-grid.png'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Color.primary,
                marginLeft: 25,
                fontSize: 12,
                marginTop: 15,
              }}>
              We will NOT this public. It's kept PRIVATE 😊
            </Text>
          </View>

          <MainBtn
            style={{
              backgroundColor: Color.primary,
              marginTop: responsiveHeight(10),
            }}
            title={'Click'}
            onPress={() => {
              if(selfie)
              {
                navigation.navigate('uploadPicture', { email: email, phone: phone, profileFor: profileFor, gender: gender, firstName: firstName, lastName: lastName, dob: dob, religion: religion, community: community, country: country,selfie:selfie })
              }
              else{
                showToast('error', 'Must verify your profile.')
              }
            }}
          />
        </View>
      </ScrollView>
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

export default ProfileVerification;
