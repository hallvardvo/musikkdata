<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { Chart, type ChartConfiguration, type ChartItem } from 'chart.js/auto';
import type { Track } from '@/types/types';
import { parseSkipTimes } from '@/utils/utils'; // Import the utility method

const props = defineProps<{
  track?: Track;
}>();

const lineChart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

// Define the type for the listens array
interface ListenData {
  x: number;
  y: number;
}

// Process the playback history data for the specific track
const processListenData = (): ListenData[] => {
  const listens: ListenData[] = [];

  if (props.track?.positions && props.track?.timestamps) {
    console.log('positions:', props.track.positions); // Debugging statement
    console.log('timestamps:', props.track.timestamps); // Debugging statement

    // Parse positions as an array of numbers using the utility method
    const positionsArray = parseSkipTimes(props.track.positions);

    if (Array.isArray(positionsArray)) {
      positionsArray.forEach((position, index) => {
        listens.push({
          x: index + 1, // Use the index as the x value
          y: position
        });
      });
    } else {
      console.error('positions is not an array:', props.track.positions);
    }
  }

  console.log('listens:', listens); // Debugging statement
  return listens;
};

const createChart = async () => {
  await nextTick();
  if (!lineChart.value) return;

  if (chartInstance) chartInstance.destroy();

  const dataPoints = processListenData();
  const hasData = dataPoints.length > 0;

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      datasets: [{
        label: hasData ? 'Listen Lengths' : 'No playback history',
        data: hasData ? dataPoints : [{ x: 0, y: 0 }],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
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
          type: 'linear', // Use linear scale for x-axis
          title: {
            display: true,
            text: 'Play Order'
          },
          ticks: {
            stepSize: 1 // Ensure ticks are in the correct order
          }
        },
        y: {
          beginAtZero: true,
          max: props.track?.song_duration || undefined, // Set the max value to the song duration
          title: {
            display: true,
            text: 'Listen Length (seconds)'
          },
          ticks: {
            stepSize: 10
          }
        }
      },
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          enabled: true
        }
      }
    },
    plugins: [{
      id: 'customLabel',
      afterDraw: (chart) => {
        if (props.track?.song_duration) {
          const ctx = chart.ctx;
          const yAxis = chart.scales.y;
          const xAxis = chart.scales.x;
          const yPos = yAxis.getPixelForValue(props.track.song_duration);
          ctx.save();
          ctx.font = '12px Arial';
          ctx.fillStyle = '#000';
          ctx.fillText(`Song Length:`, xAxis.left - 60, yPos-15);
          ctx.restore();
        }
      }
    }]
  };

  chartInstance = new Chart(lineChart.value as ChartItem, config);
};

watch(() => props.track, createChart, { immediate: true });
onMounted(createChart);
</script>

<template>
  <div class="listen-lengths">
    <h3 v-if="track?.name">Listen Length Analysis for {{ track.name }}</h3>
    <h3 v-else>Listen Length Analysis</h3>
    <div class="chart-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </div>
</template>

<style scoped>
.listen-lengths {
  background: var(--color-background-mute);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}

h3 {
  margin-bottom: 1.5rem;
  color: var(--color-heading);
  font-size: 1.5rem;
}
</style>
