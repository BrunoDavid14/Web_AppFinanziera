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
        <select
          v-model="ingreso.fuenteid"
          class="form-control"
          id="fuente"
          required
        >
          <option value="" disabled>Seleccione una fuente</option>
          <option v-for="fuente in fuentes" :key="fuente.id" :value="fuente.id">
            {{ fuente.nombre }}
          </option>
        </select>
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
import { receipts, getSources } from "../../services/AuthService";

export default {
  data() {
    return {
      ingreso: {
        monto: "",
        fuenteid: "",
        fecha: "",
        descripcion: "",
      },
      fuentes: [], // Lista para almacenar las fuentes obtenidas del backend
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
          this.ingreso.fuenteid,
          this.ingreso.fecha,
          this.ingreso.descripcion,
          userid
        );
        alert("Ingreso registrado correctamente");
        this.clearForm(); // Limpiar el formulario después de la alerta
      } catch (error) {
        console.error("Detalles del error:", error); // Muestra los detalles del error en la consola
        alert("Error al registrar el ingreso");
      }
    },
    async fetchSources() {
      try {
        this.fuentes = await getSources(); // Obtener fuentes desde el servicio
      } catch (error) {
        alert("Error al cargar las fuentes de ingreso");
      }
    },
    clearForm() {
      this.ingreso = {
        monto: "",
        fuenteid: "",
        fecha: "",
        descripcion: "",
      };
    },
    goToDashboard() {
      this.$router.push({ path: "/Dashboard" });
    },
  },
  mounted() {
    this.fetchSources(); // Cargar fuentes al montar el componente
  },
};
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Asegura que la altura ocupe todo el viewport */
}

.container {
  max-width: 600px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Necesario para el posicionamiento absoluto de la imagen */
  margin: 45px auto 0;
}

input[type="date"]:hover {
  background-color: #f0f0f0; /* Fondo más oscuro */
  border-color: #2980b9; /* Borde más oscuro */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Añade sombra */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* Transición suave */
}

/* Estilo para la imagen en la esquina superior derecha */
.corner-image {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 80px; /* Ajusta el tamaño según lo que necesites */
  height: auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
