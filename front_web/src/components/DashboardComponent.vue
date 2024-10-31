<template>
  <div class="dashboard">
    <p v-if="error" class="error">{{ error }}</p>
    <p>Total de Ingresos: ${{ totalIngresos }}</p>
    <p>Total de Gastos: ${{ totalGastos }}</p>
    <p>Utilidad: ${{ utilidad }}</p>
  </div>
</template>

<script>
import {
  calcularYGuardarTotalIngresos,
  calcularYGuardarTotalGastos,
} from "../services/AuthService";

export default {
  name: "DashboardComponent",
  data() {
    return {
      totalIngresos: null,
      totalGastos: null,
      utilidad: null,
      error: null,
    };
  },
  async mounted() {
    const userID = localStorage.getItem("userID");
    if (userID) {
      try {
        // Obtener ingresos y gastos
        this.totalIngresos = await calcularYGuardarTotalIngresos(userID);
        this.totalGastos = await calcularYGuardarTotalGastos(userID);

        // Calcular utilidad y guardar solo la utilidad en localStorage
        this.utilidad = (
          parseFloat(this.totalIngresos) - parseFloat(this.totalGastos)
        ).toFixed(2);
        localStorage.setItem("utilidad", this.utilidad);

        console.log("Total de Ingresos:", this.totalIngresos);
        console.log("Total de Gastos:", this.totalGastos);
        console.log("Utilidad:", this.utilidad);
      } catch (error) {
        this.error = "Error al obtener los datos financieros.";
      }
    } else {
      this.error = "ID de usuario no encontrado.";
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.error {
  color: red;
}
</style>
