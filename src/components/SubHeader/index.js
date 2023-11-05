import { View, Text, Image } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const SubHeader = () => {
  return (
    <View>
      <Image style={{width:70, height:35, marginLeft:20}} source={require('../../components/Images/subLogo.png')}/>
      <View style={{width:responsiveWidth(100), height:1, backgroundColor:'black', opacity:0.4, marginTop:10}}></View>
    </View>
  )
}

export default SubHeader