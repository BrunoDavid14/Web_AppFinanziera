<template>
  <div class="budget-details" v-if="budget">
    <h2>Detalles del Presupuesto</h2>
    <div class="budget-info">
      <p><strong>Nombre:</strong> {{ budget.name }}</p>
      <p>
        <strong>Monto Total:</strong>
        <span class="number">{{ formatNumber(budget.total_amount) }}</span>
      </p>
      <p>
        <strong>Fecha de Inicio:</strong> {{ formatDate(budget.start_date) }}
      </p>
      <p><strong>Fecha de Fin:</strong> {{ formatDate(budget.end_date) }}</p>
      <p>
        <strong>Balance Restante:</strong>
        <span class="number">{{ formatNumber(budget.remaining_balance) }}</span>
      </p>
    </div>
    <button class="back-button" @click="$emit('back')">Volver</button>
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
    formatNumber(number) {
      return Number(number).toLocaleString("es-ES", {
        minimumFractionDigits: 0,
      });
    },
  },
};
</script>

<style scoped>
.budget-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 200px;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.budget-info p {
  font-size: 18px;
  margin: 10px 0;
}

.budget-info strong {
  color: #555;
}

.number {
  color: #28a745;
  font-weight: bold;
}

.back-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.back-button:hover {
  background-color: #0056b3;
}

p {
  color: #666;
}
</style>
