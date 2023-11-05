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
    width:90,
    height:90,
    alignSelf:'center'
  },
  halfCircle: {
    width:90,
    height:90
  },
  headerTxt: {
    fontSize:responsiveFontSize(3.5),
    color:Color.secondary,
    fontWeight:'700',
    marginTop:10
  },
  subHeaderTxt: {
    color:'gray',
    fontSize:responsiveFontSize(2)
  },
  SecondheaderTxt: {
    fontSize:responsiveFontSize(3.7),
    color:Color.secondary,
    fontWeight:'800',
    marginTop:10
  }
})

export default style