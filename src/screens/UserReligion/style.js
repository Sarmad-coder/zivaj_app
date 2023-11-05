import {
 StyleSheet
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Color from '../../components/Color';
 
const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    height:'100%',
    // paddingHorizontal: 16,
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
    marginTop:5
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
  },
  dropdown: {
    margin: 12,
    height: 50,
    backgroundColor: 'white',
    borderColor:'#acabad',
    padding: 10,
    width:responsiveWidth(90),
    alignSelf:'center',
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 15,
    width:responsiveWidth(86),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#acabad'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default style


