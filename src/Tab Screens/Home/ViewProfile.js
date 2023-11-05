import React, { Component, useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Button, ActivityIndicator } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Color from '../../components/Color'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import api_url from '../../../ApiUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import MyLoader from '../../components/MyLoader'

const ViewProfile = ({ route, navigation }) => {


    const showToast = (type, text) => {
        Toast.show({
            type: type,
            text1: text,
        });
    }

    const { pairuserid } = route.params;


    const [showinfo, setShowInfo] = useState(false)


    const [allUser, setAllUser] = useState({})
    const [myUser, setMyUser] = useState({})
    const [singlePref, setSinglePref] = useState({})
    const [pref, setPref] = useState()
    const [myId, setMyId] = useState()


    console.log(pairuserid, 'single preference=========================')

    useFocusEffect(
        React.useCallback(() => {
            functionGet()
            functionPref()
            functionSingPref()
        }, [])
    )



    const functionGet = async () => {

        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

        setMyId(userId)

        axios.get(`${api_url}/users/my/${pairuserid}`).then((res) => {
            console.log(res.data)
            setAllUser(res.data?.data)
        })


        axios.get(`${api_url}/users/my/${userId}`).then((res) => {
            console.log(res.data)
            setMyUser(res.data?.data)
        })
    }


    const functionSingPref = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        axios.get(`${api_url}/preferences/get/${userId}`).then((res) => {
            console.log(res.data)
            setSinglePref(res.data?.data)
        })
    }



    const functionPref = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        axios.get(`${api_url}/preferences/getSingle/${userId}/${pairuserid}`).then((res) => {
            console.log(res.data, 'my pref')
            setPref(res.data?.data)
        })
    }





    const checkPrem = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        console.log(userId, '--------------------------------')
        axios.get(`${api_url}/users/get/${userId}`).then((res) => {
            if (res.data?.status === 'ok') {
                setShowInfo(true)
            }

            else if (res.data?.status === 'fail') {
                showToast('error', res.data.message);
            }
        })
    }




    const [visible, setVisible] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setVisible(!visible);
        }, 1000);
    }, []);




    return (
        <View style={{
            width: '100%',
            height: '100%',

        }}>



            {visible ? <MyLoader top='45%' /> : null}

            <View style={styles.card}>
                <ImageBackground style={styles.cardImage} source={{ uri: allUser?.image1 }} >
                    <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
                        <LinearGradient colors={[
                            'rgba(0,0,0,0.0)',
                            'rgba(0,0,0,0.5)',
                            'rgba(0,0,0,0.7)',

                        ]}>


                            <View style={{ padding: 20 }}>
                                <View>
                                    <TouchableOpacity pressRetentionOffset={true} style={{ zIndex: 9999 }} onPress={() => navigation.navigate('viewProfile', { 'pairuserid': allUser?.id })}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} >

                                            <Image source={require('../../components/Images/greenTick.png')} style={{ width: 18, height: 18, resizeMode: 'cover' }} />
                                            <Text style={styles.cardTitle}>{allUser?.firstName + ' ' + allUser?.lastName}</Text>
                                        </View>

                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <View style={{ backgroundColor: 'black', padding: 3, borderRadius: 5 }}>
                                            <Text style={{ color: 'white', fontSize: 12 }}>. Online</Text>
                                        </View>
                                        <View style={{ backgroundColor: 'black', padding: 3, borderRadius: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <Image source={require('../../components/Images/relationIcon.png')} style={{ width: 10, height: 10, resizeMode: 'cover' }} />
                                            <Text style={{ color: 'white', fontSize: 12 }}>
                                                You and Her
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', fontSize: 12 }}>{allUser?.dob}, {allUser?.height} </Text>
                                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}> . {allUser?.workingAs} </Text>
                                    </View>


                                </View>

                            </View>



                        </LinearGradient>
                    </View>



                </ImageBackground>
            </View>

            <ScrollView contentContainerStyle={{
                backgroundColor: 'white',
                padding: 10
            }}>

                <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 'auto', padding: 10, marginBottom: 10 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>About {allUser?.firstName}</Text>
                    <Text style={{ color: 'black', fontSize: 11, marginTop: 5 }}>{allUser?.about}</Text>
                </View>





                <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 'auto', padding: 10, marginBottom: 10 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Basic Detail</Text>
                    <Text style={{ color: 'white', fontSize: 11, backgroundColor: Color.primary, padding: 3, maxWidth: 120, borderRadius: 5, marginBottom: 5 }}>Profile ID-{allUser?.id}</Text>

                    <View style={{ flexDirection: 'row', gap: 5, marginBottom: 5 }}>
                        <Text style={{ color: 'black', fontSize: 11, backgroundColor: 'white', padding: 3, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>Created {allUser?.profileFor}</Text>
                        {myId === allUser?.id ? <Text style={{ color: 'black', fontSize: 11, backgroundColor: 'white', padding: 3, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>{allUser?.dob} year old</Text> :
                            !showinfo ?
                                <Text style={{ color: 'black', fontSize: 11, backgroundColor: 'white', padding: 3, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>Buy premium to see</Text> :
                                <Text style={{ color: 'black', fontSize: 11, backgroundColor: 'white', padding: 3, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>{allUser?.dob} year old</Text>
                        }
                        <Text style={{ color: 'black', fontSize: 11, backgroundColor: 'white', padding: 3, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>Height- {allUser?.height}</Text>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>M</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Martial Status</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.maritalStatus}</Text>

                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>A</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Age</Text>
                                    {myId === allUser?.id ? <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.dob} year old</Text> :
                                        !showinfo ?
                                            <Text style={{ color: 'black', fontSize: 11 }}>Buy premium to see</Text> :
                                            <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.dob} year old</Text>
                                    }


                                </View>
                            </View>

                        </View>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>L</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Lives in</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>Lives in {allUser?.city}, {allUser?.state}, {allUser?.country}</Text>

                                </View>
                            </View>

                        </View>
                    </View>



                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>G</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Grew up in</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>Grew up in {allUser?.country}</Text>

                                </View>
                            </View>

                        </View>
                    </View>



                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>C</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Community</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.community}</Text>

                                </View>
                            </View>

                        </View>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>D</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Diet Preferences</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.diet}</Text>

                                </View>
                            </View>

                        </View>
                    </View>


                </View>







                <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 'auto', padding: 10, marginBottom: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Contact Detail</Text>
                        {myId === allUser?.id ? null : <TouchableOpacity onPress={checkPrem}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Premium</Text>
                        </TouchableOpacity>}

                    </View>



                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>M</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Contact no</Text>
                                    {myId === allUser?.id ?
                                        <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.phoneNumber}</Text> :
                                        showinfo ?
                                            <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.phoneNumber}</Text> :
                                            <Text style={{ color: 'black', fontSize: 11 }}>Buy premium to see</Text>
                                    }

                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>A</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Email ID</Text>
                                    {myId === allUser?.id ? <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.email}</Text> :
                                        !showinfo ?
                                            <Text style={{ color: 'black', fontSize: 11 }}>Buy premium to see</Text> :
                                            <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.email}</Text>
                                    }
                                </View>
                            </View>

                        </View>
                    </View>


                </View>






                <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 'auto', padding: 10, marginBottom: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Career & Education</Text>
                        {/* <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Co</Text> */}

                    </View>



                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>P</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Profession</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.workingAs}</Text>

                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>A</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Company Name</Text>
                                    {myId === allUser?.id ? <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.workingWith}</Text> :
                                        !showinfo ?
                                            <Text style={{ color: 'black', fontSize: 11 }}>Buy premium to see</Text> :
                                            <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.workingWith}</Text>
                                    }
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>A</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Annual Income</Text>
                                    <Text style={{ color: 'black', fontSize: 11 }}>Earns upto PKR {allUser?.annualIncome} monthly</Text>

                                </View>
                            </View>

                        </View>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>C</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>
                                        College Name
                                    </Text>
                                    {myId === allUser?.id ? <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.college}</Text> :
                                        !showinfo ?
                                            <Text style={{ color: 'black', fontSize: 11 }}>Buy premium to see</Text> :
                                            <Text style={{ color: 'black', fontSize: 11 }}>{allUser?.college}</Text>
                                    }
                                </View>
                            </View>

                        </View>
                    </View>


                </View>




                {myUser?.premium ? null : <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 'auto', padding: 10, marginBottom: 10, backgroundColor: Color.primary, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>To unlock her age and contact detail</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('premium')}>
                        <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold', marginTop: 5, backgroundColor: 'yellow', padding: 10, borderRadius: 10 }}>Go Premium Now</Text>
                    </TouchableOpacity>
                </View>}



                {myId === allUser?.id ? null : <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 'auto', marginBottom: 10 }}>
                    <View style={{ borderRadius: 10, width: '100%', height: 'auto', padding: 10, marginBottom: 10, backgroundColor: Color.primary, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>{pref === undefined ? 'You did not add any preferences.' : pref}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Image source={{ uri: myUser?.image1 }} style={{ width: 90, height: 90, borderRadius: 90 }} />
                        <Image source={require('../../components/Images/heart.png')} style={{ width: 20, height: 20, position: 'absolute', zIndex: 999 }} />
                        <Image source={{ uri: allUser?.image1 }} style={{ width: 90, height: 90, borderRadius: 90 }} />

                    </View>

                    <View style={{ padding: 20 }}>

                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Age</Text>
                                        <Text style={{ color: 'black', fontSize: 11 }}>{singlePref?.startAge} to {singlePref?.endAge}</Text>

                                    </View>
                                </View>

                            </View>
                        </View>


                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Height</Text>
                                        <Text style={{ color: 'black', fontSize: 11 }}>{singlePref?.startHeight} to {singlePref?.endHeight}</Text>

                                    </View>
                                </View>

                            </View>
                        </View>


                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Martial Status</Text>
                                        <Text style={{ color: 'black', fontSize: 11 }}>{singlePref?.maritalStatus}</Text>

                                    </View>
                                </View>

                            </View>
                        </View>


                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Country living in</Text>
                                        <Text style={{ color: 'black', fontSize: 11 }}>{singlePref?.country}</Text>

                                    </View>
                                </View>

                            </View>
                        </View>


                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: '500', color: '#aaa', fontSize: 12 }}>Annual Income</Text>
                                        <Text style={{ color: 'black', fontSize: 11 }}>upto PKR {singlePref?.annualIncome} Lakh</Text>

                                    </View>
                                </View>

                            </View>
                        </View>


                    </View>
                </View>}


            </ScrollView>


        </View>
    )
}

export default ViewProfile



const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10
    },
    header: {
        color: '#000',
        fontSize: 30,
        marginBottom: 30,
    },
    cardContainer: {
        width: '95%',
        maxWidth: 320,
        height: 380,
    },
    card: {
        backgroundColor: '#aaa',
        width: '100%',
        maxWidth: '100%',
        height: 250,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        resizeMode: 'cover',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 10,
    },
    cardTitle: {
        // position: 'absolute',
        bottom: 0,
        margin: 10,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoText: {
        height: 28,
        justifyContent: 'center',
        display: 'flex',
        zIndex: -100,
    }
}