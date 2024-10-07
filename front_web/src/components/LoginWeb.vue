<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="card text-center">
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="correo" class="form-label">
              <i class="fas fa-user"></i>
            </label>
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
            <label for="password" class="form-label">
              <i class="fas fa-key"></i>
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Contraseña"
              required
            />
          </div>

          <!-- El botón estará deshabilitado si correo o password están vacíos -->
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!correo || !password"
          >
            Iniciar Sesión
          </button>
        </form>

        <div class="mt-3">
          <p>¿No tienes una cuenta? <a href="/Register">Regístrate</a></p>
        </div>

        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../services/AuthService";

export default {
  data() {
    return {
      correo: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await login(this.correo, this.password);
        if (response.token) {
          // Guardar el token y el nombre del usuario en localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("nombre", response.nombre);
          localStorage.setItem("userID", response.userID);

          // Redirigir al dashboard si el login es exitoso
          this.$router.push("/Dashboard");
        } else {
          this.error = "Error: No se recibió un token.";
        }
      } catch (error) {
        this.error = "Error de autenticación. Verifica tu correo y contraseña.";
        console.error(error); // Muestra el error en la consola para depuración
      }
    },
  },
};
</script>

<style>
.card {
  width: 400px;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #007bff;
  border: none;
  width: 100%;
}

.btn-primary:disabled {
  background-color: #cccccc; /* Botón deshabilitado gris */
}

.btn-primary:hover {
  background-color: #0056b3;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
}

.form-label i {
  margin-right: 5px;
  color: #fff;
}
</style>
