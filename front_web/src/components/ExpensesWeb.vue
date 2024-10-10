<template>
  <div
    class="expenses-container d-flex align-items-center justify-content-center"
  >
    <div class="capsule">
      <div class="text-center mb-3">
        <button @click="goToDashboard" class="btn btn-secondary">
          Regresar al Dashboard
        </button>
      </div>
      <h2>Registrar Gasto</h2>
      <form @submit.prevent="RecordExpense">
        <div class="mb-3">
          <label for="monto" class="form-label">Monto</label>
          <input
            type="number"
            v-model="gasto.monto"
            class="form-control"
            id="monto"
            required
          />
        </div>
        <div class="mb-3">
          <label for="categoria" class="form-label">Categoría</label>
          <input
            type="text"
            v-model="gasto.categoria"
            class="form-control"
            id="categoria"
            required
          />
        </div>
        <div class="mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input
            type="date"
            v-model="gasto.fecha"
            class="form-control"
            id="fecha"
            required
          />
        </div>
        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripción</label>
          <textarea
            v-model="gasto.descripcion"
            class="form-control"
            id="descripcion"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Registrar Gasto</button>
      </form>
    </div>
  </div>
</template>

<script>
import { expenses } from "../services/AuthService";

export default {
  data() {
    return {
      gasto: {
        monto: "",
        categoria: "",
        fecha: "",
        descripcion: "",
      },
    };
  },
  methods: {
    async RecordExpense() {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userID");
      if (!token || !userid) {
        alert("Usuario no autenticado");
        return;
      }
      try {
        await expenses(
          this.gasto.monto,
          this.gasto.categoria,
          this.gasto.fecha,
          this.gasto.descripcion,
          userid
        );
        alert("Gasto registrado correctamente");
        this.clearForm();
      } catch (error) {
        alert("Error al registrar el gasto");
      }
    },
    clearForm() {
      this.gasto = { monto: "", categoria: "", fecha: "", descripcion: "" };
    },
    goToDashboard() {
      this.$router.push({ path: "/Dashboard" });
    },
  },
};
</script>

<style scoped>
.expenses-container {
  height: 100vh;
  background: url("https://www.bbva.com/wp-content/uploads/2015/12/bbva-finanzas-3-1920x1080.jpg")
    no-repeat center center fixed;
  background-size: cover;
}

.capsule {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.9),
    rgba(245, 245, 245, 0.8)
  );
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

/* Estilo de los labels (nombres de los campos) */
label {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

/* Estilo de los inputs y textarea */
input,
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 2px solid #ddd;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

/* Efecto hover y focus en los inputs */
input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Botón estilizado */
button {
  background-color: #bd0000;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* Hover para el botón */
button:hover {
  background-color: #009fc7;
}
</style>
