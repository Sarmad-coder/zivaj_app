import { View, Text, Image, TextInput, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useState } from 'react';
import style from './style';
import BackBtn from '../../components/BackBtn';
// import DatePicker from 'react-native-date-picker'
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
import MainBtn from '../../components/MainBtn';
import { Icon } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
// import DateTimePickerModal from "react-native-modal-datetime-picker";


const UserDateBirth = ({ route, navigation }) => {

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  const [date, setDate] = useState(new Date());
  const [myage, setMyage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);



  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  console.log(date, 'my date')
  console.log(myage, 'my date')

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {

      const today = new Date();
      const birthDate = new Date(selectedDate);

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setMyage(age);
      setDate(selectedDate);


    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };


  const [firstName, setfirstName] = useState(null)
  const [lastName, setlastName] = useState(null)
  const [newEmail, setNewEmail] = useState(null)
  const [newPhone, setNewPhone] = useState(null)




  const { email, phone, profileFor, gender } = route.params;


  const submit = () => {
    if (firstName === null) {
      showToast('error', 'Must enter first name')
    }
    else if (lastName === null) {
      showToast('error', 'Must enter last name')
    }
    else if (myage === null) {
      showToast('error', 'Must enter your age')
    }

    else {
      navigation.navigate('userReligion', { email: email.length===0?newEmail:email, phone: phone.length===0?'+92'+newPhone:phone, profileFor: profileFor, gender: gender, firstName: firstName, lastName: lastName, dob: myage })
    }
  }


  return (
    <View style={style.container}>
      <ScrollView>
        <Image
          style={style.halfCircle}
          source={require('../../components/Images/half.png')}
        />
        <BackBtn onPress={() => navigation.goBack()} style={style.backBtn} />
        <View style={style.avatar}>
          <Image
            style={style.avatarStyle}
            source={require('../../components/Images/profileIcon.png')}
          />
          <Text style={style.headerTxt}>Your Info</Text>
          <TextInput
            onChangeText={(value) => setfirstName(value)}
            placeholder='First name'
            placeholderTextColor='gray'
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
              fontWeight: '500',color:'black'
            }}
          />
          <TextInput
            placeholder='Last name'
            placeholderTextColor='gray'
            onChangeText={(value) => setlastName(value)}
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
              fontWeight: '500',color:'black'
            }}
          />
          {email.length===0?<TextInput
            placeholder='Email'
            placeholderTextColor='gray'
            onChangeText={(value) => setNewEmail(value)}
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
              fontWeight: '500',color:'black'
            }}
          />:null}

          {phone.length===0?
          <>
          <Text style={{color:'black',fontSize:13}}>Mobile no.</Text>
          <PhoneInput
            defaultValue={newPhone}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setNewPhone(text);
            }}
            containerStyle={{
              backgroundColor: 'transparent',
              width: responsiveWidth(90),
              borderBottomWidth:1,
              borderBottomColor:'black',

            }}
            textContainerStyle={{
              backgroundColor: 'transparent',
              right: 15,
              backgroundColor: 'transparent',
            }}
            textInputStyle={{
              color: 'gray',
              backgroundColor: 'transparent',
              
            }}
            codeTextStyle={{
              color: 'gray',
              
            }}
          />
          </>
          :null}

          <Text style={style.headerTxt}>Date of birth</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity onPress={showDatepicker} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, width: '50%' }}>

              <Image source={require('../../components/Images/cal.png')} style={{ width: 30, height: 30 }} />
              <Text style={{ color: 'black' }}>{date.length > 0 ? new Date(date) : 'Select Date'}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

{/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
          </View>
          {myage?<Text style={{fontSize:14,color:'black'}}>Your age is: {myage}</Text>:null}
          <MainBtn
            style={{
              backgroundColor: Color.primary,
              marginTop: responsiveHeight(23),
            }}
            title={'Continue'}
            onPress={submit}
          />

        </View>
      </ScrollView>
        <Image style={{ width: 60, height: 60, bottom: -1, position: 'absolute', alignSelf: 'flex-end' }} source={require('../../components/Images/halfCircle.png')} />
    </View>
  );
};

export default UserDateBirth;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  datePicker: {
    width: 200,
    marginBottom: 16,
  },
});