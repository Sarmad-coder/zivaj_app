import { CardField, useConfirmPayment, useStripe, BillingDetails } from '@stripe/stripe-react-native';
import { Image, ImageBackground, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainBtn from '../../components/MainBtn';
import Color from '../../components/Color';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import api_url from '../../../ApiUrl';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MyLoader from '../../components/MyLoader';

export default function PaymentScreen({ route, navigation }) {

  const { pacid } = route.params


  const { confirmPayment, loading } = useConfirmPayment();

  const [loadings, setLoading] = useState(false);
  const [mycard, setMyCard] = useState({});
  const [myclient, setMyClient] = useState({});




  
  const [allUser, setAllUser] = useState()


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
    })
  }








  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }


  const buypack = async () => {

    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    console.log(userId, '--------------------------------')




    const params = {
      'packageId': pacid,
    }

    setVisible(true)


    fetch(`${api_url}/users/package/${userId}`, {
      method: 'PUT',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(params),
    }).then(response => response.json()).then(async (data) => {
      setMyClient(data.client_secret)

      console.log(data)
      if (data.status === 'ok') {

        const billingDetails = {
          email: allUser?.email,
          name: allUser?.firstName,
        };

        // Fetch the intent client secret from the backend

        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(data.client_secret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        });

        if (error) {
          setVisible(false)
          console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
          console.log('Success from promise', paymentIntent);
        }

        showToast('success', 'Buying package successfully.');
        navigation.goBack()
        setVisible(false)

      } else if (data.status === 'fail') {
        setVisible(false)
        showToast('error', data?.message)
      }
    }).catch(err=>{
      setVisible(false)
      console.log(err,'aaaaaaa');
    })



  }


  const [visible, setVisible] = useState(false)






  return (

    <View style={{ flex: 1, height: '100%', backgroundColor: '#e2e2e2', }}>
      {visible ? <MyLoader top='45%' /> : null}

      <ImageBackground source={require('../../components/Images/2.jpg')} style={{ width: '100%', height: 300, marginBottom: 20, position: 'relative' }}>
        <LinearGradient colors={[
          'rgba(0,0,0,0.0)',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.7)',

        ]} style={{ height: '100%' }}>
          <View style={{ top: 70, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Zivaj</Text>
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Stripe Payment</Text>
            <Text style={{ color: 'white', width: '70%', textAlign: 'center' }}>Pay to buy premium membership to get more access in finding your partner.</Text>
          </View>
        </LinearGradient>

      </ImageBackground>


      <View style={{ borderWidth: 1, borderRadius: 10, borderColor: 'red', paddingVertical: 2, backgroundColor: 'white', marginHorizontal: 20 }}>

        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            placeholderColor: '#A8A8A8',
            cursorColor: 'red',
            borderColor: 'red',

          }}
          style={{
            width: '100%',
            height: 20,
            marginVertical: 20,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
            setMyCard(cardDetails);

          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />




      </View>

      <View style={{ width: '100%', bottom: 20, paddingHorizontal: 20 }}>
        <MainBtn
          onPress={() => { buypack() }}
          style={{
            backgroundColor: Color.primary,
            marginTop: responsiveHeight(7),
            width: '100%'
          }}
          title={'Pay Now'}
        />

      </View>

    </View>
  );
}