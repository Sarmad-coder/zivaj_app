
import { StyleSheet, Text, View, LogBox } from 'react-native';
import MainNav from './src/navigation';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api_url from './ApiUrl';



// "react-native-reanimated": "2.14.4",
export default function App() {
  LogBox.ignoreAllLogs();

  const [data,setData]=useState({})


  useEffect(()=>{
    axios.get(`${api_url}/stripeKey/get/1`).then(res=>{
      setData(res.data?.data)
    })
  
  },[])

  console.log(data);
  
  
  
  const publishableKey = data?.publishKey?data?.publishKey:'pk_test_51NmXVzCKgJrKUnRYC3MAEWsJnE8kBVWSi88Q5TnRKuX6mNNtGWvr8euHXaYRfigtSzSw0Hh969bxQYdSGYx95njB00ReXeEu3E';
  

  // useFocusEffect(

  // )


  return (
    <>
      <StripeProvider publishableKey={publishableKey}>
        <MainNav />
        <Toast position='top' />
      </StripeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
