import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api_url from '../../../ApiUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const Status = ({ route }) => {
  const navigation = useNavigation();
  const { reelId } = route.params;

  const [reelUser, setReelUser] = useState([]);
  const [content, setContent] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [playingVideosCount, setPlayingVideosCount] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const videoRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      functionGetReel();
    }, [])
  );

  const functionGetReel = async () => {
    try {
      const userId = JSON.parse(await AsyncStorage.getItem('mainuserId'));
      const response = await axios.get(`${api_url}/reel/get/${reelId}`);
      if (response.data.status === 'ok') {
        const mappedContent = response.data?.data?.map((item) => ({
          id: item?.id,
          uri: item?.image,
          type: 'Video',
          finish: 0,
        }));
        setContent(mappedContent);
        setReelUser(mappedContent);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching reel:', error);
      setLoading(false);
    }
  };

  const start = () => {
    setLoading(false)
    console.log('start started');
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setLoading(true)
        next();
      }
    });
  };





  const next = () => {
    if (current !== content.length - 1) {
      
      setCurrent((prevCurrent) => prevCurrent + 1);
      setLoading(false)
    } else {
      close();
    }
  };

  const previous = () => {
    if (current - 1 >= 0) {
      setCurrent((prevCurrent) => prevCurrent - 1);
    } else {
      close();
    }
  };

  const close = () => {
    progress.setValue(0);
    navigation.goBack();
  };


 

  const onLoadEnd = () => {
    if (current === content.length + 1) {
      setIsBuffering(false);
    } else {
      start();
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      next();
    }

    if (status.isPlaying) {
      setIsBuffering(false);
      setIsVideoPlaying(true);
      setPlayingVideosCount((prevCount) => prevCount + 1);
    } else {
      setIsVideoPlaying(false);
      setPlayingVideosCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      {!loading && content.length > 0 && (
        <>
          <Video
            ref={videoRef}
            source={{ uri: content[current]?.uri }}
            resizeMode="stretch" // Use "stretch" to fill the frame without maintaining aspect ratio
            onLoad={onLoadEnd}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            // paused={!isVideoPlaying}
            style={{ width, height, resizeMode: 'cover' }}
          />
          {/* {isBuffering && playingVideosCount < 2 && (
            <View style={{ position: 'absolute', top: '50%', left: '45%' }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )} */}
        </>
      )}

      <View style={{ width, position: 'absolute', top: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
        {content.map((item, index) => (
          <View key={item.id} style={{ height: 3, backgroundColor: 'gray', flex: 1, marginLeft: 5, flexDirection: 'row' }}>
            <Animated.View style={{ flex: current === index ? progress : content[index].finish, height: 3, backgroundColor: 'rgba(255, 255, 255, 1)' }} />
          </View>
        ))}
      </View>

      <View style={{ width, height, position: 'absolute', top: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ width: '30%', height: '100%' }} onPress={previous} />
        <TouchableOpacity style={{ width: '30%', height: '100%' }} onPress={next} />
      </View>
    </View>
  );
};

export default Status;
