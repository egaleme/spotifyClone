import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

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

  React.useEffect(() => {
    getNewReleases();
    getRecentlyPlayed();
    getTopTracks();
    GET_ACCESS_TOKEN().then(token => console.log(token));
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
