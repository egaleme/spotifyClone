import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {GrayShade, GrayDark, Green} from '../constants/colors';
import {Gotham} from '../constants/fonts';

import MiniPlayer from '../components/MiniPlayer';
import {useAuthStore} from '../stores/useAuthStore';
import {useAlbumStore} from '../stores/useAlbumStore';
import {GET_ACCESS_TOKEN} from '../utils/storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function RecentlyPlayed() {
  const navigation = useNavigation();
  const getNewReleases = useAlbumStore(state => state.getNewReleases);
  const getRecentlyPlayed = useAlbumStore(state => state.getRecentlyPlayed);
  const getTopTracks = useAlbumStore(state => state.getTopTracks);
  const isLoading = useAlbumStore(state => state.isLoading);
  const newReleases = useAlbumStore(state => state.newReleases);
  const recentlyPlayed = useAlbumStore(state => state.recentlyPlayed);
  const topTracks = useAlbumStore(state => state.topTracks);
  const getSelectedTrack = useAlbumStore(state => state.getSelectedTrack);
  const toggleIsPlaying = useAlbumStore(
    React.useCallback(state => state.toggleIsPlaying, []),
  );
  const playCurrentTrack = useAlbumStore(state => state.playCurrentTrack);
  const selectedTrack = useAlbumStore(state => state.selectedTrack);
  const now = useAlbumStore(state => state.now);

  React.useEffect(() => {
    getNewReleases();
    getRecentlyPlayed();
    getTopTracks();
  }, []);

  function _postSelectedTrack(track) {
    getSelectedTrack(track);
    navigation.navigate('TrackDetail');
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

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            marginTop: hp('8%'),
            justifyContent: 'space-around',
          }}>
          <TouchableWithoutFeedback style={{marginRight: 15}}>
            <Entypo name="back-in-time" size={20} color="#fff" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{marginRight: 5}}>
            <Feather name="settings" size={20} color="#fff" />
          </TouchableWithoutFeedback>
        </View>
        <View style={{flex: 1, marginHorizontal: 10, marginTop: hp('4%')}}>
          <Text style={styles.headers}>Recently Played</Text>
          <ScrollView horizontal contentContainerStyle={{paddingTop: 10}}>
            {recentlyPlayed &&
              recentlyPlayed.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    _postSelectedTrack({
                      albumId: item.track.album.id,
                      image: item.track.album.images[0].url,
                      name: item.track.name,
                      artist: item.track.artists.reduce(function (
                        prevVal,
                        currVal,
                        idx,
                      ) {
                        return idx == 0
                          ? currVal.name
                          : prevVal + ', ' + currVal.name;
                      },
                      ''),
                    })
                  }
                  style={{
                    marginRight: wp('5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.track.album.images[0].url}}
                    style={styles.image}
                  />
                  {/* {item.track.artists.map(it => (
                    <View key={it.uri}>
                      <Text style={{color: 'white', fontSize: hp('1.9%')}}>
                        {it.name}
                      </Text>
                    </View>
                  ))} */}
                  <Text style={styles.trachName}>{item.track.name}</Text>
                </TouchableWithoutFeedback>
              ))}
          </ScrollView>
        </View>

        <View style={{flex: 1, marginHorizontal: 10, marginTop: hp('5%')}}>
          <Text style={styles.headers}>Top Tracks</Text>
          <ScrollView horizontal contentContainerStyle={{paddingTop: 10}}>
            {topTracks &&
              topTracks.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    _postSelectedTrack({
                      albumId: item.album.id,
                      image: item.album.images[0].url,
                      name: item.album.name,
                      artist: item.album.artists.reduce(function (
                        prevVal,
                        currVal,
                        idx,
                      ) {
                        return idx == 0
                          ? currVal.name
                          : prevVal + ', ' + currVal.name;
                      },
                      ''),
                    })
                  }
                  style={{
                    marginRight: wp('5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.album.images[0].url}}
                    style={styles.image}
                  />
                  {/* {item.album.artists.map(it => (
                    <View key={it.uri}>
                      <Text style={{color: 'white', fontSize: hp('1.9%')}}>
                        {it.name}
                      </Text>
                    </View>
                  ))} */}
                  <Text style={styles.trachName}>{item.album.name}</Text>
                </TouchableWithoutFeedback>
              ))}
          </ScrollView>
        </View>

        <View style={{flex: 1, marginHorizontal: 10, marginTop: hp('6%')}}>
          <Text style={styles.headers}>Popular new releases</Text>
          <ScrollView horizontal contentContainerStyle={{paddingTop: 10}}>
            {newReleases &&
              newReleases.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    _postSelectedTrack({
                      albumId: item.id,
                      image: item.images[0].url,
                      name: item.name,
                      artist: item.artists.reduce(function (
                        prevVal,
                        currVal,
                        idx,
                      ) {
                        return idx == 0
                          ? currVal.name
                          : prevVal + ', ' + currVal.name;
                      },
                      ''),
                    })
                  }
                  style={{
                    marginRight: wp('5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.images[0].url}}
                    style={styles.image}
                  />
                  {/* {item.artists.map(it => (
                    <View key={it.uri}>
                      <Text style={{color: 'white', fontSize: hp('1.9%')}}>
                        {it.name}
                      </Text>
                    </View>
                  ))} */}
                  <Text style={styles.trachName}>{item.name}</Text>
                </TouchableWithoutFeedback>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
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
    backgroundColor: 'black',
  },
  image: {
    width: wp('45%'),
    height: wp('45%'),
    borderRadius: 2,
  },
  headers: {
    color: 'white',
    fontSize: hp('3.5%'),
    fontFamily: Gotham,
    fontWeight: '700',
  },
  trachName: {
    color: 'white',
    fontSize: hp('1.9%'),
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
