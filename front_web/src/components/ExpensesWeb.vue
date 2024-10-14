<template>
  <div class="container">
    <div class="text-center mb-3">
      <button type="button" @click="goToDashboard" class="btn btn-secondary">
        Regresar al Dashboard
      </button>
    </div>
    <h2>Registrar Gasto</h2>
    <form @submit.prevent="RecordExpenses">
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
        <label for="categoria" class="form-label">Categoria del gasto</label>
        <select
          v-model="gasto.categoriaid"
          class="form-control"
          id="categoria"
          required
        >
          <option value="" disabled>Seleccione una categoria</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
        </select>
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
</template>

<script>
import { expenses, GetSources } from "../services/AuthService";

export default {
  data() {
    return {
      gasto: {
        monto: "",
        categoriaid: "",
        fecha: "",
        descripcion: "",
      },
      categorias: [],
    };
  },
  methods: {
    async RecordExpenses() {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userID");
      if (!token || !userid) {
        alert("Usuario no autenticado");
        return;
      }
      try {
        await expenses(
          this.gasto.monto,
          this.gasto.categoriaid,
          this.gasto.fecha,
          this.gasto.descripcion,
          userid
        );
        alert("Gasto registrado correctamente");
        this.clearForm();
      } catch (error) {
        console.error("Detalles del error:", error);
        alert("Error al registrar el gasto");
      }
    },
    async fetchSources() {
      try {
        this.categorias = await GetSources();
      } catch (error) {
        alert("Error al cargar las categorias de gasto");
      }
    },
    clearForm() {
      this.gasto = {
        monto: "",
        categoriaid: "",
        fecha: "",
        descripcion: "",
      };
    },
    goToDashboard() {
      this.$router.push({ path: "/Dashboard" });
    },
  },
  mounted() {
    this.fetchSources();
  },
};
</script>

<style scoped></style>
