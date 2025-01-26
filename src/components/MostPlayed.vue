<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTracksStore } from '@/stores/tracks'; // Import the Pinia store

interface MostPlayedTrack {
  name: string;
  artists: string;
  play_count: number;
  image: string; // Add the image field
  link: string; // Add the link field
}

const mostPlayed = ref<MostPlayedTrack | null>(null);
const error = ref<string | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const tracksStore = useTracksStore();
    await tracksStore.fetchMostPlayedOrSkipped(7, 1, 1); // Fetch top 1 most played track
    mostPlayed.value = tracksStore.mostSkippedTracks[0] || null;
  } catch (err: any) {
    error.value = err.message || 'Error loading stats';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="most-skipped">
    <h2>🔥 Most Played Track (Last 7 Days)</h2>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div v-if="mostPlayed" class="track">
        <!-- Display the album image -->
        <div class="image">
          <a :href="mostPlayed.link" target="_blank" rel="noopener">
            <img :src="mostPlayed.image " :alt="`Album cover for ${mostPlayed.name}`" /></a>
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
.most-skipped {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-width: 400px;
  margin: 2rem auto;
}

h2 {
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.track {
  text-align: center;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.artist {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.play-count {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  display: inline-block;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
  display: block;
  line-height: 1;
}

.label {
  font-size: 0.9rem;
  color: #95a5a6;
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
  padding: 2rem;
}

.error {
  color: #e74c3c;
  padding: 1rem;
  background: #fee;
  border-radius: 8px;
  text-align: center;
}

.image img {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
}
</style>
