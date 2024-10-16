<!-- src/components/BudgetList.vue -->
<template>
  <div class="page-wrapper">
    <div class="container">
      <h2>Lista de Presupuestos</h2>
      <ul class="budget-list">
        <li v-for="budget in budgets" :key="budget.id" class="budget-item">
          <div class="budget-card">
            <img src="@/assets/images.png" alt="Ingreso" class="income-image" />
            <div class="budget-info">
              {{ budget.name }} -
              <span class="budget-amount">{{
                formatCurrency(budget.total_amount)
              }}</span>
            </div>
            <button @click="viewBudgetDetails(budget.id)" class="btn-details">
              Ver Detalles
            </button>
          </div>
        </li>
      </ul>
      <button @click="showCreateBudgetForm" class="btn-create">
        Crear Nuevo Presupuesto
      </button>
      <button type="button" @click="goToDashboard" class="btn btn-primary">
        Regresar al Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { getAllBudgets } from "../services/AuthService";

export default {
  data() {
    return {
      budgets: [],
    };
  },
  methods: {
    async fetchBudgets() {
      try {
        this.budgets = await getAllBudgets();
      } catch (error) {
        console.error("Error al obtener los presupuestos:", error);
      }
    },
    viewBudgetDetails(id) {
      this.$emit("view-budget", id);
    },
    showCreateBudgetForm() {
      this.$emit("create-budget");
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
  created() {
    this.fetchBudgets();
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

h2 {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
}

.budget-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.budget-item {
  margin-bottom: 20px;
}

.budget-card {
  background-color: #ffffff;
  border: 1px solid #bdc3c7;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.income-image {
  width: 60px;
  height: 60px;
}

.budget-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.budget-info {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.budget-amount {
  color: #28a745;
  font-weight: bold;
}

.btn-details {
  padding: 8px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-details:hover {
  background-color: #2980b9;
}

.btn-create {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.btn-create:hover {
  background-color: #218838;
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
