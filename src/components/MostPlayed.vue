<script setup lang="ts">
import { computed } from 'vue';
import { useTracksStore } from '@/stores/tracks';

const tracksStore = useTracksStore();

// Retrieve the most played tracks from the store
const mostPlayedTracks = computed(() => tracksStore.mostPlayedTracks);

// Retrieve loading and error states from the store
const isLoading = computed(() => tracksStore.isLoading);
const error = computed(() => tracksStore.error);

const truncateName = (name: string, maxLength = 15) => {
  return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
};
const getFirstArtist = (artists: string): string => {
  return artists.split(',')[0].trim();
};
</script>

<template>
  <div class="most-played">
    <h2>Most Fully Played Tracks</h2>

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div v-if="mostPlayedTracks.length > 0">
        <!-- Display the first track as a card -->
        <div class="track-card">
          <div class="image">
            <a :href="mostPlayedTracks[0].link" target="_blank" rel="noopener">
              <img :src="mostPlayedTracks[0].image" :alt="`Album cover for ${mostPlayedTracks[0].name}`" />
            </a>
          </div>
          <h3>{{ mostPlayedTracks[0].name }}</h3>
          <p class="artist">{{ mostPlayedTracks[0].artists }}</p>
          <div class="play-count">
            <span class="count">{{ mostPlayedTracks[0].play_count }}</span>
            <span class="label">plays</span>
          </div>
        </div>

        <!-- Display the remaining tracks as a list -->
        <ul class="track-list">
          <li v-for="(track, index) in mostPlayedTracks.slice(1)" :key="index" class="track-item">
            <a :href="track.link" target="_blank" rel="noopener">
              <img :src="track.image" :alt="`Album cover for ${track.name}`" class="track-image" />
            </a>
            <h4>{{ truncateName(track.name) }}</h4>
            <p class="artist">{{ getFirstArtist(track.artists) }}</p>
          </li>
        </ul>
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
  color: var(--white);
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

.track-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.track-card .image img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.track-card h3 {
  font-size: 1.25rem;
  color: var(--white);
}

.track-card .artist {
  font-size: 1rem;
  color: var(--light-gray);
  margin-top: -0.5rem;
}

.track-card .play-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.track-card .play-count .count {
  font-size: 2rem;
  font-weight: bold;
  color: var(--light-gray);
}

.track-card .play-count .label {
  font-size: 0.875rem;
  color: var(--light-gray);
}

.track-list {
  list-style: none;
  padding: 0;
}

.track-item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.track-item a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.track-item .track-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.track-item .track-info {
  display: flex;
  flex-direction: column;
}

.track-item .track-info h4 {
  font-size: 1rem;
  margin: 0;
}

.track-item .track-info .artist {
  font-size: 0.875rem;
  color: var(--light-gray);
}

.track-item .track-info .play-count {
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

  .track-card .image img {
    width: 120px;
    height: 120px;
  }

  .track-card h3 {
    font-size: 1rem;
  }

  .track-card .play-count .count {
    font-size: 1.5rem;
  }

  .track-item .track-image {
    width: 40px;
    height: 40px;
  }

  .track-item .track-info h4 {
    font-size: 0.875rem;
  }

  .track-item .track-info .artist,
  .track-item .track-info .play-count {
    font-size: 0.75rem;
  }
}
</style>
