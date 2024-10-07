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

          <button type="submit" class="btn btn-danger">Iniciar Sesión</button>
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
.login-container {
  height: 100vh;
  background: url("https://cdn.pixabay.com/photo/2022/10/23/15/20/online-banking-7541521_1280.jpg")
    no-repeat center center fixed;
  background-size: cover;
}

.card {
  width: 400px;
  background-color: #f4a261;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-danger {
  background-color: #d9534f;
  border: none;
  width: 100%;
}

.btn-danger:hover {
  background-color: #c9302c;
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
