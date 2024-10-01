import { createRouter, createWebHistory } from "vue-router";
import LoginWeb from "../components/LoginWeb.vue";
import Dashboard from "../views/DashboardView.vue";
import RegisterWeb from "../components/RegisterWeb.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginWeb,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterWeb,
  },
  {
    path: "/dash",
    name: "Dash",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.path}`); // Log de la ruta a la que intentas acceder

  // Verificamos si la ruta requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token"); // Verificamos si hay un token en localStorage
    console.log("Token encontrado:", token);

    if (!token) {
      // Si no hay token, redirigimos al login
      console.log("No hay token, redirigiendo a Home");
      next({ name: "Home" });
    } else {
      // Si hay token, permitimos el acceso a la ruta protegida
      console.log("Token válido, permitiendo acceso a la ruta protegida");
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permitimos el acceso
    console.log("Ruta no protegida, permitiendo acceso");
    next();
  }
});

export default router;
