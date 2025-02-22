<script setup lang="ts">
import MostPlayed from '@/components/MostPlayed.vue'
import NavBar from '@/components/NavBar.vue';
import MostSkipped from '@/components/MostSkipped.vue';
import MinutesPlayed from '@/components/MinutesPlayed.vue';
import PieChart from '@/components/PieChart.vue';
</script>

<template>
  <div class="home-container">
    <main>
      <NavBar />
      <div class="home-wrapper">
        <MostPlayed />
        <MostSkipped />
        <div class="stats">
          <PieChart />
          <MinutesPlayed />
        </div>
      </div>
  </main>
  </div>
</template>
<style>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
}

/* Header */
header {
  background-color: var(--color-background);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Main content */
main {
  flex: 1;
  padding: 1rem;
  width: 100%;
}

/* Content wrapper */
.home-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal columns */
  gap: 1rem; /* Space between grid items */
  padding: 1rem; /* Optional: Add padding to the wrapper */
}

.grid-item {
  background-color: var(--color-background-mute); /* Example background color */
  padding: 1rem; /* Padding inside each grid item */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
  text-align: center; /* Center text */
}

.stats {
  display: flex;
  flex-direction: column;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-wrapper {
    grid-template-columns: 1fr; /* Single column on small screens */
  }
}
</style>
