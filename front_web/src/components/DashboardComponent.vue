<template>
  <div class="dashboard-content">
    <div v-if="totalIngresos || totalGastos">
      <div class="charts">
        <div v-if="expensesData && expensesData.datasets[0].data.length" class="chart-card">
          <h4 class="chart-title">Total Gastos</h4>
          <PieChart :chart-data="expensesData" :options="chartOptions" />
        </div>
        <div v-if="receiptsData && receiptsData.datasets[0].data.length" class="chart-card">
          <h4 class="chart-title">Total Ingresos</h4>
          <PieChart :chart-data="receiptsData" :options="chartOptions" />
        </div>
        <div v-if="profitData && profitData.datasets[0].data.length" class="chart-card">
          <h4 class="chart-title">Utilidades</h4>
          <PieChart :chart-data="profitData" :options="chartOptions" />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="no-data">No hay datos para mostrar en las gráficas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PieChart from "./PieChart.vue";
import {
  getReceiptsByUser,
  getExpensesByUser,
  calcularYGuardarTotalIngresos,
  calcularYGuardarTotalGastos,
} from "@/services/AuthService.js";

const totalIngresos = ref(null);
const totalGastos = ref(null);
const receiptsData = ref(null);
const expensesData = ref(null);
const profitData = ref(null);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Distribución",
    },
  },
};

// Función para generar colores aleatorios
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function fetchData() {
  try {
    const userID = localStorage.getItem("userID");
    if (!userID) throw new Error("UserID no encontrado en localStorage");

    // Obtener y procesar ingresos
    totalIngresos.value = await calcularYGuardarTotalIngresos(userID);
    const receipts = await getReceiptsByUser(userID);
    receiptsData.value = {
      labels: receipts.map((r) => r.descripcion),
      datasets: [
        {
          label: "Ingresos",
          backgroundColor: receipts.map(() => getRandomColor()), // Colores únicos para cada valor
          data: receipts.map((r) => parseFloat(r.monto)),
        },
      ],
    };

    // Obtener y procesar gastos
    totalGastos.value = await calcularYGuardarTotalGastos(userID);
    const expenses = await getExpensesByUser(userID);
    expensesData.value = {
      labels: expenses.map((e) => e.descripcion),
      datasets: [
        {
          label: "Gastos",
          backgroundColor: expenses.map(() => getRandomColor()), // Colores únicos para cada valor
          data: expenses.map((e) => parseFloat(e.monto)),
        },
      ],
    };

    // Calcular la utilidad
    profitData.value = {
      labels: ["Ingresos", "Gastos", "Utilidades"],
      datasets: [
        {
          label: "Distribución",
          backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"], // Colores específicos para las categorías de utilidades
          data: [
            totalIngresos.value,
            totalGastos.value,
            totalIngresos.value - totalGastos.value,
          ],
        },
      ],
    };
  } catch (error) {
    console.error("Error al obtener datos para las gráficas:", error);
  }
}

onMounted(fetchData);
</script>

<style scoped>
.dashboard-content {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.charts {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.chart-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.chart-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  color: #e74c3c;
  font-weight: bold;
}
</style>
