import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import PlayIcon from 'react-native-vector-icons/FontAwesome';
import LikeIcon from 'react-native-vector-icons/Feather';

import {GrayDark} from '../constants/colors';
import {useAlbumStore} from '../stores/useAlbumStore';

export default ({onPress, onPressPlay}) => {
  const selectedTrack = useAlbumStore(state => state.selectedTrack);
  const isPlaying = useAlbumStore(state => state.isPlaying);

  //   console.log(selectedTrack.name);
  //   console.log(selectedTrack.artist);
  //selectedTrack.image
  return (
    <View
      style={[
        styles.container,
        {opacity: Object.keys(selectedTrack).length > 1 ? 1 : 0},
      ]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '70%',
          }}>
          {selectedTrack.image ? (
            <Image
              source={{uri: selectedTrack.image}}
              style={{width: 55, height: 55}}
            />
          ) : null}
          <View style={{marginLeft: 10}}>
            <Text style={{color: '#fff', fontSize: 12}}>
              {selectedTrack.name}
            </Text>
            <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 11}}>
              {selectedTrack.artist}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <LikeIcon
          name="heart"
          size={22}
          color="#fff"
          style={{marginRight: 20}}
        />
        <TouchableWithoutFeedback onPress={onPressPlay}>
          <PlayIcon
            name={isPlaying ? 'pause' : 'play'}
            size={22}
            color="#fff"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#272829',
    backgroundColor: GrayDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    height: 55,
  },
  text: {
    color: 'white',
  },
});
