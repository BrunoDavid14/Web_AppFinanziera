<template>
  <div>
    <h2>Crear Nuevo Presupuesto</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Nombre:</label>
        <input v-model="name" type="text" required />
      </div>
      <div>
        <label>Monto Total:</label>
        <input v-model="totalAmount" type="number" required />
      </div>
      <div>
        <label>Fecha de Inicio:</label>
        <input v-model="startDate" type="date" />
      </div>
      <div>
        <label>Fecha de Fin:</label>
        <input v-model="endDate" type="date" />
      </div>
      <button type="submit">Crear</button>
      <button @click="$emit('back')">Cancelar</button>
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
h2 {
  color: #333;
}
</style>
