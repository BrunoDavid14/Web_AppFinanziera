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
/* Contenedor principal */
.container {
  max-width: 500px;
  margin: 110px auto;
  padding: 20px;
  background-color: #dee0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Título centrado */
h2 {
  text-align: center;
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
}

/* Estilos del formulario */
form {
  display: flex;
  flex-direction: column;
}

/* Campos del formulario */
.mb-3 {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

/* Botón de Crear Presupuesto */
.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #28a745; /* Verde */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.btn-primary:hover {
  background-color: #218838;
}

/* Botón de Regresar al Dashboard */
.text-center .btn-secondary {
  width: 100%;
  padding: 12px;
  background-color: #3498db; /* Azul */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.text-center .btn-secondary:hover {
  background-color: #2980b9;
}
</style>
