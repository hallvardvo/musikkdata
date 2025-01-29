<template>
  <nav class="nav-bar">
    <button
      v-for="option in timeRangeOptions"
      :key="option.value"
      @click="setTimeRange(option.value)"
      :class="{ active: timeRange === option.value }"
    >
      {{ option.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTracksStore } from '@/stores/tracks';

// Define the time range options
const timeRangeOptions = [
{ label: '1 Day', value: 1 },
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
  { label: '1 Year', value: 365 },
];

// Current selected time range
const timeRange = ref(7);

// Emit the selected time range to the parent component

const tracksStore = useTracksStore();

async function setTimeRange(days: number) {
  timeRange.value = days;
  tracksStore.setTimeRange(days); // Update the time range in the store
  await tracksStore.fetchMostPlayedOrSkipped(days, 1, 30); // Fetch data for the selected time range
  await tracksStore.fetchMostPlayedOrSkipped(days, 0, 30); // Fetch data for the selected time range
}
onMounted(() => {
  setTimeRange(timeRange.value);
});
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: var(--color-background-mute); /* Dark gray background */
  color: var(--color-text); /* White text */
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s,
    box-shadow 0.3s;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

button:hover {
  background-color: var(--color-background-soft); /* Slightly lighter gray on hover */
  transform: translateY(-2px); /* Lift button on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}ƒ

button.active {
  background-color: var(--color-background); /* Green background for active button */
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3); /* Green shadow for active button */
}

button.active:hover {
  background-color: #45a049; /* Slightly darker green on hover */
  transform: translateY(-2px); /* Lift active button on hover */
}

/* Add a subtle glow effect for active button */
button.active {
  position: relative;
  box-shadow: 0 4px 8px var(--color-glow-dark); /* Use shadow color variable */

}

button.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5); /* Green glow */
  opacity: 0;
  transition: opacity 0.3s;
}

button.active:hover::after {
  opacity: 1; /* Show glow on hover */
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-bar {
    flex-direction: column; /* Stack buttons vertically on small screens */
    gap: 0.5rem;
  }

  button {
    width: 100%; /* Full width buttons on small screens */
  }
}
</style>
