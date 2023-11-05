import {
  StyleSheet
 } from 'react-native';
 import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
 import Color from '../../components/Color';
  
 const style = StyleSheet.create({
   container: {
     flex:1,
     backgroundColor:'white'
   },
   halfCircle: {
     width:90,
     height:90
   },
   subContainer: {
    width:responsiveWidth(90),
    alignSelf:'center',
    bottom:responsiveHeight(7)
   },
   headerTxt: {
    fontSize: responsiveFontSize(3),
    fontWeight:'bold',
    color:Color.secondary,

   },
   headerSubTxt: {
    fontSize: responsiveFontSize(1.5),
    color:Color.secondary,
    opacity:0.6
    
   },
   ImageSection: {
    width:responsiveWidth(90),
    height:responsiveHeight(33),
    marginTop:10,
    flexDirection:'row'
   }

 

 })
 
 export default style
 
 
 