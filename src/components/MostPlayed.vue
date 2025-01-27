<script setup lang="ts">
import { computed } from 'vue';
import { useTracksStore } from '@/stores/tracks';

const tracksStore = useTracksStore();

// Retrieve the most played tracks from the store
const mostPlayedTracks = computed(() => tracksStore.mostPlayedTracks);

// Retrieve the first track (or null if no tracks are available)
const mostPlayed = computed(() => mostPlayedTracks.value[0] || null);

// Retrieve loading and error states from the store
const isLoading = computed(() => tracksStore.isLoading);
const error = computed(() => tracksStore.error);
</script>

<template>
  <div class="most-played">
    <h2>🔥 Most Played Track (Last {{ tracksStore.timeRange }} Days)</h2>

    <div v-if="isLoading" class="loading">Loading...</div>

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
        🎧 No tracks played in the last {{ tracksStore.timeRange }} days
      </div>
    </template>
  </div>
</template>

<style scoped>
.most-played {
  background-color: var(--medium-gray);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  color: var(--white);
}

.most-played h2 {
  font-size: 1.5rem;
  color: var(--primary-green);
  margin-bottom: 1rem;
}

.loading {
  font-size: 1rem;
  color: var(--light-gray);
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
  color: var(--white);
}

.artist {
  font-size: 1rem;
  color: var(--light-gray);
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
  color: var(--primary-green);
}

.play-count .label {
  font-size: 0.875rem;
  color: var(--light-gray);
}

.empty-state {
  font-size: 1rem;
  color: var(--light-gray);
}

@media (max-width: 480px) {
  .most-played {
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
