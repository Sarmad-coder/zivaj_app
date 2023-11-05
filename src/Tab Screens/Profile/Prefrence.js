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
    Dimensions
} from 'react-native'
import Color from '../../components/Color';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MainBtn from '../../components/MainBtn';
import api_url from '../../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';



const Prefrence = ({ navigation }) => {


    const showToast = (type, text) => {
        Toast.show({
            type: type,
            text1: text,
        });
    }




    const [allUser, setAllUser] = useState([])


    useFocusEffect(
        React.useCallback(()=>{
            functionGet()
        },[])
    )



    const functionGet = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        console.log(userId, '--------------------------------')
        axios.get(`${api_url}/preferences/get/${userId}`).then((res) => {
            console.log(res.data)
            setAllUser(res.data?.data)
        })
    }

    console.log(allUser?.startAge)


    const [startAge, setStartAge] = useState(allUser?.startAge)
    const [endAge, setEndAge] = useState(allUser?.endAge)
    const [startHeight, setStartHeight] = useState(allUser?.startHeight)
    const [endHeight, setEndHeight] = useState(allUser?.endHeight)
    const [maritalStatus, setMaritalStatus] = useState(allUser?.maritalStatus)
    const [country, setCountry] = useState(allUser?.country)
    const [state, setState] = useState(allUser?.state)
    const [religion, setReligion] = useState(allUser?.religion)
    const [tongue, setTongue] = useState(allUser?.tongue)
    const [community, setCommunity] = useState(allUser?.community)
    const [gender, setGender] = useState(null)
    const [qualification, setQualification] = useState(allUser?.qualification)
    const [workingWith, setWorkingWith] = useState(allUser?.workingWith)
    const [workingAs, setWorkingAs] = useState(allUser?.workingAs)
    const [annualIncome, setAnnualIncome] = useState(allUser?.annualIncome)
    const [profileFor, setProfileFor] = useState(allUser?.profileFor)

    const submit = async () => {
        // if (imageupload.length===0 ) {
        //   showToast('error', 'Must add images')
        // }

        // else {

        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        console.log(userId, '--------------------------------')



        const param = {
            'userId': userId,
            'startAge': startAge,
            'endAge': endAge,
            'startHeight': startHeight,
            'endHeight': endHeight,
            'profileFor': profileFor,
            'gender': gender,
            'maritalStatus': maritalStatus,
            'state': state,
            'tongue': tongue,
            'religion': religion,
            'community': community,
            'country': country,
            'qualification': qualification,
            'workingWith': workingWith,
            'workingAs': workingAs,
            'annualIncome': annualIncome,

        }





        fetch(`${api_url}/preferences/update/${userId}`, {
            method: 'PUT',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify(param),
        }).then(response => response.json()).then(data => {
            console.log(data)
            if (data.status === 'ok') {
                showToast('success', 'Preference Updated.');
                navigation.navigate(`home`);

            } else if (data.status === 'fail') {
                showToast('error', data?.message)
            }
        })




        // }



    }


    return (
        <View style={{
            width: '100%',
            height: '100%',

        }}>

            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{ marginHorizontal: 5 }}>
                        <AntDesign size={25} color={'black'} name="arrowleft" />
                    </TouchableOpacity>
                    <Text style={styles.Heading}>Preferences</Text>
                </View>
            </View>


            <ScrollView
                contentContainerStyle={{
                    backgroundColor: '#eee',
                    padding: 10
                }}>


                <View>
                    <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 45, padding: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Basic Detail</Text>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: '#EC302E', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>C</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Age Range</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={(value) => setStartAge(value)}
                                            defaultValue={allUser?.startAge}
                                            keyboardType='numeric'
                                            placeholder='from'
                                            placeholderTextColor='gray'
                                            style={{
                                                width: 40,
                                                alignSelf: 'center',
                                                marginVertical: -5,
                                                borderColor: Color.secondary,
                                                fontSize: responsiveFontSize(1.7),
                                                color: "black"

                                            }}
                                        />
                                        <Text style={{ color: 'black', fontSize: 11 }}>to</Text>
                                        <TextInput
                                            onChangeText={(value) => setEndAge(value)}
                                            
                                            defaultValue={allUser?.endAge?.toString()}
                                            placeholder='end'
                                            placeholderTextColor='gray'
                                            keyboardType='numeric'
                                            style={{
                                                width: 50,
                                                alignSelf: 'center',
                                                marginVertical: -5,
                                                borderColor: Color.secondary,
                                                fontSize: responsiveFontSize(1.7),
                                                textAlign: 'center',color: "black"

                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: '#EC302E', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>H</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Height</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={(value) => setStartHeight(value)}
                                            
                                            defaultValue={allUser?.startHeight?.toString()}
                                            placeholder='from'
                                            placeholderTextColor='gray'
                                            style={{
                                                width: 40,
                                                alignSelf: 'center',
                                                marginVertical: -5,
                                                borderColor: Color.secondary,
                                                fontSize: responsiveFontSize(1.7),color: "black"

                                            }}
                                            keyboardType='numeric'
                                        />
                                        <Text style={{ color: 'black', fontSize: 11 }}>to</Text>
                                        <TextInput
                                            onChangeText={(value) => setEndHeight(value)}
                                            
                                            defaultValue={allUser?.endHeight?.toString()}
                                            placeholder='end'
                                            keyboardType='numeric'
                                            placeholderTextColor='gray'
                                            style={{
                                                width: 50,
                                                alignSelf: 'center',
                                                marginVertical: -5,
                                                borderColor: Color.secondary,
                                                fontSize: responsiveFontSize(1.7),
                                                textAlign: 'center',color: "black"

                                            }}
                                        />
                                    </View>

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: '#EC302E', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>M</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Martial Status</Text>
                                    <TextInput
                                        onChangeText={(value) => setMaritalStatus(value)}
                                        defaultValue={allUser?.maritalStatus?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7)
                                            ,color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>



                </View>




                <View>
                    <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 45, padding: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Location</Text>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>C</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Country Living in</Text>
                                    <TextInput
                                        onChangeText={(value) => setCountry(value)}
                                        
                                        defaultValue={allUser?.country?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>H</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>State Living in</Text>
                                    <TextInput
                                        onChangeText={(value) => setState(value)}
                                        defaultValue={allUser?.state?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>






                <View>
                    <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 45, padding: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Community</Text>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>I</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Religion</Text>
                                    <TextInput
                                        onChangeText={(value) => setReligion(value)}
                                        
                                        defaultValue={allUser?.religion?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>C</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Community</Text>
                                    <TextInput
                                        onChangeText={(value) => setCommunity(value)}
                                        defaultValue={allUser?.community?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'orange', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>C</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Mother Tongue</Text>
                                    <TextInput
                                        onChangeText={(value) => setTongue(value)}
                                        defaultValue={allUser?.tongue?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7)
                                            ,color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>







                <View>
                    <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 45, padding: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Education & Career</Text>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>Q</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Qualification</Text>
                                    <TextInput
                                        onChangeText={(value) => setQualification(value)}
                                        defaultValue={allUser?.qualification?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>



                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>W</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Working with</Text>
                                    <TextInput
                                        onChangeText={(value) => setWorkingWith(value)}
                                        defaultValue={allUser?.workingWith?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>



                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>P</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Profession</Text>
                                    <TextInput
                                        onChangeText={(value) => setWorkingAs(value)}
                                        defaultValue={allUser?.workingAs?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>P</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Annual income</Text>
                                    <TextInput
                                        onChangeText={(value) => setAnnualIncome(value)}
                                        defaultValue={allUser?.annualIncome?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7),color: "black"

                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>


                </View>






                <View>
                    <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, width: '100%', height: 45, padding: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Other Detail</Text>
                    </View>


                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ backgroundColor: 'pink', padding: 10, borderRadius: 10, width: 35, alignItems: 'center', }}>
                                    <Text style={{ color: 'white' }}>P</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: '#777', fontSize: 14 }}>Profile created by</Text>
                                    <TextInput
                                        onChangeText={(value) => setProfileFor(value)}
                                        defaultValue={allUser?.profileFor?.toString()}
                                        placeholder='Enter now'
                                        placeholderTextColor='gray'
                                        style={{
                                            width: 150,
                                            alignSelf: 'center',
                                            marginVertical: -5,
                                            borderColor: Color.secondary,
                                            fontSize: responsiveFontSize(1.7)
                                            ,color: "black"
                                        }}
                                    />

                                </View>
                            </View>
                            <TouchableOpacity >
                                <View style={{ flexDirection: 'row' }}>

                                    <Feather
                                        style={{}}
                                        name="edit"
                                        size={20}
                                        color={'#777'}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>


                </View>


                <View style={{ width: '100%', bottom: 20 }}>
                    <MainBtn
                        onPress={submit}
                        style={{
                            backgroundColor: Color.primary,
                            marginTop: responsiveHeight(7),
                            width: '100%'
                        }}
                        title={'Add'}
                    />

                </View>



            </ScrollView>






        </View>
    )
}

export default Prefrence



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