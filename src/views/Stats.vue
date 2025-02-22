<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useTracksStore } from '@/stores/tracks'
import PositionsDuringTrack from '@/components/PositionsDuringTrack.vue'
import PositionsOfAllPlays from '@/components/PositionsOfAllPlays.vue'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const tracksStore = useTracksStore()

const track = computed(() => {
  return tracksStore.getTrackById(route.params.trackId as string)
})
</script>

<template>
  <div class="home-container">
    <main>
      <NavBar />
      <section class="page-container">
    <router-link to="/" class="back-button">
      ← Back
    </router-link>

  <div class="stats-container">
    <div v-if="track" class="track-container">
      <!-- Track Card -->
      <div class="track-card">
        <img
          :src="track.image"
          class="track-card__image"
          :alt="`Album cover for ${track.name}`"
        />
        <div class="track-card__content">
          <h3 class="track-card__title">{{ track.name }}</h3>
          <p class="track-card__artist">{{ track.artists }} </p>
          <p class="track-card__skips"> {{ track.play_count }} skips</p>
        </div>
      </div>

      <!-- Components -->
      <PositionsDuringTrack :key="track.id" :track="track" />
      <PositionsOfAllPlays :key="track.id" :track="track" />
    </div>

    <div v-else class="error-state">
      <h2 class="error-state__title">Track not found</h2>
      <p class="error-state__message">No track found with ID: {{ route.params.trackId }}</p>
    </div>
  </div>
  </section>
    </main>
  </div>

</template>

<style scoped>
/* Base styles */
.stats-container {
  background-color: var(--medium-gray);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  margin: 1rem auto;
  color: var(--white);
  font-family: 'Inter', system-ui, sans-serif;
}

.track-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--dark-gray);
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.track-card__image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.track-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.track-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.track-card__skips {
  margin: 0;
  padding: 4px;
  font-weight: 500;
}

.track-card__artist {
  padding: 4px;
}

/* Error State */
.error-state {
  padding: 2rem;
  text-align: center;
  background-color: var(--dark-gray);
  border-radius: 12px;
}

.error-state__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}

.error-state__message {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-container {
    padding: 1.5rem;
  }

  .track-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
    padding: 1rem;
  }

  .track-card__image {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }

  .error-state {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    padding: 1rem;
    border-radius: 8px;
  }

  .track-card__title {
    font-size: 1.1rem;
  }

  .track-card__artist {
    font-size: 0.85rem;
  }

  .error-state__title {
    font-size: 1.25rem;
  }
}
.page-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;

}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  padding: 0.75rem 1.25rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white);
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateX(-4px);
}
</style>
