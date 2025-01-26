<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTracksStore } from '@/stores/tracks';

interface MostPlayedTrack {
  name: string;
  artists: string;
  play_count: number;
  image: string;
  link: string;
}

const mostPlayed = ref<MostPlayedTrack | null>(null);
const error = ref<string | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const tracksStore = useTracksStore();
    await tracksStore.fetchMostPlayedOrSkipped(7, 1, 1); // Fetch top 1 most played track
    mostPlayed.value = tracksStore.mostPlayedTracks[0] || null;
  } catch (err: any) {
    error.value = err.message || 'Error loading stats';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="most-played">
    <h2>🔥 Most Played Track (Last 7 Days)</h2>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div v-if="mostPlayed" class="track">
        <div class="image">
          <a :href="mostPlayed.link" target="_blank" rel="noopener">
            <img :src="mostPlayed.image" :alt="`Album cover for ${mostPlayed.name}`" />
          </a>
        </div>

        <h3>{{ mostPlayed.name }}</h3>
        <p class="artist">{{ mostPlayed.artists }}</p>
        <div class="play-count">
          <span class="count">{{ mostPlayed.play_count }}</span>
          <span class="label">full plays this week</span>
        </div>
      </div>

      <div v-else class="empty-state">
        🎧 No tracks played in the last 7 days
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>
