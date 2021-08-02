import axios from 'axios';

const BaseURL = 'https://api.spotify.com/v1';

const instance = axios.create({
  baseURL: BaseURL,
  timeout: 120000,
});

export function setAuthToken(token) {
  instance.defaults.headers.common['Authorization'] = '';
  delete instance.defaults.headers.common['Authorization'];

  if (token) {
    //console.log('LOGIN TOKEN :', JSON.stringify(token));
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export const api = {
  getNewReleases: () =>
    instance({
      method: 'GET',
      url: `/browse/new-releases?country=NG`,
      //data: body,
    }),
  getTopTracks: () =>
    instance({
      method: 'GET',
      url: `/me/top/tracks`,
      //data: body,
    }),
  getRecentlyPlayed: () =>
    instance({
      method: 'GET',
      url: `/me/player/recently-played`,
      //data: body,
    }),
  getAlbumTracks: id =>
    instance({
      method: 'GET',
      url: `/albums/${id}/tracks`,
      //data: body,
    }),
};
