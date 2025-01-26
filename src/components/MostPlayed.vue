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
.most-skipped {
  font-family: Arial, sans-serif;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.most-skipped h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.error {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1rem;
}

.track {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.track h3 {
  font-size: 1.25rem;
  color: #444;
}

.artist {
  font-size: 1rem;
  color: #888;
  margin-top: -0.5rem;
}

.play-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.play-count .count {
  font-size: 2rem;
  font-weight: bold;
  color: #2ecc71;
}

.play-count .label {
  font-size: 0.875rem;
  color: #666;
}

.empty-state {
  font-size: 1rem;
  color: #aaa;
}

@media (max-width: 480px) {
  .most-skipped {
    padding: 1rem;
  }

  .image img {
    width: 120px;
    height: 120px;
  }

  .track h3 {
    font-size: 1rem;
  }

  .play-count .count {
    font-size: 1.5rem;
  }
}
</style>
