PieChart.vue
<template>
  <div>
    <Pie v-if="chartData && chartData.labels && chartData.datasets" :data="chartData" :options="chartOptions" />
    <p v-else>Cargando datos de la gráfica...</p>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  components: { Pie },
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => ({
        labels: [],
        datasets: [{ data: [] }],
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
            display: true,
            position: "top",
          },
        },
      },
    };
  },
};
</script>

<style scoped></style>