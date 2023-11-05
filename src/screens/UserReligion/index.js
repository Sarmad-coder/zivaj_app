import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import BackBtn from '../../components/BackBtn';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import Toast from 'react-native-toast-message';


const UserReligion = ({ route, navigation }) => {

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  const handleMainBtn = () => {
    console.log('heu');
  };




  const renderItem = (item) => {
    return (
      <View style={style.item}>
        <Text style={style.textItem}>{item.label}</Text>
      </View>
    );
  };
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];





  const [openReligion, setOpenReligion] = useState(false);
  const [religion, setReligion] = useState(null);
  const [itemsReligion, setItemsReligion] = useState([
    { label: 'Islam', value: 'islam' },
    { label: 'Hindu', value: 'hindu' }
  ]);




  const [openCommunity, setOpenCommunity] = useState(false);
  const [community, setCommunity] = useState(null);
  const [itemsCommunity, setItemsCommunity] = useState([
    { label: 'Sunni', value: 'sunni' },
    { label: 'Wahabi', value: 'wahabi' },
  ]);



  const [country, setCountry] = useState(null);





  const { email, phone, profileFor, gender, firstName, lastName, dob } = route.params;

  const submit = () => {
    if (religion === null) {
      showToast('error', 'Must select your religion')
    }
    else if (community === null) {
      showToast('error', 'Must select your community')
    }
    else if (country === null) {
      showToast('error', 'Must select your country')
    }

    else {
      navigation.navigate('profileVerification', { email: email, phone: phone, profileFor: profileFor, gender: gender, firstName: firstName, lastName: lastName, dob: dob, religion: religion, community: community, country: country })
    }
  }




  return (
    <View style={style.container}>
      <ScrollView >
        <Image
          style={style.halfCircle}
          source={require('../../components/Images/half.png')}
        />
        <BackBtn onPress={() => navigation.goBack()} style={style.backBtn} />

        <View style={{ paddingHorizontal: 10 }}>

          <Image
            style={style.avatarStyle}
            source={require('../../components/Images/relationIcon.png')}
          />
          <Text style={style.headerTxt}>Your religion</Text>
          <DropDownPicker
            open={openReligion}
            value={religion}
            items={itemsReligion}
            setOpen={setOpenReligion}
            setValue={setReligion}
            setItems={setItemsReligion}
            containerStyle={{zIndex:99999999,marginBottom:40}}
            dropDownContainerStyle={styles.dropDownContainerStyle}
          />
          <Text style={style.headerTxt}>Your Community</Text>
          <DropDownPicker
            open={openCommunity}
            value={community}
            items={itemsCommunity}
            setOpen={setOpenCommunity}
            setValue={setCommunity}
            setItems={setItemsCommunity}
            containerStyle={{zIndex:99999999,marginBottom:40}}
            dropDownContainerStyle={styles.dropDownContainerStyle}
          />
          <Text style={style.headerTxt}>Living in</Text>
          <TextInput
            onChangeText={(value) => setCountry(value)}
            placeholderTextColor='gray'
            placeholder='Country'
            style={{
              height: 40,
              margin: 12,
              width: responsiveWidth(90),
              alignSelf: 'center',
              borderBottomWidth: 1,
              padding: 0,
              borderColor: Color.secondary,
              opacity: 0.6,
              fontSize: responsiveFontSize(1.7),
              fontWeight: '500', color:'black'
            }}
          />

          <MainBtn
            style={{
              backgroundColor: Color.primary,
              marginTop: responsiveHeight(5),
            }}
            title={'Continue'}
            onPress={submit}
          />

        </View>
      </ScrollView>
      <Image style={{ width: 60, height: 60, bottom: -1, alignSelf: 'flex-end' }} source={require('../../components/Images/halfCircle.png')} />
    </View>
  );
};

export default UserReligion;



// styles.js
const styles = {
  headerTxt: {
    // Your styles for the header text
    // For example:
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    // Add any other styles you want for the header text
  },
  dropDownPickerContainer: {
    // Your styles for the DropDownPicker container
    // For example:
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'white',
    borderRadius: 5,
    marginBottom: 40,
    // Add any other styles you want for the DropDownPicker container
  },
  dropDownContainerStyle: {
    // Your styles to position the dropdown items on top
    position: 'absolute',
    top: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#fff',
    zIndex: 1, // Use zIndex to ensure the dropdown is above other elements
    // Add any other styles you want for the dropdown container
  },
};

