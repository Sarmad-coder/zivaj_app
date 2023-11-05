import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import Color from '../../components/Color'
import Swiper from 'react-native-swiper';
import api_url from '../../../ApiUrl';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useStripe } from '@stripe/stripe-react-native';


const Premium = ({ navigation }) => {


    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);





    const showToast = (type, text) => {
        Toast.show({
            type: type,
            text1: text,
        });
    }

    const [packUser, setPackUser] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            functionGet()
        }, [])
    )



    const functionGet = () => {

        axios.get(`${api_url}/package/getAll`).then((res) => {
            console.log(res.data)
            setPackUser(res.data?.data)
        })
    }






    const buypack = async (pacid) => {

        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        console.log(userId, '--------------------------------')


        const { error } = await initPaymentSheet({ customerId: userId });
        // setLoading(false);


        navigation.navigate('stripe',{pacid:pacid})

        console.log(error)

        if (!error) {
            presentPaymentSheet();
        }



        
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
                    }}>Packages</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#ccc', width: '100%', height: '100%' }}>

                <View style={{
                    backgroundColor: Color.primary,
                    width: '100%',
                    maxWidth: '100%',
                    height: 380,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>Upgrade to Premium</Text>

                    {/* <Text style={{ color: 'white', fontSize: 14 }}>Offer valid till 3rd September</Text> */}


                    <View style={{ height: 500, top: '30%' }}>
                        <Swiper loop autoplay

                            activeDot={
                                <View
                                    style={{
                                        width: 20,
                                        backgroundColor: '#000',
                                        height: 7,
                                        borderRadius: 10
                                    }}
                                >

                                </View>
                            }
                        >
                            {packUser.length > 0 ? packUser.map(i => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: 'white', width: 250, height: 450, borderRadius: 20, marginHorizontal: 50, padding: 20, zIndex: 9999999 }}>
                                            <Text style={{ color: 'black', fontSize: 14, alignSelf: 'center', marginBottom: 5 }}>{i?.name} {i?.duration} Days</Text>
                                            <Text style={{ color: 'black', fontSize: 14, alignSelf: 'center', backgroundColor: '#90ee90', padding: 4, paddingHorizontal: 20, borderBottomRightRadius: 25, borderTopLeftRadius: 25, marginBottom: 10 }}>2 extra weeks for FREE!</Text>
                                            <Text style={{ color: 'white', fontSize: 14, alignSelf: 'center', marginBottom: 10, backgroundColor: 'red', padding: 5, paddingHorizontal: 10, borderRadius: 20 }}>TOP SELLER</Text>
                                            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                                                <Text style={{ color: 'green', fontSize: 14, alignSelf: 'center', marginBottom: 5, fontWeight: 'bold' }}>{i?.discount}% off</Text>
                                                <Text style={{ color: 'black', fontSize: 14, alignSelf: 'center', marginBottom: 5, textDecorationLine: 'line-through' }}>PKR {i?.price}</Text>

                                            </View>


                                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 5 }}>
                                                PKR {parseInt(i?.price) - parseInt((parseInt(i?.price) * parseInt(i?.discount)) / 100)}
                                            </Text>
                                            <Text style={{ fontSize: 13, alignSelf: 'center', color: '#999', marginBottom: 10 }}>
                                                PKR {parseInt(((parseInt(i?.price) - parseInt((parseInt(i?.price) * parseInt(i?.discount)) / 100)) * parseInt(i?.duration)) / 30)} per month
                                            </Text>


                                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 15, height: 15 }} />
                                                <Text style={{ color: 'black', fontSize: 12 }}>Send {i?.message} Message</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 15, height: 15 }} />
                                                <Text style={{ color: 'black', fontSize: 12 }}>View upto {i?.numberOfUser} Character Numbers</Text>
                                            </View>
                                            {i?.calls ? <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 15, height: 15 }} />
                                                <Text style={{ color: 'black', fontSize: 12 }}>Video call Your Matches</Text>
                                            </View> : null}
                                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 15, height: 15 }} />
                                                <Text style={{ color: 'black', fontSize: 12 }}>Standout from other Profiles</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                                                <Image source={require('../../components/Images/greenTick.png')} style={{ width: 15, height: 15 }} />
                                                <Text style={{ color: 'black', fontSize: 12 }}>Let matches contact your directly</Text>
                                            </View>



                                            <TouchableOpacity onPress={() => buypack(i?.id)} style={{ color: 'white', fontSize: 14, alignSelf: 'center', marginTop: 20, backgroundColor: 'skyblue', padding: 5, paddingHorizontal: 10, borderRadius: 20 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', }}>BUY PACKAGE</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </>
                                )
                            }) : ''}






                        </Swiper>



                        {/* <ScrollView horizontal={true} >

                        
                            


                            <View style={{ backgroundColor: 'white', width: 250, height: 500, borderRadius: 20, marginRight: 40 }}>


                            </View>
                        </ScrollView> */}
                    </View>


                </View>
            </View>
        </View>
    )
}

export default Premium
