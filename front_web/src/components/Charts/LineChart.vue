<template>
  <div>
    <Line v-if="chartData && chartData.labels && chartData.datasets" :data="chartData" :options="chartOptions" />
    <p v-else>Cargando datos de la gráfica...</p>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => ({
        labels: [],
        datasets: [],
      }),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
      return {
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      };
    },
  };
  </script>
  
  <style scoped></style>