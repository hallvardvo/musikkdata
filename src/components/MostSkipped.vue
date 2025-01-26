<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTracksStore } from '@/stores/tracks';

interface MostSkippedTrack {
  name: string;
  artists: string;
  play_count: number;
  image: string;
  link: string;
}

const mostSkipped = ref<MostSkippedTrack | null>(null);
const error = ref<string | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const tracksStore = useTracksStore();
    await tracksStore.fetchMostPlayedOrSkipped(7, 0, 1); // Fetch top 1 most skipped track
    mostSkipped.value = tracksStore.mostSkippedTracks[0] || null;
  } catch (err: any) {
    error.value = err.message || 'Error loading stats';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="most-skipped">
    <h2>💀 Most Skipped Track (Last 7 Days)</h2>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div v-if="mostSkipped" class="track">
        <div class="image">
          <a :href="mostSkipped.link" target="_blank" rel="noopener">
            <img :src="mostSkipped.image" :alt="`Album cover for ${mostSkipped.name}`" />
          </a>
        </div>

        <h3>{{ mostSkipped.name }}</h3>
        <p class="artist">{{ mostSkipped.artists }}</p>
        <div class="play-count">
          <span class="count">{{ mostSkipped.play_count }}</span>
          <span class="label">skips this week</span>
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
