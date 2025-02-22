import { defineStore } from 'pinia';
import api from '@/services/api';
import type { Track } from '@/types/types';

export const useTracksStore = defineStore('tracks', {
  state: () => ({
    mostPlayedTracks: [] as Track[],
    mostSkippedTracks: [] as Track[],
    allTracks: [] as Track[],
    isLoading: false,
    error: null as string | null,
    timeRange: 7, // Default time range
    currentTrack: null as Track | null
  }),
  actions: {
    async fetchMostPlayedOrSkipped(days: number, limit: number) {
      console.log(`Fetching most played or skipped tracks for ${days} days with limit ${limit}`);
      this.isLoading = true;
      this.error = null;
      try {
        const playedData = await api.getMostPlayedOrSkipped(days, 1, limit);
        const skippedData = await api.getMostPlayedOrSkipped(days, 0, limit);
        const allData = await api.getAllTracks(days, 9999);
        this.mostPlayedTracks = playedData;
        this.mostSkippedTracks = skippedData;
        this.allTracks = allData;
        console.log('Data fetched successfully', { playedData, skippedData, allData });
      } catch (err) {
        this.error = 'Failed to fetch data';
        console.error('Error fetching data:', err);
      } finally {
        this.isLoading = false;
      }
    },
    setTimeRange(days: number) {
      this.timeRange = days;
    },
    setCurrentTrack(track: Track) {
      this.currentTrack = track;
    }
  },
  getters: {
    getTrackById: (state) => (id: string) => {
      return state.allTracks.find(track => track.id === id);
    },
    getTrackByIdFromMergedTracks: (state) => (id: string) => {
      return state.mostPlayedTracks.find(track => track.id === id) || state.mostSkippedTracks.find(track => track.id === id);
    }
  }
});
