<template>
  <div class="container">
    <div class="text-center mb-3">
      <button type="button" @click="goToBudgetList" class="btn btn-secondary">
        Regresar a la lista de presupuestos
      </button>
    </div>
    <h2>Editar Presupuesto</h2>
    <form @submit.prevent="updateBudget">
      <div class="mb-3">
        <label for="totalAmount" class="form-label">Monto Total</label>
        <input
          type="number"
          v-model="budget.totalAmount"
          class="form-control"
          id="totalAmount"
          required
        />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label">Fecha de Inicio</label>
        <input
          type="date"
          v-model="budget.startDate"
          class="form-control"
          id="startDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="endDate" class="form-label">Fecha de Fin</label>
        <input
          type="date"
          v-model="budget.endDate"
          class="form-control"
          id="endDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descripción</label>
        <textarea
          v-model="budget.description"
          class="form-control"
          id="description"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar Presupuesto</button>
    </form>
  </div>
</template>

<script>
import { editBudget } from "../../services/AuthService";

export default {
  data() {
    return {
      budget: {
        totalAmount: null,
        startDate: null,
        endDate: null,
        description: "", // Añadido para incluir descripción
      },
    };
  },
  methods: {
    async updateBudget() {
      const budgetId = this.$route.params.id; // Obtener el ID desde la ruta
      try {
        await editBudget(
          budgetId,
          this.budget.totalAmount,
          this.budget.startDate,
          this.budget.endDate,
          this.budget.description // Pasar descripción a la función
        );
        alert("Presupuesto actualizado correctamente.");
        this.$router.push({ path: "/budgets" });
      } catch (error) {
        alert("Error al actualizar el presupuesto.");
        console.error(error);
      }
    },
    goToBudgetList() {
      this.$router.push("/budget");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 45px auto 0;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #2980b9;
}
</style>