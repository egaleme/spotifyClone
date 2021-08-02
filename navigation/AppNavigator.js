import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeIcon from 'react-native-vector-icons/Foundation';
import SearchIcon from 'react-native-vector-icons/Feather';
import LibraryIcon from 'react-native-vector-icons/Ionicons';

import RecentlyPlayed from '../screens/Home';
import TrackDetail from '../screens/TrackDetail';
import Search from '../screens/Search';
import Library from '../screens/Library';

import {GrayShade, GrayDark} from '../constants/colors';
import {Gotham} from '../constants/fonts';

import {useAlbumStore} from '../stores/useAlbumStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={RecentlyPlayed} name="Played" />
      <Stack.Screen component={TrackDetail} name="TrackDetail" />
    </Stack.Navigator>
  );
};

const App = () => {
  const now = useAlbumStore(state => state.now);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarVisible: now === false,
      }}
      tabBarOptions={{
        // keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: GrayShade,
        style: {
          backgroundColor: GrayDark,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: 'black',
          // paddingTop: 6,
        },
        labelStyle: {
          //paddingBottom: 17,
          fontFamily: Gotham,
          fontSize: 15,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color, size}) => (
            <SearchIcon name="search" color={color} size={27} />
          ),
        }}
      />
      <Tab.Screen
        name="Your Library"
        component={Library}
        options={{
          tabBarIcon: ({color, size}) => (
            <LibraryIcon name="library" color={color} size={27} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
