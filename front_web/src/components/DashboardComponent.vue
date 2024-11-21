<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
    
    </div>
    <div class="totals-bar">
      <div class="total-card">
        <h4>Total Ingresos</h4>
        <p>{{ formatCurrency(totalIngresos) }}</p>
      </div>
      <div class="total-card">
        <h4>Total Gastos</h4>
        <p>{{ formatCurrency(totalGastos) }}</p>
      </div>
      <div class="total-card">
        <h4>Total Utilidades</h4>
        <p>{{ formatCurrency(totalUtilidades) }}</p>
      </div>
    </div>

    <!-- Contenedor principal con desplazamiento único -->
    <div class="dashboard-charts">
      <!-- Primera sección de gráficas -->
      <div class="charts-row">
        <div class="chart-card" v-if="receiptsData">
          <h4>Distribución de Ingresos</h4>
          <PieChart :chart-data="receiptsData" :options="chartOptions" />
        </div>
        <div class="chart-card" v-if="expensesData">
          <h4>Distribución de Gastos</h4>
          <PieChart :chart-data="expensesData" :options="chartOptions" />
        </div>
        <div class="chart-card" v-if="profitData">
          <h4>Distribución de Utilidades</h4>
          <PieChart :chart-data="profitData" :options="chartOptions" />
        </div>
      </div>

      <!-- Segunda sección de gráficas -->
      <div class="charts-row">
        <div class="chart-card" v-if="receiptsData && expensesData">
          <h4>Comparación Mensual</h4>
          <BarChart :chart-data="barData" :options="chartOptions" />
        </div>
        <div class="chart-card" v-if="receiptsData && expensesData">
          <h4>Patrón de Ingresos y Gastos</h4>
          <RadarChart :chart-data="radarData" :options="chartOptions" />
        </div>
        <div class="chart-card" v-if="receiptsData && expensesData">
          <h4>Tendencia Financiera</h4>
          <LineChart :chart-data="lineData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PieChart from "./Charts/PieChart.vue";
import LineChart from "./Charts/LineChart.vue";
import BarChart from "./Charts/BarChart.vue";
import RadarChart from "./Charts/RadarChart.vue";
import {
  getReceiptsByUser,
  getExpensesByUser,
  calcularYGuardarTotalIngresos,
  calcularYGuardarTotalGastos,
} from "@/services/AuthService.js";

const totalIngresos = ref(null);
const totalGastos = ref(null);
const totalUtilidades = ref(null);
const receiptsData = ref(null);
const expensesData = ref(null);
const profitData = ref(null);
const barData = ref(null);
const radarData = ref(null);
const lineData = ref(null);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

async function fetchData() {
  try {
    const userID = localStorage.getItem("userID");
    if (!userID) throw new Error("UserID no encontrado en localStorage");

    // Calcular totales
    totalIngresos.value = await calcularYGuardarTotalIngresos(userID);
    totalGastos.value = await calcularYGuardarTotalGastos(userID);
    totalUtilidades.value = totalIngresos.value - totalGastos.value;

    // Datos de ingresos y gastos
    const receipts = await getReceiptsByUser(userID);
    const expenses = await getExpensesByUser(userID);

    receiptsData.value = {
      labels: receipts.map((r) => r.descripcion),
      datasets: [
        {
          label: "Ingresos",
          backgroundColor: receipts.map(() => getRandomColor()),
          data: receipts.map((r) => parseFloat(r.monto)),
        },
      ],
    };

    expensesData.value = {
      labels: expenses.map((e) => e.descripcion),
      datasets: [
        {
          label: "Gastos",
          backgroundColor: expenses.map(() => getRandomColor()),
          data: expenses.map((e) => parseFloat(e.monto)),
        },
      ],
    };

    // Utilidades
    profitData.value = {
      labels: ["Ingresos", "Gastos", "Utilidades"],
      datasets: [
        {
          label: "Distribución",
          backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"],
          data: [totalIngresos.value, totalGastos.value, totalUtilidades.value],
        },
      ],
    };

    // Datos para BarChart
    barData.value = {
      labels: receipts.map((_, i) => `Mes ${i + 1}`),
      datasets: [
        {
          label: "Ingresos",
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          data: receipts.map((r) => parseFloat(r.monto)),
        },
        {
          label: "Gastos",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          data: expenses.map((e) => parseFloat(e.monto)),
        },
      ],
    };

    // Datos para RadarChart
    radarData.value = {
      labels: receipts.map((r) => r.descripcion),
      datasets: [
        {
          label: "Ingresos",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#36A2EB",
          data: receipts.map((r) => parseFloat(r.monto)),
        },
        {
          label: "Gastos",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "#FF6384",
          data: expenses.map((e) => parseFloat(e.monto)),
        },
      ],
    };

    // Datos para LineChart
    lineData.value = {
      labels: receipts.map((_, i) => `Mes ${i + 1}`),
      datasets: [
        {
          label: "Ingresos",
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          data: receipts.map((r) => parseFloat(r.monto)),
        },
        {
          label: "Gastos",
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          data: expenses.map((e) => parseFloat(e.monto)),
        },
      ],
    };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  } // Se asegura de cerrar el catch aquí
}

onMounted(fetchData);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function formatCurrency(value) {
  if (!value) return "$0";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(value);
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* Evita múltiples barras de desplazamiento */
}

.dashboard-header {
  text-align: center;
  margin-bottom: 1rem;
}

.totals-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-charts {
  flex: 1; /* Permite que las gráficas ocupen todo el espacio restante */
  overflow-y: auto; /* Agrega la única barra de desplazamiento */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.chart-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
}

.chart-card h4 {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .charts-row {
    grid-template-columns: 1fr;
  }
}

.dashboard-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 1rem;
}

.totals-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.total-card {
  background: #4CAF50;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dashboard-content {
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.chart-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
}

.chart-card h4 {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
}
}
</style>