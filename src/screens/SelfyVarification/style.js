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
  backBtn: {
    marginLeft:responsiveWidth(5),
    bottom:responsiveHeight(8)
  },
  avatar: {
    width:responsiveWidth(90),
    bottom:responsiveHeight(5),
    alignSelf:'center',
  },
  avatarStyle: {
    width:160,
    height:75,
    alignSelf:'center'
  },
  halfCircle: {
    width:90,
    height:90
  },
  headerTxt: {
    fontSize:responsiveFontSize(3.3),
    color:Color.secondary,
    marginTop:15,
    marginLeft:20
  },
  SelfieVerification: {
    width:responsiveWidth(85),
    height:responsiveHeight(52),
    backgroundColor:'#F5F5F5',
    alignSelf:'center',
    marginTop:responsiveHeight(5),
    borderRadius:5
  },
  subHeaderTxt: {
    fontSize:responsiveFontSize(1.4),
    color:Color.secondary,
    marginLeft:20,
    marginTop:5
  },
  selfie: {
    width:'87%',
    height:270,
    alignSelf:'center',
    marginTop:20,
    borderRadius:15
  }
})

export default style


