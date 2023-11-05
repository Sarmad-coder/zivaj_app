import { View, Text, Image, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import style from './style';
import BackBtn from '../../components/BackBtn';
import auth from '@react-native-firebase/auth';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import ProgressBar from 'react-native-animated-progress';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Alert } from 'react-native';
import api_url from '../../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyLoader from '../../components/MyLoader';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const CELL_COUNT = 6;

const Otp = ({ route, navigation }) => {

  const verifycode = route.params.verificaitonId;
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


  const { email, phone, verificaitonId } = route.params;
  const handleMainBtn = () => {
    console.log('heu');
  };
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [seconds, setSeconds] = useState(60);
  const [myprog, setMyProg] = useState(60);

  const [displaysec, setdisplaysec] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev - 1);
      setMyProg((seconds / 59) * 100);
    }, 1000);

    // Clear the interval when the component is unmounted or when seconds reaches 0
    if (seconds === 0) {
      clearInterval(intervalId);
      setdisplaysec(true)
    }

    return () => {
      clearInterval(intervalId)
    };
  }, [seconds]);



  // const recaptchaVerifier = useRef(null)


  const confirmCode = async () => {


    try {


      const verificationss = await verifycode.confirm(value);

      console.log(verificationss.additionalUserInfo)

      if (verificationss.additionalUserInfo) {
        setVisible(true)

        const params = {
          'phoneNumber': phone,
          'email': email,
        }

        console.log(params, '====================>my param')


        await fetch(`${api_url}/login/create`, {
          method: 'POST',
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(params),
        }).then(response => response.json()).then(async (data) => {
          console.log(data)
          if (data.status === 'ok') {
            showToast('success', data?.message);
            storeId(data?.data?.id)
            navigation.replace('home')

          } else if (data.status === 'register') {


            console.log('opt data ====>>', value);


            showToast('success', 'Phone authentication successful')
            navigation.navigate('profileFor', { email: email, phone: phone })


            setVisible(false)



          }
        })

      }
    } catch (error) {
      // console.log(error.message, 'my error===============');
      showToast('error', error.message.replace(/\[auth\/session-expired\]/, '').trim())
      setVisible(false)
    }



  }


  const submit = async () => {

    setVisible(true)


    try {

      const confirmation = await auth().signInWithPhoneNumber(phone);

      navigation.navigate('otp', { email: email, phone: phone, verificaitonId: confirmation })
      if (confirmation === 0 || confirmation === '' || confirmation === null) {
        showToast('error', 'Failed to send verification code' + " " + phone)
      }
      setVisible(false)



    } catch (error) {
      console.log(error, '===============');
      showToast('error', 'Failed to send verification code' + " " + phone)
      setVisible(false)
    }

  }


  const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   // setInterval(() => {
  //   //   setVisible(!visible);
  //   // }, 2000);
  // }, []);



  return (
    <View style={style.container}>


      {visible ? <MyLoader top='45%' /> : null}

      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}

      /> */}

      <Image
        style={style.halfCircle}
        source={require('../../components/Images/half.png')}
      />
      <BackBtn onPress={() => navigation.goBack()} style={style.backBtn} />
      <View style={style.avatar}>
        <Text style={style.headerTxt}>
          Enter the 6 digit code sent to your phone
        </Text>
        <Text style={style.subHeaderTxt}>
          You will recieve a SMS with a verificaiton pin {'\n'} on {phone}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={style.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[style.cell, isFocused && style.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {displaysec ? 
        <TouchableOpacity onPress={submit} >

          <Text
            style={{
              alignSelf: 'center',
              marginTop: responsiveHeight(3),
              fontSize: responsiveFontSize(2),
              color: 'red',
            }}>
            Resend code 00:{seconds}
          </Text>

        </TouchableOpacity> :
          <View >

            <Text
              style={{
                alignSelf: 'center',
                marginTop: responsiveHeight(3),
                fontSize: responsiveFontSize(2),
                color: 'red',
              }}>
              00:{seconds}
            </Text>

          </View>}
        <View
          style={{
            width: responsiveWidth(30),
            alignSelf: 'center',
            marginTop: responsiveHeight(2),
          }}>
          <ProgressBar
            progress={myprog}
            height={3}
            backgroundColor={Color.primary}
          />
        </View>
        <MainBtn
          style={{
            backgroundColor: Color.primary,
            marginTop: responsiveHeight(15),
          }}
          title={'Verify'}
          onPress={confirmCode}
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

export default Otp;
