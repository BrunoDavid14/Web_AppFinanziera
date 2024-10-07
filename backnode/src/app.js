// En app.js

const express = require('express');
const config = require('./config');
const cors = require('cors');
const userController = require('./controllers/userController/userController');
const AuthController = require('./controllers/userController/AuthController');
const ReceiptsController = require('./controllers/userController/ReceiptsController')

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
app.post('/register', AuthController. registrarUsuario);
app.post('/ingresos', ReceiptsController.createReceipts);
app.get('/ingresos/:userid', ReceiptsController.getReceipsbyuser);

module.exports = app;
