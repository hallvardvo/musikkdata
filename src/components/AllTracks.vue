<script setup lang="ts">
import { ref, onMounted } from 'vue';

const tracks = ref<{ name: string; artists: string }[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        // Fetch all tracks from the Flask server
        const response = await fetch('https://tunnelen.pagekite.me/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    SELECT name, artists
                    FROM tracks
                `,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length > 0) {
            tracks.value = data;
        } else {
            error.value = 'No tracks found in the database.';
        }
    } catch (err: any) {
        error.value = err.message || 'Error fetching data from the server.';
    }
});
</script>

<template>
  <div>
    <p v-if="error" class="error">{{ error }}</p>
    <ul v-else>
      <li v-for="(track, index) in tracks" :key="index">
        <strong>{{ track.name }}</strong> by {{ track.artists }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
