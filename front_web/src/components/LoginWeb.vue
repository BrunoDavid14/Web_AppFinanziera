<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Correo:</label>
        <input type="email" v-model="correo" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

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
        const response = await axios.post("http://localhost:4000/login", {
          correo: this.correo,
          password: this.password,
        });

        // Almacenar el token en localStorage o sessionStorage
        localStorage.setItem("token", response.data.token);

        // Redirigir al usuario a otra vista si el login es exitoso
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = "Error de autenticación. Verifica tu correo y contraseña.";
      }
    },
  },
};
</script>

<style>
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
