<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Mis Ingresos</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Lista de ingresos -->
      <ul v-if="receipts.length > 0" class="ingresos-list">
        <li v-for="receipt in receipts" :key="receipt.id" class="ingreso-item">
          <div class="ingreso-card">
            <!-- Imagen del ingreso -->
            <img src="@/assets/images.png" alt="Ingreso" class="income-image" />

            <!-- Detalles del ingreso -->
            <div class="ingreso-details">
              <p class="amount">Monto: ${{ formatMonto(receipt.monto) }}</p>
              <p>Descripción: {{ receipt.descripcion }}</p>
              <p>Fecha: {{ formatDate(receipt.fecha) }}</p>
              <p>
                Fuente de ingreso:
                {{ receipt.fuente_nombre || "Fuente desconocida" }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <!-- Mensaje cuando no hay ingresos -->
      <div v-else class="no-ingresos">No hay ingresos disponibles.</div>

      <!-- Mostrar el total de ingresos si hay ingresos -->
      <div v-if="receipts.length > 0" class="total-ingresos">
        <p>
          Total de Ingresos:
          <span class="total-amount">${{ formatMonto(totalIngresos()) }}</span>
        </p>
      </div>
      <button type="button" @click="goToDashboard" class="btn btn-primary">
        Regresar al Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { getReceiptsByUser } from "../services/AuthService";

export default {
  name: "ReceiptsWeb",
  data() {
    return {
      receipts: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const userid = localStorage.getItem("userID");
    if (!userid) {
      this.error = "No se ha encontrado el ID de usuario.";
      this.loading = false;
      return;
    }

    try {
      this.receipts = await getReceiptsByUser(userid); // Usamos la función para obtener ingresos
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    // Método para formatear la fecha
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },

    // Método para formatear montos
    formatMonto(monto) {
      return parseFloat(monto).toLocaleString("es-ES", {
        minimumFractionDigits: 0,
      });
    },

    goToDashboard() {
      this.$router.push("/dashboard"); // Redirecciona a la ruta del Dashboard
    },

    // Método para calcular el total de ingresos
    totalIngresos() {
      return this.receipts
        .reduce((total, receipt) => {
          return total + parseFloat(receipt.monto);
        }, 0)
        .toFixed(2);
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
  height: 100vh; /* Ocupar el 100% de la pantalla */
}

.container {
  max-width: 900px;
  padding: 30px;
  background-color: #dee0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1; /* Flexibilidad para ocupar espacio disponible */
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
  color: #7f8c8d; /* Color gris para loading */
}

.error {
  color: #e74c3c; /* Color rojo para errores */
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

.income-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.ingreso-details {
  flex: 1;
}

.amount {
  font-weight: bold;
  color: #27ae60;
}

.total-ingresos {
  margin-top: auto;
  font-size: 1.5em;
  text-align: center;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 10px;
}

.total-amount {
  font-weight: bold;
  color: #2980b9;
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
