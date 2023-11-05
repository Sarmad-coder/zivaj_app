import { View, Text,TextInput, Image, FlatList, StyleSheet, ImageBackground, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import SubHeader2 from '../../components/SubHeader2'
import Color from '../../components/Color';
import LinearGradient from 'react-native-linear-gradient';
import { Video, usePlaybackStatus } from 'expo-av';
import InstaPost from '../../components/Reel';
import SubHeader3 from '../../components/SubHeader3';
import Modal from "react-native-modal";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import api_url from '../../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Swiper from 'react-native-deck-swiper';
import Home from './index';
import Reel from './Reel';
import { Dimensions } from 'react-native';






const HomeTab = ({ navigation }) => {
  const [btn, setBtn] = useState('tenderComponent')
  const [isModalVisible, setModalVisible] = useState(false);

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
      functionNotUse()
    }, [])
  )



  const functionGetReel = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))

    axios.get(`${api_url}/follow/get/${userId}`).then((res) => {
      console.log(res.data, 'reel user=========================>>>>>>>>>>');
      setReelUser(res.data?.data)
    })
  }








  const functionGet = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    axios.get(`${api_url}/users/my/${userId}`).then((res) => {
      console.log(res.data)
      setAllUser(res.data?.data)
    })
  }



  const functionNotUse = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    axios.put(`${api_url}/users/notUseApp/${userId}`).then((res) => {
      console.log(res.data, 'notUseApp')
    })
  }




  const [reelUser, setReelUser] = useState([])


  useFocusEffect(
    React.useCallback(() => {
      functionGetReel()
    }, [])
  )





  const images = [];


  reelUser && reelUser.map(i => {
    if (i?.follow === 'like' && i?.userTo?.reel.length > 0) {
      images.push({ id: i?.userTo?.id, url: i?.userTo?.image1.length > 0 ? i?.userTo?.image1 : 'https://res.cloudinary.com/ddu4sybue/image/upload/v1677572160/Group_6_ijye6n.png', label: i?.userTo?.firstName });
    }
  })







  // set last direction and decrease current index
  const swiperRef = useRef(null);

  console.log(swiperRef.current)



  const [status, setStatus] = useState('FAQ')








  const [tabBarHeight, setTabBarHeight] = useState(0);
  const tabBarRef = useRef(null);

  const handleTabBarLayout = () => {
    tabBarRef.current.measure((x, y, width, height) => {
      setTabBarHeight(height);
    });
  };





  console.log(tabBarHeight,'current screen height in main')




















  // myreeltab













  return (
    <View ref={tabBarRef} onLayout={handleTabBarLayout} style={{ backgroundColor: 'white', flex: 1, width: '100%' }}>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {status !== 'home' ? <SubHeader2 /> : <SubHeader3 press={async() => {
          const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
          if(userStatus){
            navigation.navigate('shorts')
          }
          else{
            showToast('error', 'You are not verfied from admin.')
          }
        }} />}
      </View>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: responsiveHeight(15), }}>
        <View style={{ padding: 8, alignItems: 'center', position: 'relative' }}>
          <TouchableOpacity style={{ width: 70, height: 70, backgroundColor: 'transparent', alignItems: "center", justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: '#E7E5EB' }}
            onPress={async() => {
              const userStatus = JSON.parse(await AsyncStorage.getItem("mainuserStatus"))
              if(userStatus){
                navigation.navigate('shorts')
              }
              else{
                showToast('error', 'You are not verfied from admin.')
              }
            }}
          >
            <Image source={{ uri: allUser?.image1 }} style={{
              width: 65,
              height: 65,
              borderRadius: 100,
            }} />
          </TouchableOpacity>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/399/399271.png' }} style={{
            position: 'absolute',
            width: 15,
            height: 15,
            borderRadius: 100,
            bottom: 25,
            left: 55
          }} />
          <Text style={{ fontSize: responsiveFontSize(1.3), color: Color.secondary, fontWeight: 'bold', }}>Post Reel</Text>
        </View>
        {allUser?allUser?.reel?.length>0?<View style={{ padding: 8, alignItems: 'center', position: 'relative' }}>
          <TouchableOpacity style={{ width: 70, height: 70, backgroundColor: 'transparent', alignItems: "center", justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: '#E7E5EB' }}
            onPress={() => navigation.navigate('status', { reelId: allUser?.id })}
          >
            <Image source={{ uri: allUser?.image1 }} style={{
              width: 65,
              height: 65,
              borderRadius: 100,
            }} />
          </TouchableOpacity>
         
          <Text style={{ fontSize: responsiveFontSize(1.3), color: Color.secondary, fontWeight: 'bold', }}>{allUser?.firstName}</Text>
        </View>:null:null}
        
        <FlatList
          horizontal
          data={images}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              <View style={{ padding: 8, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: 70, height: 70, backgroundColor: 'transparent', alignItems: "center", justifyContent: 'center', borderRadius: 100, borderWidth: 1, borderColor: '#E7E5EB' }}
                  onPress={() => navigation.navigate('status', { reelId: item?.id })}
                >
                  <Image source={{ uri: item.url }} style={{
                    width: 65,
                    height: 65,
                    borderRadius: 100,
                  }} />
                </TouchableOpacity>
                {
                  index === 0 ? <Image source={{ uri: item.url1 }} style={{
                    width: 15,
                    borderRadius: 100,
                    bottom: responsiveHeight(1.9),
                    left: responsiveWidth(5)
                  }} /> : null
                }
                <Text style={{ fontSize: responsiveFontSize(1.3), color: 'black', fontWeight: 'bold' }}>{item.label}</Text>
              </View>
            </>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{ width: responsiveWidth(95), height: 40, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity style={{ width: '49.5%', height: '100%', backgroundColor: status !== 'home' ? Color.primary : '#ccc', alignItems: 'center', justifyContent: 'center' }} onPress={() => setStatus('reel')}>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5), fontWeight: '400' }}>Profiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '49.5%', height: '100%', backgroundColor: status !== 'home' ? '#ccc' : Color.primary, alignItems: 'center', justifyContent: 'center' }} onPress={() => setStatus('home')}>
          <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5), fontWeight: '400' }}>Reels</Text>
        </TouchableOpacity>
      </View>



      <View>
        {status !== 'home' ? (<Home/>) : (<Reel mnheight={tabBarHeight}/>)}
      </View>




    </View>
  )
}


export default HomeTab




const styleess = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    bottom: 0
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});




const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: responsiveWidth(90),
    height: 450,
    // backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card1: {
    // backgroundColor: '#FE474C',
  },
  card2: {
    // backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },

});



const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 5
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 20,
  },
  cardContainer: {
    width: '95%',
    maxWidth: 320,
    height: 380,
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: 350,
    height: 400,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 10,
    position: 'relative',
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}







// myhome styles

const homestyleess = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});



const homestyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: responsiveWidth(90),
    height: 450,
    // backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card1: {
    // backgroundColor: '#FE474C',
  },
  card2: {
    // backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },

});


const homestyles = {
  container: {
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
  },
  cardContainer: {
    width: '95%',
    maxWidth: 320,
    height: 30,
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: 350,
    height: 400,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 5,
    resizeMode: 'cover',
    marginBottom: 10,
    position: 'relative',
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}





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