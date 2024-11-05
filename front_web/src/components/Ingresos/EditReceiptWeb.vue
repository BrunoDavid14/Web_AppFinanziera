<template>
  <div class="container">
    <div class="text-center mb-3">
      <button type="button" @click="goToListReceipts" class="btn btn-secondary">
        Regresar a la lista de ingresos
      </button>
    </div>
    <h2>Editar Ingreso</h2>
    <form @submit.prevent="updateReceipt">
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
      <button type="submit" class="btn btn-primary">Actualizar Ingreso</button>
    </form>
  </div>
</template>

<script>
import { editReceipt } from "../../services/AuthService";

export default {
  data() {
    return {
      ingreso: {
        monto: null,
        fecha: null,
        descripcion: "",
      },
    };
  },
  methods: {
    async updateReceipt() {
      const receiptId = this.$route.params.idingreso; // Obtener el ID desde la ruta
      try {
        await editReceipt(
          receiptId,
          this.ingreso.monto,
          this.ingreso.fecha,
          this.ingreso.descripcion
        );
        alert("Ingreso actualizado correctamente.");
        this.$router.push({ path: "/receiptsid" });
      } catch (error) {
        alert("Error al actualizar el ingreso.");
        console.error(error);
      }
    },
    goToListReceipts() {
      this.$router.push("/receiptsid");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 45px auto 0;
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
