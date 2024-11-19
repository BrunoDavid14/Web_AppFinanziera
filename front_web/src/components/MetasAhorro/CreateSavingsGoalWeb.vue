<template>
  <div class="container">
    <h2>Crear Meta de Ahorro</h2>
    <form @submit.prevent="createGoal">
      <div class="form-group">
        <label for="startDate">Fecha de Inicio</label>
        <input type="date" id="startDate" v-model="goal.startDate" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="endDate">Fecha de Fin</label>
          <input type="date" id="endDate" v-model="goal.endDate" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="frequency">Frecuencia</label>
          <select id="frequency" v-model="goal.frequency" class="form-control" required>
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </div>
        </form>
        </div>
</template>

<script>
import { createSavingsGoal } from "../../services/AuthService";  // Asegúrate de que esta ruta sea correcta

export default {
  data() {
    return {
      goal: {
      name: "",
      targetAmount: 0,
      startDate: "",  // Fecha de inicio
      endDate: "",    // Fecha de fin
      frequency: "mensual", 
      },
    };
  },
  methods: {
    async createGoal() {
      try {
        const userId = localStorage.getItem("userID"); // Obtener userId del localStorage
        if (!userId) {
          alert("No se ha encontrado el ID de usuario. Por favor, inicia sesión.");
          return;
        }

        console.log("Datos enviados para crear meta:", {
          name: this.goal.name,
          targetAmount: this.goal.targetAmount,
          startDate: this.goal.startDate,
          endDate: this.goal.endDate,
          userId,
          frequency: this.goal.frequency,
        });

        const response = await createSavingsGoal(
          this.goal.name,
          this.goal.targetAmount,
          this.goal.startDate,
          this.goal.endDate,
          userId,
          this.goal.frequency
        );

        alert("Meta de ahorro creada exitosamente");
        this.$router.push("/savings-goals");
      } catch (error) {
        console.error("Error al crear la meta de ahorro:", error);
        alert("Error al crear la meta de ahorro: " + error.message);
      }
    }
  },
};
</script>
