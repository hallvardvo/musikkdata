<script setup lang="ts">
import { computed } from 'vue';
import { useTracksStore } from '@/stores/tracks';

const tracksStore = useTracksStore();

// Retrieve the most skipped tracks from the store
const mostSkippedTracks = computed(() => tracksStore.mostSkippedTracks);

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
  <div class="most-skipped">
    <h2>Most Skipped Tracks</h2>

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div v-if="mostSkippedTracks.length > 0">
        <!-- Display all tracks as a list -->
        <ul class="track-list">
          <li v-for="(track, index) in mostSkippedTracks" :key="index" class="track-item">
            <router-link :to="{ name: 'stats', params: { trackId: String(track.id) } }" class="track-link">
              <img :src="track.image" :alt="`Album cover for ${track.name}`" class="track-image" />
              <div class="track-info">
                <h4>{{ truncateName(track.name) }}</h4>
                <p class="artist">{{ getFirstArtist(track.artists) }}</p>
              </div>
              <div class="play-count">
                <span class="count">{{ track.play_count }}</span>
                <span class="label">skips</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <div v-else class="empty-state">
        🎧 No tracks skipped in the last {{ tracksStore.timeRange }} days
      </div>
    </template>
  </div>
</template>

<style scoped>
.most-skipped {
  background-color: var(--medium-gray);
  padding: 1rem; /* Reduced padding */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--white);
  width: 100%; /* Ensure it takes full width of its parent */
  max-width: 600px; /* Narrower max-width */
  margin: 0 auto; /* Center the container */
  overflow: hidden; /* Prevent overflow */
}

.most-skipped h2 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: 1rem; /* Reduced margin */
  text-align: center;
}

.loading {
  font-size: 1rem;
  color: var(--light-gray);
  text-align: center;
}

.error {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
}

.track-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%; /* Ensure the list takes full width */
}

.track-item {
  display: flex;
  align-items: center;
  gap: 1rem; /* Reduced gap */
  padding: 0.75rem;
  background-color: var(--dark-gray);
  border-radius: 8px;
  margin-bottom: 0.75rem; /* Reduced margin */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%; /* Ensure it doesn't overflow */
  box-sizing: border-box; /* Include padding and border in the element's total width */
}

.track-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.track-item .track-link {
  display: flex;
  align-items: center;
  gap: 1rem; /* Reduced gap */
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.track-item .track-image {
  width: 50px; /* Reduced image size */
  height: 50px; /* Reduced image size */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.track-item .track-info {
  flex: 1;
  min-width: 0; /* Prevent flex items from overflowing */
}

.track-item .track-info h4 {
  font-size: 0.9rem; /* Reduced font size */
  margin: 0;
  color: var(--white);
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
}

.track-item .track-info .artist {
  font-size: 0.75rem; /* Reduced font size */
  color: var(--light-gray);
  margin: 0.25rem 0 0;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
}

.track-item .play-count {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align play count to the left */
  margin-left: 0.5rem; /* Reduced spacing */
  flex-shrink: 0; /* Prevent shrinking */
}

.track-item .play-count .count {
  font-size: 1rem; /* Reduced font size */
  font-weight: bold;
  color: var(--light-gray);
}

.track-item .play-count .label {
  font-size: 0.75rem; /* Reduced font size */
  color: var(--light-gray);
}

.empty-state {
  font-size: 1rem;
  color: var(--light-gray);
  text-align: center;
  padding: 1rem;
}

@media (max-width: 768px) {
  .most-skipped {
    padding: 0.75rem; /* Reduced padding for mobile */
  }

  .track-item {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem; /* Reduced gap for mobile */
  }

  .track-item .track-link {
    flex-direction: column;
    gap: 0.75rem; /* Reduced gap for mobile */
  }

  .track-item .track-image {
    width: 60px; /* Adjusted image size for mobile */
    height: 60px; /* Adjusted image size for mobile */
  }
}
</style>
