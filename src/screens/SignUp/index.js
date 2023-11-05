import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import TabNav from '../../navigation/tabNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import MyLoader from '../../components/MyLoader';
import api_url from '../../../ApiUrl';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import LinearGradient from 'react-native-linear-gradient';





const Splach = ({ navigation }) => {


  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }




  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1075932036171-jkcqnd7lpooabjmeuiaahdug2fa4mcft.apps.googleusercontent.com',
    });

  }, [])





  const storeId = async (value,status) => {
    try {
      await AsyncStorage.setItem("mainuserId", JSON.stringify(value));
      await AsyncStorage.setItem("mainuserStatus", JSON.stringify(status));
    } catch (error) {
      console.log(error);
    }
  };

  const [mydata, setMyData] = useState([])

  console.log(mydata?.userInfo?.user)


  const onGoogleButtonPress = async () => {


    await AsyncStorage.clear()

    // Check if your device supports Google Play
    try {
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();


      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

      // Sign-in the user with the credential
      const checkautlogin = auth().signInWithCredential(googleCredential);
      // console.log(checkautlogin,idToken);


      setMyData({ userInfo });

      if (userInfo) {
        setVisible(true)

        const params = {
          'email': userInfo?.user?.email,
        }

        console.log(params, '====================>my param')


        await fetch(`${api_url}/login/googleCreate`, {
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
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            showToast('success', data?.message);
            setVisible(false)
            storeId(data?.data?.id,data?.data?.status)
            navigation.replace('home')


          } else if (data.status === 'register') {

            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // console.log('opt data ====>>', value);
            storeId(data?.data?.id,data?.data?.status)

            showToast('success', 'Gmail authentication successful')
            navigation.navigate('profileFor', { email: userInfo?.user?.email, phone: '' })


            setVisible(false)



          }
        })
      }



    } catch (error) {
      setVisible(false)
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }



  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    console.log(result, 'final result')


    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    console.log(facebookCredential)

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }


  const [visible, setVisible] = useState(false);



  return (
    <ImageBackground
      style={{ flex: 1, alignItems: 'center', width: '100%', height: '100%' }}
      source={require('../../components/Images/1.jpg')}>
        <LinearGradient colors={[
                        'rgba(0,0,0,0.7)',
                        'rgba(0,0,0,0.0)',
                        'rgba(0,0,0,0.0)',

                      ]}>
      <Image
        style={{ width: 220, height: 70, marginTop: 20, alignSelf: 'center' }}
        source={require('../../components/Images/logo.png')}
      />
      {visible ? <MyLoader top='45%' /> : null}
      <View
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(20),
          marginTop: responsiveHeight(55),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            width: '80%',
            height: 'auto',
            backgroundColor: Color.secondary,
            borderRadius: responsiveWidth(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(5),
            paddingVertical: responsiveFontSize(2),
            marginBottom: 5,
          }}
          onPress={async() => {
            await AsyncStorage.clear()
            navigation.navigate('phoneNumber')
          }}

        >
          <Image
            style={{
              width: responsiveWidth(6),
              height: 22,
              tintColor: 'white',
            }}
            source={require('../../components/Images/ph.png')}
          />
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(2.1),
            }}>
            Continue with Number
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={
            onGoogleButtonPress
          }
          style={{
            width: responsiveWidth(80),
            height: 'auto',
            backgroundColor: Color.primary,
            alignSelf: 'center',
            borderRadius: responsiveWidth(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(5),
            paddingVertical: responsiveFontSize(2),
            marginBottom: 5,
          }}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require('../../components/Images/google.png')}
          />
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(2.1),
            }}>
            Continue with Google
          </Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={{
            width: responsiveWidth(80),
            height: 49,
            backgroundColor: '#416FC0',
            alignSelf: 'center',
            borderRadius: responsiveWidth(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(5),
            marginBottom: 5,
          }} onPress={async()=>{await AsyncStorage.clear()}}>
          <LoginButton
            style={{
              width: '100%',
              backgroundColor: '#416FC0',
              alignSelf: 'center',
              borderRadius: responsiveWidth(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: responsiveFontSize(2),
              marginBottom: 5,

            }}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                  setVisible(true)
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                  setVisible(true)
                } else {

                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      let accessToken = data.accessToken

                      const responseInfoCallback = async (error, result) => {
                        if (error) {
                          console.log(error)
                          alert('Error fetching data: ' + error.toString());
                          setVisible(true)
                        } else {
                          console.log(result)

                          setVisible(true)


                          const params = {
                            'email': result?.email,
                          }

                          console.log(params, '====================>my param')


                          await fetch(`${api_url}/login/googleCreate`, {
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
                              setVisible(false)
                              storeId(data?.data?.id,data?.data?.status)
                              navigation.replace('home')

                            } else if (data.status === 'register') {



                              showToast('success', 'Facebook authentication successful')
                              navigation.navigate('profileFor', { email: result?.email, phone: '' })


                              setVisible(false)



                            }
                          })

                        }
                      }

                      const infoRequest = new GraphRequest(
                        '/me',
                        {
                          accessToken: accessToken,
                          parameters: {
                            fields: {
                              string: 'email,name,first_name,middle_name,last_name'
                            }
                          }
                        },
                        responseInfoCallback
                      );

                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start()

                    }
                  )

                }
              }
            }
            onLogoutFinished={() => alert("logout.")} />

        </TouchableOpacity>




        {/* <TouchableOpacity
          onPress={() => {
            onFacebookButtonPress()
            // storeId(1)
            // navigation.replace('home')
          }}
          style={{
            width: responsiveWidth(80),
            height: 'auto',
            backgroundColor: '#416FC0',
            alignSelf: 'center',
            borderRadius: responsiveWidth(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveFontSize(5),
            paddingVertical: responsiveFontSize(2),
            marginBottom: 5,

          }}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require('../../components/Images/fb.png')}
          />
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(2.1),
            }}>
            Continue with Facebook
          </Text>


        </TouchableOpacity> */}
      </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Splach;
