import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backBtn: {
    marginLeft: responsiveWidth(5),
    bottom: responsiveHeight(8),
  },
  avatar: {
    width: responsiveWidth(90),
    bottom: responsiveHeight(5),
    alignSelf: 'center',
  },
  avatarStyle: {
    width: 90,
    height: 90,
    alignSelf: 'center',
  },
  halfCircle: {
    width: 90,
    height: 90,
  },
  headerTxt: {
    fontSize: responsiveFontSize(3),
    color: Color.secondary,
    fontWeight: '700',
    marginTop: 30,
  },
  headerSubTxt: {
    textAlign: 'center',
    marginTop: 20,
    color: Color.secondary,
    fontWeight: '600',
    fontSize: responsiveFontSize(1.7),
    lineHeight: 20,
  },
  subHeaderTxt: {
    color: 'gray',
    fontSize: responsiveFontSize(2),
  },
  SecondheaderTxt: {
    fontSize: responsiveFontSize(3.7),
    color: Color.secondary,
    fontWeight: '800',
    marginTop: 10,
  },
});

export default style;
