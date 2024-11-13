<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Historial del Presupuesto</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="history.length > 0" class="budget-list">
        <li v-for="item in history" :key="item.fecha_actualizacion" class="budget-item">
          <div class="budget-card">
            <div class="budget-details">
              <p class="amount">Monto Total: ${{ formatAmount(item.total_amount) }}</p>
              <p>Saldo Restante: ${{ formatAmount(item.remaining_balance) }}</p>
              <p>Fecha de Inicio: {{ formatDate(item.start_date) }}</p>
              <p>Fecha de Fin: {{ formatDate(item.end_date) }}</p>
              <p>Fecha de Actualización: {{ formatDate(item.fecha_actualizacion) }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-history">
        No hay historial disponible para este presupuesto.
      </div>
      <button type="button" @click="goToBudgetList" class="btn btn-primary">
        Regresar a la lista de presupuestos
      </button>
    </div>
  </div>
</template>

<script>
import { getBudgetHistory } from "../../services/AuthService";

export default {
  data() {
    return {
      history: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const budgetId = this.$route.params.id;
    if (budgetId) {
      try {
        console.log("Cargando historial para el Presupuesto ID:", budgetId);
        this.history = await getBudgetHistory(budgetId);
      } catch (error) {
        this.error = "Error al cargar el historial del presupuesto.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    } else {
      this.error = "ID de presupuesto no encontrado en la ruta";
      this.loading = false;
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
    formatAmount(amount) {
      return parseFloat(amount).toLocaleString("es-ES", {
        minimumFractionDigits: 2,
      });
    },
    goToBudgetList() {
      this.$router.push("/budget");
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.container {
  max-width: 900px;
  padding: 30px;
  background-color: #dee0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}

h1 {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-bottom: 20px;
}

.budget-list {
  list-style-type: none;
  padding: 0;
}

.budget-item {
  margin-bottom: 20px;
}

.budget-card {
  background-color: #ffffff;
  border: 1px solid #bdc3c7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.budget-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.budget-details {
  flex: 1;
}

.amount {
  font-weight: bold;
  color: #27ae60;
}

.no-history {
  text-align: center;
  font-size: 1.2em;
  color: #7f8c8d;
}

.btn-primary {
  display: block;
  margin: 30px auto;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>