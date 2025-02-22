<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { Chart, type ChartConfiguration, type ChartItem } from 'chart.js/auto';
import type { Track } from '@/types/types';

const props = defineProps<{
  track?: Track;
}>();

const lineChart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

// Assuming track has skipPoints (array of skip timestamps in seconds) and duration (in seconds)
const processSkipData = () => {
  const skipTimes = parseSkipTimes(props.track?.positions || []);
  const duration = props.track?.song_duration || Math.max(...skipTimes, 0);
  const interval = 10; // Seconds per bucket

  // Create buckets for 10-second intervals
  const bucketCount = Math.ceil(duration / interval);
  const buckets = new Array(bucketCount).fill(0);

  skipTimes.forEach(time => {
    const bucketIndex = Math.floor(time / interval);
    if (bucketIndex < bucketCount) buckets[bucketIndex]++;
  });

  return {
    labels: Array.from({ length: bucketCount }, (_, i) => i * interval),
    data: buckets,
    duration
  };
};

const parseSkipTimes = (input: any): number[] => {
  try {
    if (Array.isArray(input)) return input.map(Number).filter(t => !isNaN(t));
    if (typeof input === 'string') return input.split(',').map(Number);
    return [];
  } catch (error) {
    console.error('Error parsing skip times:', error);
    return [];
  }
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const createChart = async () => {
  await nextTick();
  if (!lineChart.value) return;

  if (chartInstance) chartInstance.destroy();

  const { labels, data, duration } = processSkipData();
  const hasData = data.some(count => count > 0);

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: hasData ? labels : ['No data'],
      datasets: [{
        label: hasData ? 'Skips per 10-second interval' : 'No skip data',
        data: hasData ? data : [0],
        borderColor: '#ff4444',
        backgroundColor: 'rgba(255, 68, 68, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Time in Song'
          },
          ticks: {
            callback: (value) => formatTime(Number(value)),
            stepSize: 60 // Show a tick every minute
          },
          max: duration
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Skips'
          },
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  };

  chartInstance = new Chart(lineChart.value as ChartItem, config);
};

watch(() => props.track, createChart, { immediate: true });
onMounted(createChart);
</script>

<template>
  <div class="positions-during-track">
    <h3 v-if="track?.name">Skip Positions for {{ track.name }}</h3>
    <h3 v-else>Track Skip Analysis</h3>
    <div class="chart-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </div>
</template>

<style>
/* Keep existing styles */
</style>
