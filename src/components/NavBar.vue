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
import { ref, watch } from 'vue';
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
}

// Watch for changes in timeRange and fetch data accordingly
watch(timeRange, async (newRange) => {
  await tracksStore.fetchMostPlayedOrSkipped(newRange, 30);
});

setTimeRange(timeRange.value);
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
}

button.active {
  background-color: var(--color-background); /* Green background for active button */
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3); /* Green shadow for active button */
  position: relative;
  z-index: 1; /* Ensure the glow is above other elements */
}

/* Glow effect for active button */
button.active::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 10px; /* Slightly larger than the button's border-radius */
  background: radial-gradient(
    circle,
    rgba(76, 175, 80, 0.4) 0%,
    rgba(76, 175, 80, 0.2) 50%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: -1; /* Place the glow behind the button */
}

/* Glow effect on hover */
button.active:hover::after {
  opacity: 1; /* Show glow on hover */
  transform: scale(1.1); /* Slightly enlarge the glow */
}

/* Add a subtle pulse animation for the glow */
@keyframes glow-pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

button.active:hover::after {
  animation: glow-pulse 1.5s infinite ease-in-out; /* Continuous pulse effect */
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
