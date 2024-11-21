<template>
    <div>
      <Bar v-if="chartData && chartData.labels && chartData.datasets" :data="chartData" :options="chartOptions" />
      <p v-else>Cargando datos de la gráfica...</p>
    </div>
  </template>
  
  <script>
  import { Bar } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    components: { Bar },
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
  
  <style scoped> </style>