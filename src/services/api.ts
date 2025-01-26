import axios from 'axios';

const API_BASE_URL = 'https://tunnelen.pagekite.me'; // Your Flask backend URL

interface Track {
  id: string;
  name: string;
  artists: string;
  image: string;
  link: string;
  play_count: number;
}

export default {
  async getMostPlayedOrSkipped(
    days: number, // No default value
    playedFullSong: number, // No default value
    limit: number // No default value
  ): Promise<Track[]> {
    const response = await axios.get<Track[]>(`${API_BASE_URL}/most_played_or_skipped`, {
      params: { days, played_full_song: playedFullSong, limit },
    });
    return response.data;
  },

  async getAllTracks(): Promise<Track[]> {
    const response = await axios.get<Track[]>(`${API_BASE_URL}/all_tracks`);
    return response.data;
  },
};
