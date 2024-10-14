<template>
  <div v-if="budget">
    <h2>Detalles del Presupuesto</h2>
    <p><strong>Nombre:</strong> {{ budget.name }}</p>
    <p><strong>Monto Total:</strong> {{ budget.total_amount }}</p>
    <p><strong>Fecha de Inicio:</strong> {{ formatDate(budget.start_date) }}</p>
    <p><strong>Fecha de Fin:</strong> {{ formatDate(budget.end_date) }}</p>
    <p><strong>Balance Restante:</strong> {{ budget.remaining_balance }}</p>
    <button @click="$emit('back')">Volver</button>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script>
import { getBudgetById } from "../services/AuthService";

export default {
  props: {
    budgetId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      budget: null,
    };
  },
  async created() {
    try {
      this.budget = await getBudgetById(this.budgetId);
    } catch (error) {
      console.error("Error al obtener el presupuesto:", error);
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
  },
};
</script>

<style scoped>
h2 {
  color: #333;
}
</style>
