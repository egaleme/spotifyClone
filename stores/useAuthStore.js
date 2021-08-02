import create from 'zustand';

import {SAVE_ACCESS_TOKEN, SAVE_REFRESH_TOKEN} from '../utils/storage';
import {setAuthToken} from '../service/api';

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  refreshToken: null,
  loading: false,
  authenication: async (result, navigation) => {
    set({loading: true});
    if (result.accessToken != null && result.refreshToken != null) {
      set({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        loading: false,
      });
      setAuthToken(result.accessToken);
      await SAVE_ACCESS_TOKEN(result.accessToken);
      await SAVE_REFRESH_TOKEN(result.refreshToken);
      // navigate to main app
      navigation.replace('AppNavigator');
    }
    set({
      loading: false,
    });
  },
  setLoading: () => {
    set({loading: true});
  },
}));
