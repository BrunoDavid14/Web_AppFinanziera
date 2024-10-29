<template>
  <div class="container">
    <div class="text-center mb-3">
      <button type="button" @click="goToDashboard" class="btn btn-secondary">
        Regresar al Dashboard
      </button>
    </div>
    <h2>Crear Presupuesto</h2>
    <form @submit.prevent="submitBudget">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          type="text"
          v-model="budget.name"
          class="form-control"
          id="name"
          required
        />
      </div>
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
        />
      </div>
      <div class="mb-3">
        <label for="endDate" class="form-label">Fecha de Fin</label>
        <input
          type="date"
          v-model="budget.endDate"
          class="form-control"
          id="endDate"
        />
      </div>
      <button type="submit" class="btn btn-primary">Crear Presupuesto</button>
    </form>
  </div>
</template>

<script>
import { createBudget } from "../services/AuthService";

export default {
  data() {
    return {
      budget: {
        name: "",
        totalAmount: "",
        startDate: "",
        endDate: "",
      },
    };
  },
  methods: {
    async submitBudget() {
      const userid = localStorage.getItem("userID");
      if (!userid) {
        alert("Usuario no autenticado");
        return;
      }

      try {
        await createBudget(
          this.budget.name,
          parseFloat(this.budget.totalAmount),
          this.budget.startDate || null,
          this.budget.endDate || null,
          userid
        );
        alert("Presupuesto creado con éxito");
        this.clearForm();
      } catch (error) {
        console.error("Error al crear el presupuesto:", error);
        alert("Hubo un error al crear el presupuesto");
      }
    },
    clearForm() {
      this.budget = {
        name: "",
        totalAmount: "",
        startDate: "",
        endDate: "",
      };
    },
    goToDashboard() {
      this.$router.push({ path: "/Dashboard" });
    },
  },
};
</script>

<style scoped>
.budget-form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 150px auto 0;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.budget-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit {
  background-color: #28a745;
  color: white;
}

.btn-submit:hover {
  background-color: #218838;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
}

.btn-cancel:hover {
  background-color: #c82333;
}
</style>
