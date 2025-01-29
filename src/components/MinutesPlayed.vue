<template>
  <div class="minutes-played-container">
    <div class="minutes-played">
      <h3>Total Minutes Played</h3>
      <p>{{ totalMinutesPlayed }} minutes</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTracksStore } from '@/stores/tracks';

const tracksStore = useTracksStore();
const mostPlayedTracks = computed(() => tracksStore.mostPlayedTracks);

// Computed property to calculate the total minutes played
const totalMinutesPlayed = computed(() => {
  return Math.round(mostPlayedTracks.value.reduce((sum, track) => sum + track.play_count * track.song_duration, 0) / 60);
});
</script>

<style scoped>
.minutes-played-container {
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  padding: 20px;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.minutes-played h3 {
  font-size: 1.25rem;
  color: var(--color-text-light);
  margin-bottom: 10px;
}

.minutes-played p {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-light);
}
</style>
