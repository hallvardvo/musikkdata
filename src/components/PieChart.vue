<template>
  <div class="pie-chart-container">
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend, type ChartConfiguration } from 'chart.js';
import { useTracksStore } from '@/stores/tracks'

Chart.register(PieController, ArcElement, Tooltip, Legend);

const tracksStore = useTracksStore();
const mostSkippedTracks = computed(() => tracksStore.mostSkippedTracks);
const mostPlayedTracks = computed(() => tracksStore.mostPlayedTracks);
const isLoading = computed(() => tracksStore.isLoading);
const error = computed(() => tracksStore.error);

const totalSkippedPlayCount = computed(() => {
  return mostSkippedTracks.value.reduce((sum, track) => sum + track.play_count, 0);
});
const totalPlayedPlayCount = computed(() => {
  return mostPlayedTracks.value.reduce((sum, track) => sum + track.play_count, 0);
});

const pieChart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const createChart = () => {
  if (!pieChart.value) return;

  const data = {
    labels: ['Skipped', 'Fully Played'],
    datasets: [{
      label: 'Play Counts',
      data: [totalSkippedPlayCount.value, totalPlayedPlayCount.value],
      backgroundColor: [
        'rgba(169, 169, 169, 0.6)',  // Darker Light Gray
        'rgba(69, 160, 73, 0.6)' // Green (#45a049)
      ],
      hoverOffset: 4,
      borderColor: 'rgba(255, 255, 255, 0.6)',
      }]
  };

  const config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: data
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(pieChart.value, config);
};

const updateChartData = () => {
  if (!chartInstance) return;

  chartInstance.data.datasets[0].data = [totalSkippedPlayCount.value, totalPlayedPlayCount.value];
  chartInstance.update();
};

onMounted(() => {
  if (!isLoading.value) {
    createChart();
  } else {
    const unwatch = watch(isLoading, (loading) => {
      if (!loading) {
        createChart();
        unwatch();
      }
    });
  }
});

watch([totalPlayedPlayCount, totalSkippedPlayCount], () => {
  updateChartData();
});
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  max-width: 300px;
  margin: 35px auto;
  border-color: none;
}
</style>
