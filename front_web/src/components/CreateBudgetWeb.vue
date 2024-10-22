<template>
  <div class="budget-form-container">
    <h2>Crear Nuevo Presupuesto</h2>
    <form @submit.prevent="submitForm" class="budget-form">
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label>Monto Total:</label>
        <input v-model="totalAmount" type="number" required />
      </div>
      <div class="form-group">
        <label>Fecha de Inicio:</label>
        <input v-model="startDate" type="date" />
      </div>
      <div class="form-group">
        <label>Fecha de Fin:</label>
        <input v-model="endDate" type="date" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-submit">Crear</button>
        <button @click="$emit('back')" class="btn-cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createBudget } from "../services/AuthService";

export default {
  data() {
    return {
      name: "",
      totalAmount: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const budgetData = {
          name: this.name,
          totalAmount: parseFloat(this.totalAmount),
          startDate: this.startDate || null,
          endDate: this.endDate || null,
        };
        await createBudget(budgetData);
        this.$emit("budget-created");
      } catch (error) {
        console.error("Error al crear el presupuesto:", error);
      }
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
