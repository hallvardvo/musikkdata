<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface MostPlayedTrack {
  name: string;
  artists: string;
  play_count: number;
}

const mostPlayed = ref<MostPlayedTrack | null>(null);
const error = ref<string | null>(null);
const isLoading = ref(true);

// ⚠️ UNSECURE QUERY IN FRONTEND - REMOVE LATER ⚠️
const MOST_PLAYED_QUERY = `
  SELECT
    t.name,
    t.artists,
    COUNT(lh.track_id) AS play_count
  FROM tracks t
  JOIN listening_history lh ON t.id = lh.track_id
  WHERE
    lh.timestamp >= datetime('now', '-7 days')
    AND lh.played_full_song = 1
  GROUP BY t.id
  ORDER BY play_count DESC
  LIMIT 1
`;

onMounted(async () => {
  try {
    const response = await fetch('https://tunnelen.pagekite.me/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: MOST_PLAYED_QUERY
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch stats');

    const data = await response.json();
    mostPlayed.value = data[0] || null;

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
.most-played {
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
</style>
