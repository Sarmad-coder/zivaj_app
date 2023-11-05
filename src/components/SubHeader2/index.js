import { View, Text, Image } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const SubHeader2 = () => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:responsiveWidth(95)}}>
      <Image style={{width:70, height:35, marginLeft:20}} source={require('../../components/Images/subLogo.png')}/>
      {/* <Image style={{width:27, height:22, tintColor:'#7A7C81'}} source={require('../../components/Images/search.png')}/> */}
    </View>
  )
}

export default SubHeader2