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
import  AntDesign from 'react-native-vector-icons/AntDesign';

const Help = ({ navigation }) => {


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor:'#FFFFFF',

        }}>

            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: 5 }}>
                        <AntDesign size={25} color={'black'} name="arrowleft" />
                    </TouchableOpacity>
                    <Text style={styles.Heading}>Help and Information</Text>
                </View>
            </View>


            <ScrollView
                contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 10
                }}>


                <View style={{marginBottom:10}}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Contact Us</Text>
                </View>


                <View style={{ width: '100%',backgroundColor:'#eee',padding:20,alignItems:'center',justifyContent:'center',alignSelf:'center',borderRadius:10,marginBottom:10 }}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'black',marginBottom:10}}>Pakistan +92320 2230867</Text>

                    <Text style={{color:'black',textAlign:'center'}}>You can contact us directly for any queries or issues on this number directly or you can chat with us live on our support chat 24/7</Text>



                </View>

                <View style={{ width: '100%',backgroundColor:'#eee',padding:10,flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:10 }}>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Need Instant Help?</Text>




                </View>




                <View style={{ width: '100%', bottom: 20 }}>
                    <MainBtn
                        onPress={()=>navigation.navigate('adminChat')}
                        style={{
                            backgroundColor: Color.primary,
                            marginTop: responsiveHeight(7),
                            width: '100%',
                            fontSize: 16
                        }}
                        title={'24/7 live chat'}
                    />

                </View>



            </ScrollView>






        </View>
    )
}

export default Help



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