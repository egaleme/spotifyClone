import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
const Stack = createStackNavigator();

export default function Routes(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={AuthNavigator} name="AuthNavigator" />
        <Stack.Screen component={AppNavigator} name="AppNavigator" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
