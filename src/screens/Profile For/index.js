import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import BackBtn from '../../components/BackBtn';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native';

const ProfileFor = ({route,navigation}) => {

  const showToast = (type,text) => {
    Toast.show({
      type: type,
      text1: text,
    });
}


  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemGender, setSelectedItemGender] = useState(null);
  const data = [
    {id: 1, label: 'My Son', name: 'mySon'},
    {id: 2, label: 'My Self', name: 'mySelf'},
    {id: 3, label: 'My Daughter', name: 'myDaughter'},
    {id: 4, label: 'My Sister', name:'mySister'},
    {id: 5, label: 'My Brother', name:'myBrother'},
    {id: 6, label: 'My Relative', name:'myRelative'},
    {id: 7, label: 'My Friend', name:'myFriend'},
  ];
  const data1 = [
    {id: 1, label: 'Male',name: 'male'},
    {id: 2, label: 'Female',name:'female'},
  ];
  const handleMultiBtn = (item) =>{
    setSelectedItem(item.name)
    console.log(item.label);
  }
  const handleMultiBtnGender = (item) =>{
    setSelectedItemGender(item.name)
  }

  const handleMainBtn = () => {
    // navigation.replace('userDateBirth')
    console.log("hey");
  }


  const {email,phone} = route.params;


  const submit=()=>{
    if(selectedItem===null){
      showToast('error','Must select profile for')
  }
  else  if(selectedItemGender===null){
      showToast('error','Must select gender')
  }
  
  else{
    navigation.navigate('userDateBirth',{email: email, phone: phone,profileFor:selectedItem,gender:selectedItemGender})
  }
  }



  return (
    <View style={style.container}>
      <ScrollView>
      <Image
        style={style.halfCircle}
        source={require('../../components/Images/half.png')}
      />
      <BackBtn onPress={()=>navigation.goBack()} style={style.backBtn} />
      <View style={style.avatar}>
        <Image
          style={style.avatarStyle}
          source={require('../../components/Images/profileIcon.png')}
        />
        <Text style={style.headerTxt}>Please help us here </Text>
        <Text style={style.subHeaderTxt}>
          Se we can find a perfect match for you
        </Text>
        <Text style={style.SecondheaderTxt}>This Profile is for</Text>
    
     
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{marginTop:10, right:responsiveWidth(2),width:'100%'}}
        renderItem={({item}) => 
        <TouchableOpacity
        onPress={() => handleMultiBtn(item)}
          style={{
            paddingHorizontal: responsiveWidth(7.7),
            height: 40,
            backgroundColor:'transparent',
            marginLeft: 10,
            borderWidth:1,
            borderColor:'#A9A9A9',
            borderRadius:5,
            marginBottom: 10,
            alignItems: 'center',
            flexDirection:'row'
          }}>
            <Image style={{width:25, height:25, tintColor: selectedItem === item.name ? null : Color.gray,  right:25}} source={require('../../components/Images/tick.png')}/>
          <Text style={{color: '#A9A9A9', fontSize:responsiveFontSize(1.8)}}>{item.label}</Text>
        </TouchableOpacity>
        }
        keyExtractor={item => item.id}
      />
        <Text style={style.SecondheaderTxt}>Gender</Text>
        <FlatList
        data={data1}
        numColumns={2}
        contentContainerStyle={{marginTop:10, marginRight:10, right:responsiveWidth(2)}}
        renderItem={({item}) => 
        <TouchableOpacity
        onPress={() => handleMultiBtnGender(item)}
          style={{
            paddingHorizontal: responsiveWidth(8),
            height: 40,
            backgroundColor:'transparent',
            marginLeft: 10,
            borderWidth:1,
            borderColor:'#A9A9A9',
            borderRadius:5,
            marginBottom: 10,
            alignItems: 'center',
            flexDirection:'row'
          }}>
            <Image style={{width:25, height:25, tintColor: selectedItemGender === item.name ? null : Color.gray,  right:25}} source={require('../../components/Images/tick.png')}/>
          <Text style={{color: '#A9A9A9', fontSize:responsiveFontSize(1.8)}}>{item.label}</Text>
        </TouchableOpacity>
        }
        keyExtractor={item => item.id}
      />
      <MainBtn style={{backgroundColor:Color.primary, marginTop:responsiveHeight(10)}}  title={"Continue"}  onPress={submit}/>
        </View>
        </ScrollView>
    </View>
  );
};

export default ProfileFor;
