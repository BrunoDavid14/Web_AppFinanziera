<template>
  <div class="savings-container">
    <div class="container">
    <header>
      <!-- Botón para Dashboard a la izquierda -->
      <button class="dashboard-button" @click="goToDashboard">Ir al Dashboard</button>
      
      <!-- Título centrado -->
      <h1>Mis Metas de Ahorro</h1>
      
      <!-- Botón para Crear Nueva Meta a la derecha -->
      <button class="create-button" @click="openCreateGoalModal">+ Crear Nueva Meta</button>
    </header>

    <!-- Lista de metas de ahorro -->
    <div v-if="savingsGoals.length" class="goals-grid">
      <div v-for="goal in savingsGoals" :key="goal.id" class="goal-card">
        <h2 class="goal-title">{{ goal.nombre }}</h2>
        <p><strong>Monto Objetivo:</strong> ${{ goal.monto_objetivo }}</p>z
        <p><strong>Fecha Inicio:</strong> {{ goal.fecha_inicio }}</p>
        <p><strong>Fecha Fin:</strong> {{ goal.fecha_fin }}</p>
        <p><strong>Frecuencia:</strong> {{ goal.frecuencia }}</p>
        <p><strong>Monto por {{ goal.frecuencia }}:</strong> ${{ goal.monto_por_intervalo }}</p>
      </div>
    </div>

    <p v-else class="no-goals">No tienes metas de ahorro creadas.</p>

    <!-- Modal para crear nueva meta -->
    <div v-if="showCreateGoalModal" class="modal">
      <div class="modal-content">
        <span @click="showCreateGoalModal = false" class="close">&times;</span>
        <h2>Crear Nueva Meta</h2>
        <form @submit.prevent="createSavingsGoal" class="form">
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="newGoal.nombre" required />

          <label for="monto_objetivo">Monto Objetivo:</label>
          <input type="number" v-model="newGoal.monto_objetivo" required />

          <label for="fecha_inicio">Fecha Inicio:</label>
          <input type="date" v-model="newGoal.fecha_inicio" required />

          <label for="fecha_fin">Fecha Fin:</label>
          <input type="date" v-model="newGoal.fecha_fin" required />

          <label for="frecuencia">Frecuencia:</label>
          <select v-model="newGoal.frecuencia" required>
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>

          <button type="submit" class="submit-button">Guardar Meta</button>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      savingsGoals: [],
      showCreateGoalModal: false,  // Variable para controlar la visibilidad del modal
      newGoal: {
        nombre: '',
        monto_objetivo: '',
        fecha_inicio: '',
        fecha_fin: '',
        frecuencia: 'diario',
      },
    };
  },
  methods: {
    // Método para obtener las metas de ahorro
    async fetchSavingsGoals() {
      const userId = localStorage.getItem("userID"); // Obtener el userId desde localStorage
      if (!userId) {
        alert("Usuario no autenticado o falta el userID en localStorage");
        this.$router.push("/login"); // Redirigir al login si no hay userId
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/savings-goals/${userId}`);
        this.savingsGoals = response.data;
      } catch (error) {
        console.error("Error al obtener las metas de ahorro:", error);
        alert("Error al cargar las metas de ahorro");
      }
    },

    // Método para abrir el modal de crear nueva meta
    openCreateGoalModal() {
      this.showCreateGoalModal = true;  // Cambia a true para mostrar el modal
    },

    // Método para redirigir al Dashboard
    goToDashboard() {
      this.$router.push("/dashboard"); // Redirige al Dashboard
    },

    // Método para crear una nueva meta de ahorro
    async createSavingsGoal() {
      const userId = localStorage.getItem("userID");

      if (!userId) {
        alert("Usuario no autenticado");
        this.$router.push("/login"); // Redirige al login si no hay userId
        return;
      }

      try {
        // Agrega el userId al objeto newGoal antes de enviarlo
        const goalWithUserId = { ...this.newGoal, userId };

        // Realiza la solicitud POST a la URL correcta
        const response = await axios.post(`http://localhost:4000/savings-goals`, goalWithUserId);
        // Actualiza el estado y cierra el modal
        this.showCreateGoalModal = false;  
        this.fetchSavingsGoals();  // Recarga las metas de ahorro
        alert("Meta creada exitosamente");
      } catch (error) {
        console.error("Error al crear la meta de ahorro:", error);
        alert("Error al guardar la meta");
      }
    }
  },
  created() {
    this.fetchSavingsGoals(); // Llamamos a la función para cargar las metas de ahorro cuando se cree el componente
  },
};
</script>

<style scoped>
/* General */
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
.savings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  flex-grow: 1;
  text-align: center;
  font-size: 2.2em;
  color: #333;
}

.create-button, .dashboard-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-button:hover, .dashboard-button:hover {
  background-color: #45a049;
}

/* Estilo específico para el botón de Dashboard */
.dashboard-button {
  background-color: #2196F3;
}

.dashboard-button:hover {
  background-color: #1976D2;
}

/* Grid y Tarjetas */
.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.goal-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.goal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.goal-title {
  font-size: 1.5em;
  color: #4CAF50;
  margin-bottom: 10px;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}

.close:hover {
  color: #333;
}

/* Formulario */
.form label {
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
  color: #333;
}

.form input,
.form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
