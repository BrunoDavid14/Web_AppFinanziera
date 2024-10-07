<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Finanzas_Web</a>

      <ul class="navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            id="userDropdown"
            @click="toggleDropdown"
          >
            {{ nombreUsuario }}
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            :class="{ show: dropdownVisible }"
            aria-labelledby="userDropdown"
          >
            <li>
              <a class="dropdown-item" href="#" @click="perfil">Mi perfil</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="logout"
                >Cerrar Sesión</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="GotoRegisterReceipts"
                >Registrar Ingreso</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownVisible: false, // Controla si el menú desplegable está visible
      nombreUsuario: "", // Estado para almacenar el nombre del usuario
    };
  },
  created() {
    // Obtener el nombre del usuario desde localStorage
    this.nombreUsuario = localStorage.getItem("nombre") || "Usuario";
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible; // Alterna la visibilidad del dropdown
    },
    logout() {
      // Limpiar el localStorage y redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("nombre");
      this.$router.push("/login"); // Redireccionar al login
    },
    perfil() {
      // Redirigir al perfil del usuario
      this.$router.push("/perfil");
    },
    GotoRegisterReceipts() {
      this.$router.push("/receipts");
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector(".dropdown-menu");
      const toggle = this.$el.querySelector(".nav-link.dropdown-toggle");

      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        this.dropdownVisible = false; // Cierra el dropdown
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside); // Agrega el evento al clic
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside); // Remueve el evento al desmontar
  },
};
</script>

<style>
/* Estilo para la barra de navegación */
.navbar {
  background-color: #f8f9fa; /* Fondo claro */
  padding: 10px 20px; /* Espaciado interior */
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
  color: #2c3e50; /* Color oscuro para el logo */
}

.nav-link {
  color: #2c3e50;
  font-size: 1rem;
  padding: 8px 15px;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #3498db; /* Cambia a azul en hover */
}

.navbar-nav .dropdown-menu {
  right: 0;
  left: auto;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  color: #2c3e50;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.dropdown-menu.show {
  display: block !important; /* Asegura que el menú se muestre cuando visible */
}

/* Para pantallas pequeñas */
@media (max-width: 767px) {
  .form-control {
    width: 100%;
    margin-bottom: 10px;
  }

  .btn-outline-success {
    width: 100%;
  }
}
</style>
