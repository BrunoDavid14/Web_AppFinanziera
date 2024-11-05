<template>
  <div class="investment-container">
    <h2>Mis Inversiones</h2>
    <div class="investment-box">
      <table>
        <thead>
          <tr>
            <th>Perfil Inversor</th>
            <th>Horizonte</th>
            <th>Tipo de Activo</th>
            <th>Nombre Activo</th>
            <th>Cantidad</th>
            <th>Fecha de Compra</th>
            <th>Precio de Compra</th>
            <th>Divisa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="investment in investments" :key="investment.idinversion">
            <td>{{ investment.perfilinversor }}</td>
            <td>{{ investment.horizonteinversion }}</td>
            <td>{{ investment.tipoactivo }}</td>
            <td>{{ investment.nombreactivo }}</td>
            <td>{{ investment.cantidad }}</td>
            <td>
              {{ new Date(investment.fechacompra).toLocaleDateString("es-ES") }}
            </td>
            <!-- Cambia aquí -->
            <td>{{ investment.preciocompra }}</td>
            <td>{{ investment.divisa }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="new-investment-button" @click="$emit('create-investment')">
      Nueva Inversión
    </button>

    <button type="button" @click="goToDashboard" class="btn btn-secondary">
      Regresar al Dashboard
    </button>
  </div>
</template>

<script>
import { getInvestmentsByUser } from "../../services/AuthService";

export default {
  data() {
    return {
      investments: [],
    };
  },
  async created() {
    await this.loadInvestments();
  },
  methods: {
    async loadInvestments() {
      const userid = localStorage.getItem("userID");
      if (!userid) {
        alert("Usuario no autenticado o falta el userID en localStorage");
        return;
      }

      try {
        const investments = await getInvestmentsByUser(userid);
        this.investments = investments;
      } catch (error) {
        console.error("Error cargar inversiones:", error);
      }
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.investment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.investment-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4caf50;
  color: white;
}

.new-investment-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.new-investment-button:hover {
  background-color: #45a049;
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
