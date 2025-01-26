import { defineStore } from 'pinia';
import api from '@/services/api';

interface Track {
  name: string;
  artists: string;
  play_count: number;
}

export const useTracksStore = defineStore('tracks', {
  state: () => ({
    mostSkippedTracks: [] as Track[],
    mostSkippedTracks: [] as Track[],
  }),
  actions: {
    async fetchMostPlayedOrSkipped(days: number, playedFullSong: number, limit: number) {
      this.mostSkippedTracks = await api.getMostPlayedOrSkipped(days, playedFullSong, limit);
    },
  },
});
