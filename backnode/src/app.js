const express = require('express');
const config = require('./config');
const cors = require('cors');
const userController = require('./controllers/userController/userController');
const AuthController = require('./controllers/userController/AuthController');
const ReceiptsController = require('./controllers/userController/ReceiptsController');
const FuentesController = require('./controllers/userController/FuentesController');
const ExpensesController = require('./controllers/userController/ExpensesController');
const CategoriasController = require('./controllers/userController/CategoriasController');
const BudgetController = require('./controllers/userController/BudgetController');
const InvestmentTrackingController = require('./controllers/userController/InvestmentTrackingController');

const app = express();

/// Configuración
app.set('port', config.app.port);

app.use(cors());
// Middleware para permitir el análisis de cuerpo JSON
app.use(express.json());

// Rutas
app.post('/usuarios', userController.guardarUsuario);
app.get('/usuarios', userController.obtenerUsuarios);
app.post('/login', AuthController.loginUsuario);
app.post('/register', AuthController.registrarUsuario);
app.post('/ingresos', ReceiptsController.createReceipts);
app.get('/ingresos/:userid', ReceiptsController.getReceipsbyuser);
app.put('/ingresos/:idingreso', ReceiptsController.editReceipt);
app.get('/ingresos/:idingreso/historial', ReceiptsController.getReceiptHistory);
app.get('/fuentes', FuentesController.getSources);
app.post('/gastos', ExpensesController.createExpenses);
app.get('/gastos/:userid', ExpensesController.getExpensesbyuser);
app.put('/gastos/:idgasto', ExpensesController.editExpenses);
app.get('/gastos/:idgasto/historial', ExpensesController.getExpensesHistory);
app.get('/categorias', CategoriasController.GetSources);
app.post('/categorias', CategoriasController.createCategory);
app.post('/budgetscreate', BudgetController.createBudget);
app.get('/budgets/:userid', BudgetController.getBudgetsByUser);
app.put('/budgets/:id', BudgetController.editBudget);
app.get('/budgets/:id/historial', BudgetController.getBudgetHistory);
app.post('/investments', InvestmentTrackingController.createInvestmentTracking);
app.get('/investments/:userid', InvestmentTrackingController.getInvestmentsByUser);

module.exports = app;