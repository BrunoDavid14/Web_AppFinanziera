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
        <label for="categoria" class="form-label">Categoría del gasto</label>
        <select
          v-model="gasto.categoriaid"
          class="form-control"
          id="categoria"
          required
          @change="checkIfOther"
        >
          <option value="" disabled>Seleccione una categoría</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
          <option value="otros">Otros</option>
        </select>
        <div v-if="showAddCategory" class="mt-2">
          <input
            type="text"
            v-model="newCategory"
            class="form-control"
            placeholder="Nueva categoría"
            @blur="saveNewCategory"
          />
        </div>
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
import {
  expenses,
  GetSources,
  createCategory,
} from "../../services/AuthService";

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
      newCategory: "",
      showAddCategory: false,
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
        if (this.gasto.categoriaid === "otros" && this.newCategory) {
          // Crear la nueva categoría si se seleccionó "otros"
          await this.saveNewCategory();
        }

        // Registrar el gasto
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
        alert("Error al cargar las categorías de gasto");
      }
    },
    async saveNewCategory() {
      if (this.newCategory) {
        try {
          // Crear la nueva categoría
          await createCategory(this.newCategory);
          await this.fetchSources(); // Actualizar la lista de categorías para incluir la nueva

          // Buscar la categoría recién creada en la lista por su nombre
          const categoriaRecienCreada = this.categorias.find(
            (categoria) => categoria.nombre === this.newCategory
          );

          if (categoriaRecienCreada) {
            // Seleccionar automáticamente la nueva categoría por su ID
            this.gasto.categoriaid = categoriaRecienCreada.id;
          }

          this.newCategory = "";
          this.showAddCategory = false;
        } catch (error) {
          console.error("Error al guardar la nueva categoría:", error);
          alert("Error al guardar la nueva categoría");
        }
      }
    },
    checkIfOther() {
      this.showAddCategory = this.gasto.categoriaid === "otros";
    },
    clearForm() {
      this.gasto = {
        monto: "",
        categoriaid: "",
        fecha: "",
        descripcion: "",
      };
      this.showAddCategory = false;
      this.newCategory = "";
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

<style scoped>
.container {
  max-width: 600px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto; /* Centra la cápsula en la página */
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
