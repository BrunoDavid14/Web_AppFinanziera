<!-- src/components/BudgetList.vue -->
<template>
  <div>
    <h2>Lista de Presupuestos</h2>
    <ul>
      <li v-for="budget in budgets" :key="budget.id">
        {{ budget.name }} - {{ budget.total_amount }}
        <button @click="viewBudgetDetails(budget.id)">Ver Detalles</button>
      </li>
    </ul>
    <button @click="showCreateBudgetForm">Crear Nuevo Presupuesto</button>
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
  },
  created() {
    this.fetchBudgets();
  },
};
</script>

<style scoped>
h2 {
  color: #333;
}
</style>
