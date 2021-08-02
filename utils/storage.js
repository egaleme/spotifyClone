import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVE_ACCESS_TOKEN = value => {
  AsyncStorage.setItem('@accesstoken', value);
};

export const GET_ACCESS_TOKEN = async () => {
  const value = await AsyncStorage.getItem('@accesstoken');
  return value || '';
};

export const DELETE_ACCESS_TOKEN = () => {
  AsyncStorage.removeItem('@accesstoken');
};

export const SAVE_REFRESH_TOKEN = value => {
  AsyncStorage.setItem('@refreshtoken', value);
};

export const GET_REFRESH_TOKEN = async () => {
  const value = await AsyncStorage.getItem('@refreshtoken');
  return value || '';
};

export const DELETE_REFRESH_TOKEN = () => {
  AsyncStorage.removeItem('@refreshtoken');
};
