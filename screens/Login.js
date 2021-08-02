import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Input} from '../components';
import Font from '../constants/fonts';
import {Green, GrayDark} from '../constants/colors';
import authHandler from '../service/authHandler';
import {useAuthStore} from '../stores/useAuthStore';

export default function Login(props) {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [textInpuBk, setTextInputBk] = React.useState(true);
  const [passInpuBk, setPassInputBk] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const authenication = useAuthStore(state => state.authenication);
  const loading = useAuthStore(state => state.loading);
  const setLoading = useAuthStore(state => state.setLoading);

  const oauthLogin = React.useCallback(() => {
    setLoading();
    authHandler.onLogin().then(result => authenication(result, navigation));
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: GrayDark,
        }}>
        <ActivityIndicator animating color={Green} size={30} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f1f1f1', 'gray', 'black']}
        locations={[0.0002, 0.001, 0.35]}
        start={{x: 0.799, y: -0.27, z: 0.1}}
        style={StyleSheet.absoluteFillObject}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.formGroup}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{padding: 10, marginBottom: hp('5%')}}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.input}>Email or username</Text>
          <Input
            container={{backgroundColor: textInpuBk ? '#3d3d3d' : '#7e7e7e'}}
            input={{backgroundColor: textInpuBk ? '#3d3d3d' : '#7e7e7e'}}
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => setTextInputBk(!textInpuBk)}
            onBlur={() => setTextInputBk(!textInpuBk)}
            keyboardType="email-address"
          />
          <Text style={styles.input}>Password</Text>
          <Input
            container={{backgroundColor: passInpuBk ? '#3d3d3d' : '#7e7e7e'}}
            input={{backgroundColor: passInpuBk ? '#3d3d3d' : '#7e7e7e'}}
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => setPassInputBk(!passInpuBk)}
            onBlur={() => setPassInputBk(!passInpuBk)}
            icon={true}
            toggle={() => setSecureTextEntry(!secureTextEntry)}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity style={styles.btn}>
            <Text>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={oauthLogin} style={styles.btn2}>
            <Text style={styles.btnText2}>Log in without password</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formGroup: {
    marginTop: hp('5%'),
    marginHorizontal: wp('2%'),
  },
  input: {
    color: '#fff',
    fontSize: hp('4.5%'),
    paddingLeft: wp('3%'),
    fontFamily: Font.Gotham,
    fontWeight: '700',
  },
  btn: {
    padding: 18,
    width: wp('31%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d3d3d',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: hp('6%'),
  },
  btn2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 11,
    marginHorizontal: hp('10%'),
    borderRadius: 6,
    borderWidth: 0.1,
    borderColor: 'gray',
    marginTop: hp('5%'),
  },
  btnText2: {
    color: '#fff',
    fontFamily: Font.Gotham,
    fontSize: 12,
    letterSpacing: 2,
  },
});
