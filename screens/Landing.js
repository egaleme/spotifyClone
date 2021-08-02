import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import Colors from '../constants/colors';
import Font from '../constants/fonts';
import blackLogo from '../assets/images/spotify-logo-black.png';
import fbIcon from '../assets/icons/fb_icon.png';
import googleIcon from '../assets/icons/google_icon.png';

export default function Landing(props) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#f1f1f1', 'gray', 'black']}
      locations={[0.0002, 0.001, 0.35]}
      start={{x: 0.799, y: -0.27, z: 0.1}}
      style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={blackLogo} style={styles.icon} />
      <Text style={styles.title}>Millions of songs.</Text>
      <Text style={styles.title}>Free on Spotify.</Text>
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: Colors.Green, marginTop: 60}]}>
        <Text style={[styles.btnText, {color: '#000'}]}>Sign up free</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          {borderWidth: 0.5, borderColor: '#fff', flexDirection: 'row'},
        ]}>
        <Ionicons
          name="phone-portrait-outline"
          size={20}
          color="#fff"
          style={{marginRight: wp('7%')}}
        />
        <Text style={styles.btnText}>Continue with phone number</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          {borderWidth: 0.5, borderColor: '#fff', flexDirection: 'row'},
        ]}>
        <Image
          source={googleIcon}
          style={{width: 20, height: 20, marginRight: wp('7%')}}
        />
        <Text style={styles.btnText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          {borderWidth: 0.5, borderColor: '#fff', flexDirection: 'row'},
        ]}>
        <Image
          source={fbIcon}
          style={{width: 20, height: 20, marginRight: wp('7%')}}
        />
        <Text style={styles.btnText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.push('Login')}
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text style={styles.btnText}>Log in</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
    marginTop: hp('20%'),
  },
  title: {
    fontFamily: Font.Gotham,
    fontSize: 33,
    color: '#ffffff',
    paddingVertical: 3,
    fontWeight: '700',
    lineHeight: 36,
  },
  btn: {
    padding: 20,
    width: '80%',
    borderRadius: 35,
    marginTop: 8,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontFamily: Font.Gotham,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
