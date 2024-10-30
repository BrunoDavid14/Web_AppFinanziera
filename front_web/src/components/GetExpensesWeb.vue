<template>
  <div class="page-wrapper">
    <div class="container">
      <h1>Mis Gastos</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="expenses.length > 0" class="gastos-list">
        <li v-for="expense in expenses" :key="expense.id" class="gasto-item">
          <div class="gasto-card">
            <!-- Imagen del gasto -->
            <img
              src="@/assets/gastoimg.png"
              alt="Gasto"
              class="expense-image"
            />

            <div class="gasto-details">
              <p class="amount">Monto: ${{ formatMonto(expense.monto) }}</p>
              <p>Descripción: {{ expense.descripcion }}</p>
              <p>Fecha: {{ formatDate(expense.fecha) }}</p>
              <p>
                Categoría de gasto:
                {{ expense.categoria_nombre || "Categoría desconocida" }}
              </p>
              <!-- Botones para editar y ver historial -->
              <div class="button-container">
                <button
                  @click="editExpenses(expense.idgasto)"
                  class="btn btn-secondary"
                >
                  Editar
                </button>
                <button
                  @click="historyExpenses(expense.idgasto)"
                  class="btn btn-secondary"
                >
                  Historial
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Mensaje cuando no hay gastos -->
      <div v-else class="no-gastos">No hay gastos disponibles.</div>

      <!-- Mostrar el total de gastos si hay gastos -->
      <div v-if="expenses.length > 0" class="total-gastos">
        <p>
          Total de Gastos:
          <span class="total-amount">${{ formatMonto(totalGastos()) }}</span>
        </p>
      </div>
      <button type="button" @click="goToDashboard" class="btn btn-primary">
        Regresar al Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { getExpensesByUser } from "../services/AuthService";

export default {
  name: "ExpensesWeb",
  data() {
    return {
      expenses: [],
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
      this.expenses = await getExpensesByUser(userid);
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

    editExpenses(idgasto) {
      this.$router.push(`/edit-expense/${idgasto}`);
    },

    historyExpenses(idgasto) {
      this.$router.push(`/history-expense/${idgasto}`);
    },

    // Método para calcular el total de gastos
    totalGastos() {
      return this.expenses
        .reduce((total, expense) => {
          return total + parseFloat(expense.monto);
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

.gastos-list {
  list-style-type: none;
  padding: 0;
}

.gasto-item {
  margin-bottom: 20px;
}

.gasto-card {
  background-color: #c8fafa; /* Color similar al de ingresos */
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

.expense-image {
  width: 60px; /* Ajusta el tamaño de la imagen si es necesario */
  height: 60px; /* Ajusta el tamaño de la imagen si es necesario */
  margin-right: 15px;
}

.gasto-details {
  flex: 1;
}

.amount {
  font-weight: bold;
  color: #27ae60; /* Color para el monto */
}

.total-gastos {
  margin-top: auto;
  font-size: 1.5em;
  text-align: center;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 10px;
}

.total-amount {
  font-weight: bold;
  color: #2980b9; /* Color para el total */
}

.no-gastos {
  text-align: center;
  font-size: 1.2em;
  color: #7f8c8d; /* Color gris para no hay gastos */
}

.button-container {
  display: flex;
  justify-content: space-between; /* Espacio entre los botones */
  margin-top: 10px; /* Espaciado superior */
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

.btn-secondary {
  background-color: #6c757d; /* Color de fondo del botón */
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  padding: 10px 15px; /* Espaciado interior */
  transition: background-color 0.3s; /* Transición suave */
}

.btn-secondary:hover {
  background-color: #5a6268; /* Color de fondo al pasar el mouse */
}
</style>
