<template>
  <div class="pie-chart-container">
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

// Props for the component
const props = defineProps({
  played: {
    type: Number,
    required: true,
  },
  skipped: {
    type: Number,
    required: true,
  },
});

const pieChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (pieChart.value) {
    const ctx = pieChart.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Played Fully', 'Skipped'],
          datasets: [
            {
              data: [props.played, props.skipped],
              backgroundColor: ['#4caf50', '#e74c3c'], // Green for played, red for skipped
              borderColor: ['#fff', '#fff'], // White borders
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#fff', // White text for legend
              },
            },
            tooltip: {
              enabled: true,
              bodyColor: '#fff', // White text for tooltips
            },
          },
        },
      });
    }
  }
});
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  max-width: 300px; /* Adjust as needed */
  margin: 0 auto;
}
</style>
