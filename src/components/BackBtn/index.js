import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions';


const BackBtn = ({onPress, style}) => {
  const handleBtn = () =>{
    console.log(onPress);
  }
  return (
    <View onPress={onPress} style={[ {flexDirection:'row', justifyContent:'space-between', width:responsiveWidth(90)} , style]}>
      <TouchableOpacity onPress={onPress}>
      <Image style={{width:23, height:18}} source={require('../../components/Images/back.png')}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}><Text style={{color:'black', fontWeight:500}}>Back</Text></TouchableOpacity>
    </View>
  )
}

export default BackBtn