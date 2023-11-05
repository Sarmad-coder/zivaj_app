import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { ActivityIndicator } from 'react-native';


const MyLoader = ({top}) => {

    return (
        <><View style={{ flex: 1, width: '100%', height: responsiveHeight(100), backgroundColor: 'gray', opacity: 0.4, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 9999999999999999999999999999 }}>
        </View>
            <View style={{ position: 'absolute', top: top, left: '37%', backgroundColor: 'red', padding: 10, borderRadius: 10, elevation: 5, zIndex: 9999999999999999999999999999 }}>
                <ActivityIndicator size="large" color="white" />
                <Text style={{ fontSize: 15, color: 'white' }}>Loading...</Text>
            </View>
        </>
    )
}

export default MyLoader