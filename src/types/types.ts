export interface Track {
  id: string;
  name: string;
  artists: string;
  image?: string;
  link?: string;
  song_duration: number;
  play_count: number;
  positions: number[];
  timestamps: string[];
  played_full_songs: number[];
}


