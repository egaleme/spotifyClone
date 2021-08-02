import create from 'zustand';

import {api} from '../service/api';

export const useAlbumStore = create((set, get) => ({
  now: false,
  isPlaying: false,
  topTracks: [],
  recentlyPlayed: [],
  newReleases: [],
  isLoading: false,
  miniPlayerOpacity: 0,
  selectedTrack: {},
  albumTracks: [],
  toggleIsPlaying: () => {
    set(state => ({
      isPlaying: !state.isPlaying,
    }));
  },
  getSelectedTrack: body => {
    // todo
    set({selectedTrack: body});
  },
  playCurrentTrack: () => {
    set(state => ({
      now: !state.now,
    }));
  },
  getNewReleases: async () => {
    set({isLoading: true});
    try {
      const res = await api.getNewReleases();
      set({newReleases: res.data.albums.items, isLoading: false});
    } catch (error) {
      console.log(error);
    }
  },
  getTopTracks: async () => {
    set({isLoading: true});
    try {
      const res = await api.getTopTracks();
      set({topTracks: res.data.items, isLoading: false});
    } catch (error) {
      console.log(error);
    }
  },
  getRecentlyPlayed: async () => {
    set({isLoading: true});
    try {
      const res = await api.getRecentlyPlayed();
      set({recentlyPlayed: res.data.items, isLoading: false});
    } catch (error) {
      console.log(error);
    }
  },
  getAlbumTracks: async id => {
    set({isLoading: true});
    try {
      const res = await api.getAlbumTracks(id);
      set({albumTracks: res.data.items, isLoading: false});
    } catch (error) {
      console.log(error);
    }
  },
}));
