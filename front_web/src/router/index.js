import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Dashboard from "../views/DashboardView.vue";
import RegisterView from "../views/RegisterView.vue";
import ReceiptsView from "../views/ReceiptsView.vue";
import GetReceiptsView from "../views/GetReceiptsView.vue";
import ExpensesView from "@/views/ExpensesView.vue";
import GetExpensesView from "@/views/GetExpensesView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/receipts",
    name: "Receipts",
    component: ReceiptsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/receiptsid",
    name: "Receiptsid",
    component: GetReceiptsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: ExpensesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/expensesid",
    name: "Expensesid",
    component: GetExpensesView,
    meta: { requiresAuth: true },
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
