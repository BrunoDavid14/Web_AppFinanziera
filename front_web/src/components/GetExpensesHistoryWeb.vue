<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Historial del Gasto</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="historial.length > 0" class="gastos-list">
        <li v-for="item in historial" :key="item.id" class="gasto-item">
          <div class="gasto-card">
            <div class="gasto-details">
              <p class="amount">Monto: ${{ formatMonto(item.monto) }}</p>
              <p>Descripción: {{ item.descripcion }}</p>
              <p>Fecha: {{ formatDate(item.fecha) }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-gastos">
        No hay historial disponible para este gasto.
      </div>
      <button type="button" @click="goToListExpenses" class="btn btn-primary">
        Regresar a la lista de gastos
      </button>
    </div>
  </div>
</template>

<script>
import { getExpensesHistory } from "../services/AuthService";

export default {
  data() {
    return {
      historial: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const idgasto = this.$route.params.idgasto;
    if (idgasto) {
      try {
        console.log("Cargando historial para IdGasto:", idgasto);
        this.historial = await getExpensesHistory(idgasto);
      } catch (error) {
        this.error = "Error al cargar el historial del gasto.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    } else {
      this.error = "ID de ingreso no encontrado en la ruta";
      this.loading = false;
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
    formatMonto(monto) {
      return parseFloat(monto).toLocaleString("es-ES", {
        minimumFractionDigits: 0,
      });
    },
    goToListExpenses() {
      this.$router.push("/expensesid");
    },
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

h1 {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-bottom: 20px;
}

.gastos-list {
  list-style-type: none;
  padding: 0;
}

.gasto-item {
  margin-bottom: 20px;
}

.gasto-card {
  background-color: #ffffff;
  border: 1px solid #bdc3c7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.gasto-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.gasto-details {
  flex: 1;
}

.amount {
  font-weight: bold;
  color: #27ae60;
}

.no-gastos {
  text-align: center;
  font-size: 1.2em;
  color: #7f8c8d;
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
