import { defineStore } from 'pinia';
import api from '@/services/api';

interface Track {
  name: string;
  artists: string;
  play_count: number;
  image: string; // Add this field
  link: string; // Add this field
}

export const useTracksStore = defineStore('tracks', {
  state: () => ({
    mostPlayedTracks: [] as Track[],
    mostSkippedTracks: [] as Track[],
  }),
  actions: {
    async fetchMostPlayedOrSkipped(days: number, playedFullSong: number, limit: number) {
      const data = await api.getMostPlayedOrSkipped(days, playedFullSong, limit);
      if (playedFullSong === 1) {
        this.mostPlayedTracks = data; // Update most played tracks
      } else {
        this.mostSkippedTracks = data; // Update most skipped tracks
      }
    },
  },
});
