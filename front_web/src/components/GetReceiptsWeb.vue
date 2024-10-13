<template>
  <div>
    <h1>Mis Ingresos</h1>
    <div v-if="loading">Cargando...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="receipts.length > 0">
      <li v-for="receipt in receipts" :key="receipt.id">
        <p>Monto: {{ receipt.monto }}</p>
        <p>Descripción: {{ receipt.descripcion }}</p>
        <p>Fecha: {{ formatDate(receipt.fecha) }}</p>
        <p>
          Fuente de ingreso:
          {{ receipt.fuente_nombre || "Fuente desconocida" }}
        </p>
        <!-- Mostrar el nombre de la fuente -->
      </li>
    </ul>
    <div v-else>No hay ingresos disponibles.</div>
    <!-- Mostrar el total de ingresos si hay ingresos -->
    <div v-if="receipts.length > 0" class="total-ingresos">
      <p>Total de Ingresos: {{ totalIngresos() }}</p>
    </div>
  </div>
</template>

<script>
import { getReceiptsByUser } from "../services/AuthService";

export default {
  name: "ReceiptsWeb",
  data() {
    return {
      receipts: [],
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
      this.receipts = await getReceiptsByUser(userid); // Usamos la función para obtener ingresos
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

    // Método para calcular el total de ingresos
    totalIngresos() {
      return this.receipts
        .reduce((total, receipt) => {
          return total + parseFloat(receipt.monto);
        }, 0)
        .toFixed(2);
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
