import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Dashboard from "../views/DashboardView.vue";
import RegisterView from "../views/RegisterView.vue";
import ReceiptsView from "../views/IngresosViews/ReceiptsView.vue";
import GetReceiptsView from "../views/IngresosViews/GetReceiptsView.vue";
import ExpensesView from "@/views/GastosViews/ExpensesView.vue";
import GetExpensesView from "@/views/GastosViews/GetExpensesView.vue";
import BudgetView from "@/views/BudgetView.vue";
import InvestmentView from "../views/InvestmentView.vue";
import EditReceiptView from "@/views/IngresosViews/EditReceiptView.vue";
import GetReceiptHistoryView from "@/views/IngresosViews/GetReceiptHistoryView.vue";
import EditExpensesView from "@/views/GastosViews/EditExpensesView.vue";
import GetExpensesHistoryView from "@/views/GastosViews/GetExpensesHistoryView.vue";

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
    path: "/edit-receipt/:idingreso",
    name: "EditReceipt",
    component: EditReceiptView,
    meta: { requiresAuth: true },
  },
  {
    path: "/history-receipt/:idingreso",
    name: "HistoryReceipt",
    component: GetReceiptHistoryView,
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
    path: "/edit-expense/:idgasto",
    name: "EditExpense",
    component: EditExpensesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/history-expense/:idgasto",
    name: "HistoryExpense",
    component: GetExpensesHistoryView,
    meta: { requiresAuth: true },
  },
  {
    path: "/budget",
    name: "Budget",
    component: BudgetView,
    meta: { requiresAuth: true },
  },
  {
    path: "/investments",
    name: "Investments",
    component: InvestmentView,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (token) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
