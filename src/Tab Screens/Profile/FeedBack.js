import React, { Component, useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    Animated,
    TextInput,
    Button
} from 'react-native'
import Color from '../../components/Color';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MainBtn from '../../components/MainBtn';
import StarRatingComponent from '../../components/StarRatingComponent';
import axios from 'axios';
import api_url from '../../../ApiUrl';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FeedBack = ({ navigation }) => {


    const [ratingss, setRatingss] = useState(3);

    const handleRatingChange = newRating => {
        setRatingss(newRating);
    };


    const [allUser, setAllUser] = useState([])


    useFocusEffect(
        React.useCallback(()=>{
            functionGet()
        },[])
    )



    const functionGet = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        console.log(userId, '--------------------------------')
        axios.get(`${api_url}/rating/get/${userId}`).then((res) => {
            console.log(res.data)
            setAllUser(res.data?.data)
            setRatingss(res.data?.data?.rating)
        })
    }


    console.log(allUser?.review, '--------------------------------')

    const [reviews, setReviews] = useState(allUser?.review);




    const handleSubmit = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('mainuserId'));
        if (!ratingss) {
            // alert('Please  enter your email')
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your rating',
            });
        } else if (!reviews) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your review',
            });
        } else {
            const params = {
                rating: ratingss,
                review: reviews,
                userId: value,
            };


            fetch(`${api_url}/rating/update/${value}`, {
                method: 'PUT',
                headers: {
                  // 'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(params),
              }).then(response => response.json()).then(data => {
                console.log(data)
                if (data.status === 'ok') {

                    navigation.navigate('adminChat')
                  showToast('Review Added successfully');
                  
          
          
                } else if (data.status === 'fail') {
                  showToast('error', data?.message)
                }
              })
          

        }
    };


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF',

        }}>

            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: 5 }}>
                        <AntDesign size={25} color={'black'} name="arrowleft" />
                    </TouchableOpacity>
                    <Text style={styles.Heading}>Feedback and Review</Text>
                </View>
            </View>


            <ScrollView
                contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 10
                }}>


                <View
                    style={{
                        height: 60,
                        width: '100%',
                        paddingHorizontal: '2.5%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 18,
                        }}>
                        Rate this app
                    </Text>
                    <View
                        style={{
                            height: 60,
                            width: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>

                    </View>
                </View>


                <View style={{ marginTop: 0 }}>

                    <TextInput
                        onChangeText={value => setReviews(value)}
                        placeholder='Write a review'
                        defaultValue={allUser?.review}
                        placeholderTextColor='gray'
                        style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 12,
                            height: 120,
                            marginTop: 15,
                            textAlign:'center',color: "black"
                            
                        }}
                    />
                </View>



                <View style={{ marginBottom: 12,paddingHorizontal:70 }}>

                    <StarRatingComponent
                        initialRating={ratingss}
                        onRatingChange={handleRatingChange}
                        starSize={30}
                    />
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{ color: 'black' }}>Please tap the star to rate</Text>
                </View>
                
                

                <View style={{ width: '100%', bottom: 20 }}>
                    <MainBtn
                        onPress={() => {
                            handleSubmit()
                        }}
                        style={{
                            backgroundColor: Color.primary,
                            marginTop: responsiveHeight(7),
                            width: '100%',
                            fontSize: 16
                        }}
                        title={'Submit'}
                    />

                </View>




            </ScrollView>






        </View>
    )
}

export default FeedBack



const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        // backgroundColor: '#EC302E',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    Heading: {
        color: 'black',
        fontSize: 18,
    },
    halfCircle: {
        width: 90,
        height: 90
    },
    subContainer: {
        width: responsiveWidth(95),
        alignSelf: 'center',
    },
    headerTxt: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: Color.secondary,

    },
    headerSubTxt: {
        fontSize: responsiveFontSize(1.5),
        color: Color.secondary,
        opacity: 0.6

    },
    ImageSection: {
        width: responsiveWidth(96),
        height: '50%',
        marginTop: 10,
        flexDirection: 'row'
    }
});