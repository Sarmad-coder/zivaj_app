import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SwiperCard = ({ text }) => {
  return (
    <View style={styles.card}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default SwiperCard;
