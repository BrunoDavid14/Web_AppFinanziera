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

          <div class="mb-3">
            <label for="confirmPassword" class="form-label"></label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Confirmar Contraseña"
              required
            />
          </div>

          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="acceptpolicies"
              v-model="acceptpolicies"
              required
            />
            <label class="form-check-label" for="acceptpolicies">
              Acepto las <a>políticas de privacidad</a>
            </label>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!isFormValid"
          >
            Registrarse
          </button>
        </form>

        <div class="mt-3">
          <p>¿Ya tienes una cuenta? <a href="/Login">Inicia sesión</a></p>
        </div>

        <div v-if="error" class="text-danger mt-3">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "../services/AuthService";

export default {
  data() {
    return {
      nombre: "",
      correo: "",
      password: "",
      confirmPassword: "",
      acceptpolicies: false,
      error: "",
    };
  },
  computed: {
    isFormValid() {
      // Verifica que todos los campos estén llenos y las políticas aceptadas
      return (
        this.nombre &&
        this.correo &&
        this.password &&
        this.confirmPassword &&
        this.acceptpolicies
      );
    },
  },
  methods: {
    async register() {
      // Validación del formato de correo electrónico
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.correo)) {
        this.error = "El formato del correo electrónico es inválido.";
        return;
      }

      // Validación de la contraseña (mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial)
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordPattern.test(this.password)) {
        this.error =
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        return;
      }

      // Verificar si las contraseñas coinciden
      if (this.password !== this.confirmPassword) {
        this.error = "Las contraseñas no coinciden.";
        return;
      }

      try {
        const response = await register(
          this.nombre,
          this.correo,
          this.password,
          this.acceptpolicies
        );
        console.log("Registro exitoso:", response.data);

        // Redirigir al login si el registro es exitoso
        this.$router.push("/login");
      } catch (error) {
        this.error = "Error durante el registro. Verifica los datos.";
        console.error(error);
      }
    },
  },
};
</script>

<style>
.card {
  width: 400px;
  background-color: #fafafa; /* Color de fondo */
  border-radius: 0; /* Elimina el borde redondeado */
  box-shadow: none; /* Elimina la sombra */
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  width: 100%;
}

.btn-primary:disabled {
  background-color: #cccccc;
}

.btn-primary:hover:enabled {
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
