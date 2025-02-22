import axios from 'axios';
import type { Track } from '@/types/types.ts';

const API_BASE_URL = 'https://tunnelen.pagekite.me'; // Your Flask backend URL


export default {
  async getMostPlayedOrSkipped(
    days: number, // No default value
    played_full_song: number, // No default value
    limit: number // No default value
  ): Promise<Track[]> {
    const response = await axios.get<Track[]>(`${API_BASE_URL}/most_played_or_skipped`, {
      params: { days, played_full_song, limit },
    });
    return response.data;
  },
  async getAllTracks(
    days: number, // No default value
    limit: number // No default value
  ): Promise<Track[]> {
    const response = await axios.get<Track[]>(`${API_BASE_URL}/all_tracks`, {
      params: { days, limit },
    });
    return response.data;
  }
};
