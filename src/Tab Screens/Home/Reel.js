import { View, Text, Image, FlatList, StyleSheet, ImageBackground, ScrollView, Button, TouchableOpacity, ActivityIndicator, StatusBar, Share } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SubHeader2 from '../../components/SubHeader2'
import Color from '../../components/Color';
// import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import InstaPost from '../../components/Reel';
import Modal from "react-native-modal";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api_url from '../../../ApiUrl';
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native';
// import { Ionicons } from 'react-native-vector-icons';
// import { FontAwesome } from 'react-native-vector-icons';
import MyLoader from '../../components/MyLoader';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons';

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import { useSafeAreaInsets } from 'react-native-safe-area-context';



const Reel = ({ mnheight }) => {

    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    const statusBarHeight = StatusBar.statusBarHeight || 0;

    console.log(statusBarHeight)

    const { bottom } = useSafeAreaInsets();

    const navigation = useNavigation()
    const [btn, setBtn] = useState('tenderComponent')
    const [isModalVisible, setModalVisible] = useState(false);

    const showToast = (type, text) => {
        Toast.show({
            type: type,
            text1: text,
        });
    }



    const [myId, setMyId] = useState()

    const [allUser, setAllUser] = useState([])

    const [myreelid, setMyreelid] = useState()




    const [currentVideo, setCurrentVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    const onVideoLoad = () => {
        setLoading(false);
    };



    const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

    const handleVideoPress = (index, videoUri) => {
        if (index === currentVideoIndex) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentVideoIndex(index);
            setCurrentVideo(videoUri);
            setIsPlaying(true);
        }
        setLoading(true);
    };






    const functionGet = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        setMyId(userId)
        axios.get(`${api_url}/reel/get`).then((res) => {
            console.log(res.data)
            if (res.data.status === 'ok') {
                setAllUser(res.data?.data)
                setVisible(false)
            }
        })
    }



    const functionNotUse = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
        axios.put(`${api_url}/users/notUseApp/${userId}`).then((res) => {
            console.log(res.data, 'notUseApp')
        })
    }



    const [tabBarHeightreel, setTabBarHeightreel] = useState(0);
    const tabBarRef = useRef(null);

    const handleTabBarLayoutreel = () => {
        tabBarRef.current.measure((x, y, width, height) => {
            setTabBarHeightreel(height);
        });
    };





    console.log(tabBarHeightreel, 'current screen height in reel')






    const [reelUser, setReelUser] = useState([])
    const [reelComment, setReelComment] = useState([])


    useFocusEffect(
        React.useCallback(() => {
            functionGetReel()
        }, [])
    )


    const [my, setMy] = useState()


    const functionGetReel = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

        axios.get(`${api_url}/follow/get/${userId}`).then((res) => {
            // console.log(res.data, 'reel user=========================>>>>>>>>>>');
            // setReelUser(res.data?.data)\
            if (res.data.data?.length > 0) {
                const arr = res.data.data.map(e => {
                    if (e.select === undefined) {
                        e.select = false;
                    }
                    return e;
                }

                );
                setReelUser(arr)
                console.log(arr, '=====================================>>>>>>>>>>>>>>>>>>>>>>>>')


            }
        })


        axios.get(`${api_url}/users/my/${userId}`).then((res) => {
            // console.log(res.data, 'my=========================>>>>>>>>>>');
            setMy(res.data?.data)
        })



    }


    const [singleVideo, setSingleVideo] = useState(null)
    // const [currentVideo, setCurrentVideo] = useState('')
    // const [loading, setLoading] = useState(true);



    // const [current, setCurrent] = useState(0);

    // const handleVideoPress = (index) => {
    //     setCurrent(index);
    // };




    const handlecategoryColor = (val, index) => {
        let temp = reelUser.slice(0);
        temp[index].select = val === false ? true : false;
        setReelUser(temp);
        // if (temp[index].select === true) {
        //   let id = temp[index];
        //   let Arr = [...selectedData, id];
        //   setSelectedData(Arr);
        // } else if (temp[index].select !== true) {
        //   selectedData.pop();
        // }
    };








    const images = [];


    reelUser && reelUser.map(i => {
        if (i?.follow === 'like') {
            images.push({ id: i?.userTo?.id, url: i?.userTo?.image1.length > 0 ? i?.userTo?.image1 : 'https://res.cloudinary.com/ddu4sybue/image/upload/v1677572160/Group_6_ijye6n.png', label: i?.userTo?.firstName });
        }
    })


    const [myLike, setMyLike] = useState()


    const submitFollow = async (id) => {

        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

        const params = {
            'userId': userId,
            'reelId': id,

        }


        fetch(`${api_url}/like/create`, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify(params),
        }).then(response => response.json()).then(data => {
            console.log(data)
            if (data.status === 'ok') {
                functionGet()
                // showToast('success', data.message);
            } else if (data.status === 'fail') {
                showToast('error', data?.message)
            }
        })


        // axios.post(`${api_url}follow/create`, params).then((res) => {
        //   if (res.data.status === 'ok') {
        //     showToast('success', `You ${name} this posts!`);

        //   }
        //   else {
        //     showToast('error', res.data.message);
        //   }
        // })


    }


    const submitDisllike = async (id) => {

        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

        const params = {
            'userId': userId,
            'reelId': id,

        }


        fetch(`${api_url}/like/dislike`, {
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
                functionGet()
                // showToast('success', data.message);
            } else if (data.status === 'fail') {
                showToast('error', data?.message)
            }
        })


        // axios.post(`${api_url}follow/create`, params).then((res) => {
        //   if (res.data.status === 'ok') {
        //     showToast('success', `You ${name} this posts!`);

        //   }
        //   else {
        //     showToast('error', res.data.message);
        //   }
        // })


    }


    const [isBuffering, setIsBuffering] = useState(true);
    const [heart, setHeart] = useState('')
    const [isMuted, setIsMuted] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            functionGet()
            functionNotUse()
        }, [])
    )



    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded && status.isPlaying && !status.isBuffering) {
            setIsBuffering(false);
        }

        if (status.isBuffering && !status.isLoaded && !status.isPlaying) {
            setIsBuffering(true);
        }

    };



    const [isPlaying, setIsPlaying] = useState(false);
    const video = React.useRef(null);

    // const togglePlay = async () => {
    //     if (isPlaying) {
    //         await video.current.pauseAsync();
    //     } else {
    //         await video.current.playAsync();
    //     }
    //     setIsPlaying(!isPlaying);
    // };


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const [comment, setComment] = useState('')


    const submitComment = async (id) => {

        const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))



        if (!comment) {
            showToast('error', 'Must enter some comment');
        }

        else {


            setComment('')

            const param = {
                'message': comment,
                'reelId': id,
                'userId': userId
            }



            fetch(`${api_url}/comment/create`, {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify(param),
            }).then(response => response.json()).then(data => {
                console.log(data)
                if (data.status === 'ok') {
                    axios.get(`${api_url}/comment/getSingleUser/${myreelid}`).then((res) => {
                        console.log(res.data, 'reel comment=========================>>>>>>>>>>');
                        setReelComment(res.data?.data)
                    })
                    showToast('success', 'Comment on video.');

                } else if (data.status === 'fail') {
                    showToast('error', data?.message)
                }
            }).catch(err => {
                console.log(err)
            })


        }

    }


    const [visible, setVisible] = useState(true);



    const [myPlaying, setMyPlaying] = useState(true);


    useEffect(() => {
        setInterval(() => {
            setMyPlaying(false);
        }, 1500);
    }, []);

    const shareData = async (url) => {
        try {
            await Share.share({
                title: 'Share',
                message: url,
            });
        } catch (error) {
            alert(error.message);
        }
    };







    return (
        <View ref={tabBarRef} onLayout={handleTabBarLayoutreel} style={{ height: '100%', marginBottom: -200 }}>

            {visible ? <MyLoader top='45%' /> : null}

            <Modal isVisible={isModalVisible} coverScreen={false} style={{ width: '100%', position: 'absolute', height: (tabBarHeightreel + (mnheight - tabBarHeightreel)), bottom: bottom, margin: 0, zIndex: 99999999, }}>
                <View style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: 10, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ color: "black" }}>{reelComment.length} Comments</Text>
                        <TouchableOpacity style={reelstyles.optionButton} onPress={() => setModalVisible(false)}>
                            <FontAwesome name="times" size={24} color="black" />
                        </TouchableOpacity>

                    </View>


                    <ScrollView>

                        {reelComment.length > 0 ? reelComment.map((ite, index) => {
                            return (<>
                                <View key={index} style={{ flexDirection: 'row', alignItems: "flex-start", justifyContent: 'space-between', marginBottom: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <Image source={{ uri: ite?.user?.image1 }} style={{ width: 20, height: 20, borderRadius: 20 }} />

                                        <View style={{ backgroundColor: '#eee', width: '90%', minHeight: 30, padding: 10, borderRadius: 10 }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{ite?.user?.firstName}</Text>
                                            <Text style={{ color: 'black' }}>{ite?.message}</Text>
                                        </View>
                                    </View>
                                </View>
                            </>)
                        }) :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 600 }}>
                                <Image source={{ uri: 'https://www.pngmart.com/files/16/Chat-Icon-Transparent-Background.png' }} style={{ width: 100, height: 100 }} resizeMode='contain' />
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                                    No comments found!
                                </Text>
                                <Text style={{ color: '#aaa', fontSize: 16 }}>
                                    Be the first to comment.
                                </Text>
                            </View>
                        }



                    </ScrollView>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={{ uri: my?.image1 }} style={{ width: 24, height: 24, borderRadius: 24 }} />
                            <TextInput placeholder='Add a comment' value={comment} onChangeText={(value) => setComment(value)} placeholderTextColor={'gray'} style={{ color: 'black', width: '83%' }} />
                        </View>
                        <TouchableOpacity onPress={async () => {
                            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                            if (userStatus) {
                                submitComment(myreelid)
                                setComment('')
                            }
                            else {
                                showToast('error', 'You are not verfied from admin.')
                            }

                        }}>
                            <MaterialCommunityIcons name='send' size={24} color='gray' />
                        </TouchableOpacity>
                    </View>



                </View>
            </Modal>


            <ScrollView >


                {allUser.length > 0 ? allUser.slice().reverse().map((i, index) => {
                    return (
                        <>
                            <React.Fragment key={index}>

                                <View style={reelstyles.card}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                        <TouchableOpacity onPress={async () => {
                                            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                            if (userStatus) {
                                                navigation.navigate('viewProfile', { 'pairuserid': i?.user?.id })
                                            }
                                            else {
                                                showToast('error', 'You are not verfied from admin.')
                                            }

                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5 }}>
                                                <Image source={{ uri: i?.user?.image1 }} style={{ width: 35, height: 35, borderRadius: 35 }} />
                                                <View>
                                                    <Text style={reelstyles.cardTitle}>{i?.user?.firstName + ' ' + i?.user?.lastName}</Text>
                                                    {myId===i?.user?.id?null:<Text style={{ color: Color.primary, fontSize: 12, fontWeight: "600" }}>Follow</Text>}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View></View>

                                    </View>

                                    <View style={{ width: '100%', height: '60%', position: 'relative' }} >





                                        {currentVideo === `currentVideo${i?.id}` ?
                                            myPlaying ? (
                                                <>

                                                    <View style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: [{ translateX: -25 }, { translateY: -25 }],
                                                    }}>
                                                        <ActivityIndicator size="small" color="black" style={{ position: 'absolute' }} />
                                                    </View>
                                                </>
                                            ) :
                                                <Video
                                                    ref={video}
                                                    source={{ uri: i.image }}
                                                    style={reelstyles.cardImage}
                                                    resizeMode="contain"
                                                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                                                    onLoadEnd={() => setLoading(false)}
                                                    useNativeControls
                                                    isPlaying={isPlaying && currentVideoIndex === index}
                                                    isBuffering={isBuffering}
                                                /> :
                                            <>
                                                {(!isPlaying || (isBuffering && currentVideoIndex === index)) && (
                                                    <TouchableOpacity
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: [{ translateX: -25 }, { translateY: -25 }],
                                                        }}
                                                        onPress={() => {
                                                            axios.get(`${api_url}/reel/getS/${i?.id}`).then(
                                                                res => {
                                                                    setSingleVideo(res.data.data)
                                                                    setCurrentVideo(`currentVideo${i?.id}`)
                                                                    setLoading(false)
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        <FontAwesome name="play-circle" size={50} color="red" />
                                                    </TouchableOpacity>
                                                )}
                                                {isBuffering && currentVideoIndex === index && (
                                                    <View style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: [{ translateX: -25 }, { translateY: -25 }],
                                                    }}>
                                                        <ActivityIndicator size="small" color="black" style={{ position: 'absolute' }} />
                                                    </View>
                                                )}
                                            </>
                                        }







                                    </View>




                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                            {i?.myLike.includes(myId) ? <TouchableOpacity onPress={async () => {
                                                const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                                if (userStatus) {
                                                    submitFollow(i?.id)
                                                }
                                                else {
                                                    showToast('error', 'You are not verfied from admin.')
                                                }

                                            }
                                            }>
                                                <MaterialCommunityIcons name='heart' size={22} color='red' />
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#999' }}>{i?.myLike.length} Likes</Text>
                                            </TouchableOpacity> :
                                                <TouchableOpacity onPress={async () => {
                                                    const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                                    if (userStatus) {
                                                        submitFollow(i?.id)
                                                    }
                                                    else {
                                                        showToast('error', 'You are not verfied from admin.')
                                                    }
                                                }}>
                                                    <AntDesign name='hearto' size={22} color='#999' />
                                                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#999' }}>{i?.myLike.length} Likes</Text>
                                                </TouchableOpacity>}
                                            {i?.myDislike.includes(myId) ? <TouchableOpacity style={{ marginRight: 10 }} onPress={async() => {
                                                const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                                if (userStatus) {
                                                    submitDisllike(i?.id)
                                                }
                                                else {
                                                    showToast('error', 'You are not verfied from admin.')
                                                }
                                                
                                                }}>
                                                <AntDesign name='dislike1' size={22} color='blue' />

                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#999', alignSelf: 'center' }}>{i?.myDislike.length} Dislikes</Text>
                                            </TouchableOpacity> : <TouchableOpacity style={{ marginRight: 10 }} onPress={async() => {
                                                const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                                if (userStatus) {
                                                    submitDisllike(i?.id)
                                                }
                                                else {
                                                    showToast('error', 'You are not verfied from admin.')
                                                }
                                                
                                                }}>
                                                <AntDesign name='dislike2' size={22} color='#999' />
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#999', alignSelf: 'center' }}>{i?.myDislike.length} Dislikes</Text>
                                            </TouchableOpacity>}
                                            <TouchableOpacity onPress={async() => {
                                                const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                                if (userStatus) {
                                                    shareData(i?.image)
                                                }
                                                else {
                                                    showToast('error', 'You are not verfied from admin.')
                                                }
                                                
                                                }}>
                                                <FontAwesome name='share' size={22} color='#999' />
                                                <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#999' }}>Share</Text>
                                            </TouchableOpacity>


                                        </View>
                                        <TouchableOpacity style={{ backgroundColor: Color.primary, borderRadius: 225, padding: 5, paddingHorizontal: 10 }} onPress={async() => {
                                            const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
                                            if (userStatus) {
                                                navigation.navigate('viewProfile', { 'pairuserid': i?.user?.id })
                                            }
                                            else {
                                                showToast('error', 'You are not verfied from admin.')
                                            }
                                            }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Check Profile</Text>

                                        </TouchableOpacity>


                                    </View>

                                    <View style={{ padding: 10 }}>
                                        {/* {!heart ? <Text style={{ color: "#999" }}>Liked by {myLike} others</Text> : <Text style={{ color: "#999" }}>Liked by you and {myLike} others</Text>} */}

                                        <Text style={{ fontWeight: '500', color: 'black' }}>{i?.about}</Text>

                                        <TouchableOpacity onPress={() => {
                                            toggleModal()
                                            setMyreelid(i?.id)

                                            axios.get(`${api_url}/comment/getSingleUser/${i?.id}`).then((res) => {
                                                console.log(res.data, 'reel comment=========================>>>>>>>>>>');
                                                setReelComment(res.data?.data)
                                            })
                                        }}>

                                            <Text style={{ color: '#bbb', fontSize: 15 }}>View all comment</Text>
                                        </TouchableOpacity>



                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                <Image source={{ uri: my?.image1 }} style={{ width: 24, height: 24, borderRadius: 24 }} />
                                                <TextInput placeholder='Add a comment' placeholderTextColor={'gray'} value={comment} onChangeText={(value) => setComment(value)} style={{ color: 'black', width: '83%' }} />
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                setComment('')
                                                submitComment(i?.id)
                                            }}>
                                                <MaterialCommunityIcons name='send' size={24} color="gray" />
                                            </TouchableOpacity>
                                        </View>



                                    </View>



                                </View>
                            </React.Fragment>
                        </>
                    )
                }) : null}



                {/* <View style={{height:50}}/> */}

            </ScrollView>





            {/* Model */}




        </View>
    )
}

export default Reel


const reelstyles = {
    container: {

        width: '100%',
        marginTop: 10,
    },
    header: {
        color: '#000',
        fontSize: 30,
        marginBottom: 30,
    },
    cardContainer: {
        width: '95%',
        maxWidth: 320,
        // height: 380,
    },
    card: {
        backgroundColor: 'white',
        width: '100%',
        // maxWidth: 350,
        // minHeight: 300,
        height: 520,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        // borderRadius: 5,

        marginBottom: 10,
        borderColor: '#eee',
        borderWidth: 1,

    },
    cardImage: {
        width: '100%',
        height: '100%',
        // overflow: 'hidden',

    },
    cardTitle: {
        // position: 'absolute',
        bottom: 0,
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
    },
    infoText: {
        height: 28,
        justifyContent: 'center',
        display: 'flex',
        zIndex: -100,
    }
}