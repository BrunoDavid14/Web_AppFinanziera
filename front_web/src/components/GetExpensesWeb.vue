<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Mis Gastos</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="expenses.length > 0" class="gastos-list">
        <li v-for="expense in expenses" :key="expense.id" class="gasto-item">
          <div class="gasto-card">
            <div class="gasto-details">
              <p class="amount">Monto: ${{ formatMonto(expense.monto) }}</p>
              <p>Descripción: {{ expense.descripcion }}</p>
              <p>Fecha: {{ formatDate(expense.fecha) }}</p>
              <p>
                Fuente de gasto:
                {{ expense.categoria_nombre || "Fuente desconocida" }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <!-- Mensaje cuando no hay ingresos -->
      <div v-else class="no-gastos">No hay gastos disponibles.</div>

      <!-- Mostrar el total de ingresos si hay ingresos -->
      <div v-if="expenses.length > 0" class="total-gastos">
        <p>
          Total de Gastos:
          <span class="total-amount">${{ formatMonto(totalGastos()) }}</span>
        </p>
      </div>
      <button type="button" @click="goToDashboard" class="btn btn-primary">
        Regresar al Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { getExpensesByUser } from "../services/AuthService";

export default {
  name: "ExpensesWeb",
  data() {
    return {
      expenses: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const userid = localStorage.getItem("userID");
    if (!userid) {
      this.error = "No se ha encontrado el ID de usuario.";
      this.loading = false;
      return;
    }

    try {
      this.expenses = await getExpensesByUser(userid);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // Método para formatear la fecha
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },

    // Método para formatear montos
    formatMonto(monto) {
      return parseFloat(monto).toLocaleString("es-ES", {
        minimumFractionDigits: 0,
      });
    },

    goToDashboard() {
      this.$router.push("/dashboard"); // Redirecciona a la ruta del Dashboard
    },

    // Método para calcular el total de ingresos
    totalGastos() {
      return this.expenses
        .reduce((total, expense) => {
          return total + parseFloat(expense.monto);
        }, 0)
        .toFixed(2);
    },
  },
};
</script>

<style scoped></style>
