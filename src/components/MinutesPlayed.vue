

<script setup lang="ts">
import { computed } from 'vue';
import { useTracksStore } from '@/stores/tracks';
import { parseSkipTimes } from '@/utils/utils'; // Import the utility method

const isLoading = computed(() => tracksStore.isLoading);

const tracksStore = useTracksStore();
const allTracks = computed(() => tracksStore.allTracks);

// Computed property to calculate the total minutes played
const totalMinutesPlayed = computed(() => {
  let totalPositions = 0;

  allTracks.value.forEach((track, index) => {
    console.log(`Track ${index + 1}:`, track); // Log the entire track object
    const positionsArray = parseSkipTimes(track.positions);
    console.log(`Parsed positions for Track ${index + 1}:`, positionsArray); // Log the parsed positions

    const sum = positionsArray.reduce((sum, currentValue) => sum + currentValue, 0);
    console.log(`Sum for Track ${index + 1}:`, sum); // Log the sum for this track

    totalPositions += sum / 60;
  });

  console.log('Total Positions Before Rounding:', totalPositions); // Log the total before rounding
  return Math.round(totalPositions);
});


</script>
<template>
  <div class="minutes-played-container">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else class="minutes-played">
      <h3>Total Minutes Played</h3>
      <p>{{ totalMinutesPlayed }} minutes</p>
    </div>
  </div>
</template>
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

.loading {
  font-size: 1rem;
  color: var(--light-gray);
}
</style>
