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
    fontSize:responsiveFontSize(2.3),
    color:Color.secondary,
    fontWeight:'700',
    marginTop:15
  },
  subHeaderTxt: {
    color:'gray',
    fontSize:responsiveFontSize(2),
    textAlign:'left'
  },
  SecondheaderTxt: {
    fontSize:responsiveFontSize(3.7),
    color:Color.secondary,
    fontWeight:'800',
    marginTop:10
  },
  
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
  cell: {
    width: 50,
    height: 70,
    lineHeight: 65,
    borderColor: Color.primary,
    borderBottomWidth:2,
    textAlign: 'center',
    color: Color.primary,
    overflow: 'hidden',
    fontSize: responsiveFontSize(4),
  },
  focusCell: {
    backgroundColor: 'white',
  },
})

export default style


