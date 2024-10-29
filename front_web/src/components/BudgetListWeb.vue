<template>
  <div class="page-wrapper">
    <div class="container">
      <h2>Lista de Presupuestos</h2>
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
              {{ budget.name }} -
              <span class="budget-amount">{{
                formatCurrency(budget.total_amount)
              }}</span>
            </div>
            <button @click="viewBudgetDetails(budget.id)" class="btn-details">
              Ver Detalles
            </button>
          </div>
        </li>
      </ul>

      <div v-else class="no-budgets">No hay presupuestos disponibles.</div>
      <button type="button" @click="goToDashboard" class="btn btn-primary">
        Regresar al Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { getBudgetsByUser } from "../services/AuthService";

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
    viewBudgetDetails(id) {
      this.$router.push(`/budget-details/${id}`);
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
  background-color: #dee0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h2 {
  font-size: 2em;
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
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.budget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.budget-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.budget-info {
  font-size: 1.2em;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.budget-amount {
  color: #28a745;
  font-weight: bold;
}

.btn-details {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-details:hover {
  background-color: #2980b9;
}

.btn-create {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.btn-create:hover {
  background-color: #218838;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>
