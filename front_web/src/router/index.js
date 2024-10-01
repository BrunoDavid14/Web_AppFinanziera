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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware para verificar la autenticación
router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    const token = localStorage.getItem("token"); // Obtiene el token del localStorage

    if (token) {
      next(); // Permitir el acceso a la ruta
    } else {
      next({ name: "Login" }); // Redirigir al login si no hay token
    }
  } else {
    next(); // Siempre permitir el acceso a rutas no protegidas
  }
});

export default router;
