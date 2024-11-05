<template>
  <div class="page-wrapper">
    <div class="container">
      <h2>Mis Presupuestos</h2>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="budgets.length > 0" class="budget-list">
        <li v-for="budget in budgets" :key="budget.id" class="budget-item">
          <div class="budget-card">
            <img
              src="@/assets/images.png"
              alt="Presupuesto"
              class="budget-image"
            />
            <div class="budget-info">
              <p>
                <span class="number budget-amount"
                  >Monto Total: {{ formatCurrency(budget.total_amount) }}</span
                >
              </p>
              <p>Nombre: {{ budget.name || "No disponible" }}</p>
              <p>
                Fecha de Inicio:
                {{ formatDate(budget.start_date) }}
              </p>
              <p>
                Fecha de Fin:
                {{ formatDate(budget.end_date) }}
              </p>
              <p>
                Balance Restante:
                <span class="number">{{
                  formatCurrency(budget.remaining_balance)
                }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>

      <div v-else class="no-budgets">No hay presupuestos disponibles.</div>
      <button @click="showCreateBudgetForm" class="btn-create">
        Crear Nuevo Presupuesto
      </button>
      <button type="button" @click="goToDashboard" class="btn btn-primary">
        Regresar al Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { getBudgetsByUser } from "../../services/AuthService";

export default {
  data() {
    return {
      budgets: [],
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
      this.budgets = await getBudgetsByUser(userid);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    showCreateBudgetForm() {
      this.$emit("create-budget");
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value);
    },
    formatDate(dateString) {
      if (!dateString) return "Fecha no disponible";
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
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

h2 {
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

.budget-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.budget-item {
  margin-bottom: 20px;
}

.budget-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.budget-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.budget-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.budget-info {
  font-size: 1.2em;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.budget-amount {
  font-weight: left;
  font-size: 1em;
  color: #28a745;
}

p {
  font-size: 0.9em;
  text-align: left;
  margin-bottom: 20px;
}

.btn-create {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.btn-create:hover {
  background-color: #218838;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>
