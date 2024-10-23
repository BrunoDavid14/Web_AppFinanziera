<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Historial del Ingreso</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="historial.length > 0" class="ingresos-list">
        <li v-for="item in historial" :key="item.id" class="ingreso-item">
          <div class="ingreso-card">
            <div class="ingreso-details">
              <p class="amount">Monto: ${{ formatMonto(item.monto) }}</p>
              <p>Descripción: {{ item.descripcion }}</p>
              <p>Fecha: {{ formatDate(item.fecha) }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-ingresos">
        No hay historial disponible para este ingreso.
      </div>
      <button type="button" @click="goToListReceipt" class="btn btn-primary">
        Regresar a la lista de ingresos
      </button>
    </div>
  </div>
</template>

<script>
import { getReceiptHistory } from "../services/AuthService";

export default {
  data() {
    return {
      historial: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const idingreso = this.$route.params.idingreso;
    if (idingreso) {
      try {
        console.log("Cargando historial para IdIngreso:", idingreso);
        this.historial = await getReceiptHistory(idingreso);
      } catch (error) {
        this.error = "Error al cargar el historial del ingreso.";
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
    goToListReceipt() {
      this.$router.push("/receiptsid");
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

.ingresos-list {
  list-style-type: none;
  padding: 0;
}

.ingreso-item {
  margin-bottom: 20px;
}

.ingreso-card {
  background-color: #ffffff;
  border: 1px solid #bdc3c7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ingreso-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.ingreso-details {
  flex: 1;
}

.amount {
  font-weight: bold;
  color: #27ae60;
}

.no-ingresos {
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
