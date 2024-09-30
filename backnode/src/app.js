// En app.js

const express = require('express');
const config = require('./config');
const cors = require('cors');
const userController = require('./controllers/userController/userController');
const loginController = require('./controllers/userController/loginController');


const app = express();

/// Configuración
app.set('port', config.app.port);

app.use(cors());
// Middleware para permitir el análisis de cuerpo JSON
app.use(express.json());

// Rutas
app.post('/usuarios', userController.guardarUsuario);
app.get('/usuarios', userController.obtenerUsuarios);
app.post('/login', loginController.loginUsuario);

module.exports = app;
