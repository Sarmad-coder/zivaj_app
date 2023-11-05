import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../Color';

const MainBtn = props => {

// console.log(props.onPress);
  return (
    <TouchableOpacity
      style={[
        {
          width: responsiveWidth(90),
          backgroundColor: Color.primary,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding:6
        },
        props.style,
      ]}
      onPress={props.onPress}
      >
      <Text
        style={{
          color: 'white',
          fontSize: responsiveFontSize(3),
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default MainBtn;
