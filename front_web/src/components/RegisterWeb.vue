<template>
  <div
    class="register-container d-flex align-items-center justify-content-center"
  >
    <div class="card text-center">
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="nombre" class="form-label"></label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              v-model="nombre"
              placeholder="Nombre"
              required
            />
          </div>

          <div class="mb-3">
            <label for="correo" class="form-label"></label>
            <input
              type="email"
              class="form-control"
              id="correo"
              v-model="correo"
              placeholder="Correo"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label"></label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Contraseña"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">Registrarse</button>
        </form>

        <div class="mt-3">
          <p>¿Ya tienes una cuenta? <a href="/Login">Inicia sesión</a></p>
        </div>

        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nombre: "",
      correo: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("http://localhost:4000/register", {
          nombre: this.nombre,
          correo: this.correo,
          password: this.password,
        });

        console.log("Registro exitoso:", response.data);

        // Redirigir al login si el registro es exitoso
        this.$router.push("/login");
      } catch (error) {
        this.error = "Error durante el registro. Verifica los datos.";
        console.error(error); // Muestra el error en la consola para depuración
      }
    },
  },
};
</script>

<style>
.register-container {
  height: 100vh;
  background-color: #6fb3c9;
}

.card {
  width: 400px;
  background-color: #f4a261;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #007bff;
  border: none;
  width: 100%;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
}

.form-label {
  margin-bottom: 5px;
}
</style>
