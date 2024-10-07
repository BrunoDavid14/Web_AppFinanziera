<template>
  <div class="container">
    <div class="text-center mb-3">
      <button type="button" @click="goToDashboard" class="btn btn-secondary">
        Regresar al Dashboard
      </button>
    </div>
    <h2>Registrar Ingreso</h2>
    <form @submit.prevent="RecordReceipts">
      <div class="mb-3">
        <label for="monto" class="form-label">Monto</label>
        <input
          type="number"
          v-model="ingreso.monto"
          class="form-control"
          id="monto"
          required
        />
      </div>
      <div class="mb-3">
        <label for="fuente" class="form-label">Fuente del Ingreso</label>
        <input
          type="text"
          v-model="ingreso.fuente"
          class="form-control"
          id="fuente"
          required
        />
      </div>
      <div class="mb-3">
        <label for="fecha" class="form-label">Fecha</label>
        <input
          type="date"
          v-model="ingreso.fecha"
          class="form-control"
          id="fecha"
          required
        />
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          v-model="ingreso.descripcion"
          class="form-control"
          id="descripcion"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Registrar Ingreso</button>
    </form>
  </div>
</template>

<script>
import { receipts } from "../services/AuthService";

export default {
  data() {
    return {
      ingreso: {
        monto: "",
        fuente: "",
        fecha: "",
        descripcion: "",
      },
    };
  },
  methods: {
    async RecordReceipts() {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userID");
      if (!token || !userid) {
        alert("Usuario no autenticado");
        return;
      }
      try {
        await receipts(
          this.ingreso.monto,
          this.ingreso.fuente,
          this.ingreso.fecha,
          this.ingreso.descripcion,
          userid
        );
        alert("Ingreso registrado correctamente");
        this.clearForm(); // Limpiar el formulario después de la alerta
      } catch (error) {
        alert("Error al registrar el ingreso");
      }
    },
    clearForm() {
      // Reiniciar los valores del formulario
      this.ingreso = {
        monto: "",
        fuente: "",
        fecha: "",
        descripcion: "",
      };
    },
    goToDashboard() {
      this.$router.push({ path: "/Dashboard" }); // Redirigir a la ruta /Dashboard
    },
  },
};
</script>

<style scoped>
.page-background {
  background-color: blue; /* Color de fondo de la página */
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la página */
  display: flex; /* Flexbox para centrar vertical y horizontalmente */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
}

.container {
  max-width: 600px; /* Ancho máximo del contenedor */
  margin: 20px; /* Espacio externo */
  padding: 20px; /* Espaciado interno */
  border: 1px solid #ddd; /* Bordes */
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
  background-color: #fff; /* Color de fondo del contenedor */
}

.btn {
  margin-top: 10px; /* Espacio entre botones y el formulario */
}

.text-center {
  text-align: center; /* Centrar el texto */
}
</style>
