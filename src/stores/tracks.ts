import { defineStore } from 'pinia';
import api from '@/services/api';
import type { Track } from '@/types/types';

export const useTracksStore = defineStore('tracks', {
  state: () => ({
    mostPlayedTracks: [] as Track[],
    mostSkippedTracks: [] as Track[],
    isLoading: false,
    error: null as string | null,
    timeRange: 7, // Default time range
  }),
  actions: {
    async fetchMostPlayedOrSkipped(days: number, playedFullSong: number, limit: number) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await api.getMostPlayedOrSkipped(days, playedFullSong, limit);
        if (playedFullSong === 1) {
          this.mostPlayedTracks = data;
        } else {
          this.mostSkippedTracks = data;
        }
      } catch (err) {
        this.error = 'Failed to fetch data';
      } finally {
        this.isLoading = false;
      }
    },
    setTimeRange(days: number) {
      this.timeRange = days;
    },
  },

});
