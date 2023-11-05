import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import style from './style';
import BackBtn from '../../components/BackBtn';
import PhoneInput from "react-native-phone-number-input";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
import MyLoader from '../../components/MyLoader';
import auth from '@react-native-firebase/auth';




const PhoneNumber = ({ navigation }) => {

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  const handleMainBtn = () => {
    console.log('heu');
  };

  const [value, setValue] = useState(null);
  const [email, setEmail] = useState(null);
  const [formattedValue, setFormattedValue] = useState("");


  console.log(value, 'value')



  const [code, setCode] = useState('')
  const [verificaitonId, setVerificationId] = useState('')
  // const recaptchaVerifier = useRef(null)

  const submit = async () => {
    if (email === null) {
      showToast('error', 'Must enter email address')
    }
    else if (value === null) {
      showToast('error', 'Must enter phone number')
    }

    else {
      setVisible(true)
      try {



        const confirmation = await auth().signInWithPhoneNumber(formattedValue);

        navigation.navigate('otp', { email: email, phone: formattedValue, verificaitonId: confirmation })
        if (confirmation === 0 || confirmation === '' || confirmation === null) {
          showToast('error', 'Failed to send verification code' + " " + formattedValue)
        }
        setVisible(false)

      } catch (error) {
        console.log(error, '===============');
        showToast('error', 'Failed to send verification code' + " " + formattedValue)
        setVisible(false)
      }
    }
  }




  const [visible, setVisible] = useState(false);



  console.log(value)


  return (

    <View style={style.container}>
      {visible ? <MyLoader top='45%' /> : null}
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        
      /> */}
      <ScrollView>
        <Image
          style={style.halfCircle}
          source={require('../../components/Images/half.png')}
        />
        <BackBtn onPress={() => navigation.goBack()} style={style.backBtn} />
        <View style={style.avatar}>
          <Image
            style={style.avatarStyle}
            source={require('../../components/Images/badge.png')}
          />
          <Text style={style.headerSubTxt}>An active email ID & phone no.{"\n"} are required to secure your profile</Text>
          <Text style={style.headerTxt}>Email ID</Text>
          <TextInput
            placeholder='Email'
            placeholderTextColor='grey'

            onChangeText={(value) => setEmail(value)}
            style={{
              height: 40,
              margin: 12,
              width: responsiveWidth(90),
              alignSelf: 'center',
              borderBottomWidth: 1,
              padding: 0,
              borderColor: Color.secondary,
              opacity: 0.6,
              fontSize: responsiveFontSize(1.7),
              fontWeight: '500',
              color: 'black'
            }}
          />
          <Text style={style.headerTxt}>Mobile no.</Text>
          <PhoneInput
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              width: responsiveWidth(90),

            }}
            textContainerStyle={{
              backgroundColor: 'transparent',
              right: 15,
              backgroundColor: 'transparent',
            }}
            textInputStyle={{
              color: 'gray',
              backgroundColor: 'transparent',
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            codeTextStyle={{
              color: 'gray'
            }}
          />
          <View style={{ width: responsiveWidth(90), height: 1, backgroundColor: 'gray', bottom: 15 }}></View>






          <MainBtn
            style={{
              backgroundColor: Color.primary,
              marginTop: responsiveFontSize(25),
            }}
            title={'Continue'}
            onPress={submit}
          />

        </View>
        <Image style={{ width: 60, height: 60, bottom: -1, position: 'absolute', alignSelf: 'flex-end' }} source={require('../../components/Images/halfCircle.png')} />
      </ScrollView>
    </View>
  );
};

export default PhoneNumber;
