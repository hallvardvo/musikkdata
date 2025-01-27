<script setup lang="ts">
import MostPlayed from './components/MostPlayed.vue'
import MostSkipped from './components/MostSkipped.vue'
import NavBar from './components/NavBar.vue'
import PieChart from './components/PieChart.vue';
</script>

<template>
  <div class="app-container">
    <main>
      <NavBar />
      <div class="content-wrapper">
        <MostPlayed />
        <MostSkipped />
      </div>
    </main>
  </div>
</template>

<style>
/* App container */
.app-container {
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
.content-wrapper {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 1200px; /* Optional: Limit max width for very large screens */
  margin: 0 auto; /* Center the content */
  padding: 0 1rem; /* Add padding to the sides */
}

/* Responsive layout */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column; /* Stack components vertically on small screens */
  }
}
</style>
