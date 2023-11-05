import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    PermissionsAndroid,
    TouchableHighlight,
    ImageBackground,
    Image
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import normalize from 'react-native-normalize';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

import { MediaStream, RTCView } from 'react-native-webrtc';




const VideoCall = ({ route, navigation }) => {
    
    

    const { chatId, chatName, chatImage } = route.params



    return (
        <View style={styles.container}>

                <ImageBackground style={{ height: '100%' }} source={require('../../components/Images/sp2.png')}>
                    <LinearGradient colors={[
                        'rgba(0,0,0,0.0)',
                        'rgba(0,0,0,0.5)',
                        'rgba(0,0,0,0.7)',

                    ]} style={{ height: '100%' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '40%' }}>
                            <Image source={{ uri: chatImage }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{chatName}</Text>
                            <Text style={{ color: 'white', fontSize: 23, }}>Zivaj Video Call</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 30, width: '100%' }}>

                            <TouchableHighlight
                                style={{ width: 60, height: 60, borderRadius: 60, backgroundColor: 'green', marginLeft: 40, justifyContent: 'center', alignItems: 'center' }}
                                onPress={()=>navigation.navigate('startVideoCall', { 'chatId': chatId, 'chatName': chatName, 'chatImage':chatImage })}>
                                <Ionicons name='call' size={24} color="white" />
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ width: 60, height: 60, borderRadius: 60, backgroundColor: 'red', marginRight: 40, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.goBack()}>
                                <Ionicons name='call' size={24} color="white" />
                            </TouchableHighlight>

                        </View>
                    </LinearGradient>

                </ImageBackground>
         

            {/* {(status === 'connected' || status === 'connecting') && (
                <View style={styles.callContainer}>
                    {
                        (status === 'connected' || status === 'connecting') && (
                            <View style={styles.callContainer}>
                                {status === 'connected' && (
                                    <View style={styles.remoteGrid}>
                                        <TouchableOpacity
                                            style={styles.remoteVideo}
                                            onPress={() => {
                                                setIsButtonDisplay(!isButtonDisplay);
                                            }}>
                                            {Array.from(videoTracks, ([trackSid, trackIdentifier]) => (
                                                <TwilioVideoParticipantView
                                                    style={styles.remoteVideo}
                                                    key={trackSid}
                                                    trackIdentifier={trackIdentifier}
                                                />
                                            ))}
                                        </TouchableOpacity>
                                        <TwilioVideoLocalView
                                            enabled={true}
                                            style={
                                                isButtonDisplay
                                                    ? styles.localVideoOnButtonEnabled
                                                    : styles.localVideoOnButtonDisabled
                                            }
                                        />
                                    </View>
                                )}
                                <View
                                    style={{
                                        display: isButtonDisplay ? 'flex' : 'none',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        height: 100,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                        zIndex: isButtonDisplay ? 2 : 0,
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            display: isButtonDisplay ? 'flex' : 'none',
                                            width: 60,
                                            height: 60,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderRadius: 100 / 2,
                                            backgroundColor: 'grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={_onMuteButtonPress}>
                                        <MIcon name={isAudioEnabled ? 'mic' : 'mic-off'} size={24} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            display: isButtonDisplay ? 'flex' : 'none',
                                            width: 60,
                                            height: 60,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderRadius: 100 / 2,
                                            backgroundColor: 'grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={_onEndButtonPress}>
                                        <MIcon name="call-end" size={28} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            display: isButtonDisplay ? 'flex' : 'none',
                                            width: 60,
                                            height: 60,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderRadius: 100 / 2,
                                            backgroundColor: 'grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={_onFlipButtonPress}>
                                        <MCIcon name="rotate-3d" size={28} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </View>
            )} */}

            
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%'
    },
    callContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        minHeight: "100%"
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 40,
        color: "black",
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginRight: 70,
        marginLeft: 70,
        marginTop: 50,
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
    },
    button: {
        marginTop: 100
    },
    localVideoOnButtonEnabled: {
        bottom: ("40%"),
        width: "35%",
        left: "64%",
        height: "25%",
        zIndex: 2,
    },
    localVideoOnButtonDisabled: {
        bottom: ("30%"),
        width: "35%",
        left: "64%",
        height: "25%",
        zIndex: 2,
    },
    remoteGrid: {
        flex: 1,
        flexDirection: "column",
    },
    remoteVideo: {
        width: wp("100%"),
        height: hp("100%"),
        zIndex: 1,
    },
    optionsContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        zIndex: 2,
    },
    optionButton: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: "center"
    },
    spacing: {
        padding: 10
    },
    inputLabel: {
        fontSize: 18,
        color: 'black',
    },
    buttonContainer: {
        height: normalize(45),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: wp('40%'),
        borderRadius: 230,
    },
    loginButton: {
        backgroundColor: "#1E3378",
        width: wp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10
    },
    Buttontext: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18
    },
    inputBox: {
        borderBottomColor: '#cccccc',
        fontSize: 16,
        width: wp("95%"),
        borderBottomWidth: 1,
        color: 'black'
    },
});

export default VideoCall;








// Live credential

// Account SID: ACbb6d2eee8eeb610710b1501d10d32d2f
// Auth token: 888f476669a3ed53ac2f185c4951a3be


// Test credential

// Account SID: ACd9855b8c7a99f93940afb9be39e77811
// Auth token: 2563e864d19f8dd8856bcfba80d6b303

