import {authorize, refresh} from 'react-native-app-auth';

import {clientId, clientSecret} from '../config';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUrl: 'com.spotifyclone://oauthredirect',
      // redirectUrl: 'com.spotifyclone',
      scopes: [
        'playlist-read',
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'streaming',
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'user-modify-playback-state',
        'user-read-playback-position',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      //alert(JSON.stringify(result));
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;
