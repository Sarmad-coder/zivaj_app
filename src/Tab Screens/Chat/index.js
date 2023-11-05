import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import SubHeader from '../../components/SubHeader'
import Color from '../../components/Color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api_url from '../../../ApiUrl'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import SubHeader3 from '../../components/SubHeader3'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MyLoader from '../../components/MyLoader'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const Chat = ({ navigation }) => {

    const showToast = (type, text) => {
        Toast.show({
          type: type,
          text1: text,
        });
      }

    const [allUser, setAllUser] = useState([])


    useFocusEffect(
        React.useCallback(() => {
            functionGet()
        }, [])
    )




    const functionGet = async () => {
        const myuserId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        axios.get(`${api_url}/follow/match`).then((res) => {
            console.log(res.data)
      
      
            function filterMatchingUsers(array, userId) {
                return array.filter(item => {
                  const matchingItem = array.find(
                    otherItem =>
                      otherItem.fromUserId === item.toUserId &&
                      otherItem.toUserId === item.fromUserId &&
                      otherItem.follow === "like" &&
                      item.follow === 'like' &&
                      otherItem.fromUserId === userId
                  );
                  return matchingItem !== undefined;
                });
              }
      
      
            const filteredArray = filterMatchingUsers(res.data.data, myuserId);
      
      
      
            setAllUser(filteredArray)
            setvisible(false)
        })
    }


    const [visible,setvisible]=useState(true)


    return (
        <View style={styles.container}>
            {visible ? <MyLoader top='45%' /> : null}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ width: '70%' }}>
                    <SubHeader3 press={async() => {
                            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                            if(userStatus){
                              navigation.navigate('shorts')
                            }
                            else{
                              showToast('error', 'You are not verfied from admin.')
                            }
                }} />
                </View>
            </View>
            <View style={{ marginHorizontal: responsiveWidth(4), bottom: responsiveHeight(2), marginTop: responsiveHeight(3) }}>
                <Text style={{ fontSize: responsiveFontSize(1.8), color: Color.primary, fontWeight: 600 }}>Your Chats</Text>
            </View>
            <View style={styles.bodyStyle}>
                {allUser.length > 0 ? allUser.map(i => {
                    return (
                        <>
                            <TouchableOpacity onPress={async() => {
                                const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                if (userStatus) {
                                    navigation.navigate('mainChat', { 'chatId': i?.userFrom?.id, 'chatName': i?.userFrom?.firstName + ' ' + i?.userFrom?.lastName, 'chatImage':i?.userFrom?.image1 })                                }
                                else {
                                    showToast('error', 'You are not verfied from admin.')
                                }
                                }
                                }>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20,
                                    marginHorizontal: responsiveWidth(2)
                                }}>
                                    <View>
                                        <Image
                                            source={{ uri: i?.userFrom?.image1 }}
                                            style={{ height: 55, width: 55, borderRadius: 100 }}
                                        />
                                    </View>
                                    <View>
                                        <View style={{ width: responsiveWidth(64), marginLeft: responsiveWidth(3), bottom: responsiveHeight(0) }}>
                                            <Text style={{
                                                fontSize: responsiveFontSize(2), fontFamily: "Quicksand-Regular",
                                                fontWeight: '700', color: '#121212'
                                            }}>{i?.userFrom?.firstName + " " + i?.userFrom?.lastName}</Text>
                                            <Text style={{
                                                fontSize: responsiveFontSize(1.5),
                                                fontWeight: '500', color: 'gray'
                                            }}>Sticker </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: responsiveWidth(5), marginright: responsiveWidth(0) }}>
                                        <AntDesign name='right' size={18} />

                                    </View>

                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }) : null}

            </View>
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        backgroundColor: '#FFFFFF'
    },
    bodyStyle: {
        height: responsiveHeight(8),
        marginHorizontal: responsiveWidth(3),
        marginTop: responsiveHeight(1)

    },
})