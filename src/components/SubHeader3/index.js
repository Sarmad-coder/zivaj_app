import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import Color from '../Color'

const SubHeader3 = ({press}) => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:responsiveWidth(95)}}>
      <Image style={{width:70, height:35, marginLeft:20}} source={require('../../components/Images/subLogo.png')}/>
      <View style={{width:'30%', height:35, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Image style={{width:15, height:15, tintColor:'gray', marginHorizontal:5}} source={require('../../components/Images/addPost.png')}/>
        <TouchableOpacity onPress={press}>
        <Text style={{fontSize:13, fontWeight:'700', color:Color.primary}}>Post a Reel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SubHeader3