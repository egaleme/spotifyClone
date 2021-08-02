import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MiniPlayer from '../components/MiniPlayer';

import {useAlbumStore} from '../stores/useAlbumStore';
import {GrayDark, Green} from '../constants/colors';
import {Gotham} from '../constants/fonts';

const {width, height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function TrackDetail(props) {
  const getAlbumTracks = useAlbumStore(state => state.getAlbumTracks);
  const selectedTrack = useAlbumStore(state => state.selectedTrack);
  const isLoading = useAlbumStore(state => state.isLoading);
  const toggleIsPlaying = useAlbumStore(
    React.useCallback(state => state.toggleIsPlaying, []),
  );
  const albumTracks = useAlbumStore(state => state.albumTracks);
  const playCurrentTrack = useAlbumStore(state => state.playCurrentTrack);
  const now = useAlbumStore(state => state.now);

  const y = React.useRef(new Animated.Value(0)).current;
  const scrollY = Animated.add(
    y,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const menuOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    getAlbumTracks(selectedTrack.albumId);
  }, []);

  function _getArtist(item) {
    return item.artists.reduce(function (prevVal, currVal, idx) {
      return idx == 0 ? currVal.name : prevVal + ', ' + currVal.name;
    }, '');
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: GrayDark,
        }}>
        <ActivityIndicator animating color={Green} size={30} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['transparent', '#0b3057', '#051c30']}
        style={StyleSheet.absoluteFill}
      />
      <Animated.ScrollView
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: y}}}], {
          useNativeDriver: true,
        })}
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}>
        <View style={styles.scrollViewContent}>
          <Text
            style={{
              color: '#fff',
              fontFamily: Gotham,
              fontSize: hp('3.5%'),
              alignSelf: 'center',
            }}>
            {selectedTrack.name}
          </Text>
          {albumTracks &&
            albumTracks.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: Gotham,
                      fontSize: 15,
                      fontWeight: '700',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      fontFamily: Gotham,
                      fontSize: 13,
                    }}>
                    {_getArtist(item)}
                  </Text>
                </View>
                <Feather name="more-horizontal" color="#fff" size={25} />
              </View>
            ))}
        </View>
      </Animated.ScrollView>

      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}
          source={{uri: selectedTrack.image}}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.bar,
          {
            backgroundColor:
              menuOpacity === 0 ? 'transparent' : 'rgba(0,0,0,0.25)',
          },
          {
            opacity: menuOpacity,
          },
        ]}>
        <TouchableOpacity style={styles.navIcon}>
          <Icon
            name="chevron-back"
            size={25}
            color="#fff"
            //style={{alignSelf: 'flex-start'}}
          />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.title,
            // {
            //   opacity: menuOpacity,
            // },
          ]}>
          <Text
            style={{
              color: '#fff',
              fontSize: hp('3.0%'),
              fontFamily: Gotham,
              fontWeight: '700',
            }}>
            {selectedTrack.name}
          </Text>
        </Animated.View>
      </Animated.View>

      <MiniPlayer onPress={playCurrentTrack} onPressPlay={toggleIsPlaying} />

      <Modal animationType="slide" transparent={true} visible={now}>
        <StatusBar translucent backgroundColor="#0b3057" />
        <LinearGradient
          colors={['#0b3057', '#051c30']}
          style={StyleSheet.absoluteFill}
        />
        <View style={modalStyles.container}>
          <View style={modalStyles.header}>
            <TouchableOpacity onPress={playCurrentTrack}>
              <Icon name="chevron-down-sharp" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={modalStyles.headerTitle}>{selectedTrack.artist}</Text>
            <TouchableOpacity>
              <Feather name="more-horizontal" color="#fff" size={25} />
            </TouchableOpacity>
          </View>
          <Image
            source={{uri: selectedTrack.image}}
            style={modalStyles.headerImage}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View>
              <Text style={modalStyles.trackText}>{selectedTrack.name}</Text>
              <Text style={modalStyles.artistName}>{selectedTrack.artist}</Text>
            </View>
            <Feather name="heart" size={22} color="#fff" />
          </View>
          <View style={modalStyles.slider} />
          <View style={modalStyles.controls}>
            <Feather
              name="shuffle"
              color="rgba(255, 255, 255, 0.5)"
              size={24}
            />
            <AntDesign name="stepbackward" color="white" size={32} />
            <AntDesign name="play" color="white" size={48} />
            <AntDesign name="stepforward" color="white" size={32} />
            <Feather name="repeat" color="rgba(255, 255, 255, 0.5)" size={24} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    //borderBottomRightRadius: 50
  },
  backgroundImage: {
    height: wp('55%'),
    //resizeMode: 'cover',
    width: wp('55%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
    borderRadius: 4,
  },
  bar: {
    //backgroundColor: 'transparent',
    marginTop: hp('5%'),
    height: wp('15%'),
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  navIcon: {
    //alignSelf: 'flex-start',
    marginLeft: 10,
    //marginTop: 25,
  },
  title: {
    paddingLeft: wp('30%'),
  },

  scrollViewContent: {
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    marginHorizontal: 20,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    marginHorizontal: wp('10%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp('5%'),
  },
  headerTitle: {
    color: '#fff',
    fontFamily: Gotham,
    fontSize: 13,
    fontWeight: '700',
  },
  headerImage: {
    borderRadius: 4,
    alignSelf: 'center',
    width: wp('55%'),
    height: wp('60%'),
    marginBottom: hp('10%'),
  },
  trackText: {
    color: '#fff',
    fontFamily: Gotham,
    fontSize: hp('2.5%'),
    fontWeight: '700',
  },
  artistName: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: Gotham,
    fontSize: hp('1.5%'),
  },
  slider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: wp('85%'),
    borderRadius: 2,
    height: 4,
    marginVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
