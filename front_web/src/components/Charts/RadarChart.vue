<template>
    <div>
      <Radar v-if="chartData && chartData.labels && chartData.datasets" :data="chartData" :options="chartOptions" />
      <p v-else>Cargando datos...</p>
    </div>
  </template>
  
  <script>
  import { Radar } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);
  
  export default {
    components: { Radar },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },
  };
  </script>
  
  <style scoped></style>