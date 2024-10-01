// registerController.js

const db = require('../../../db');
const bcrypt = require('bcryptjs');

// Función para hashear una contraseña antes de guardarla
async function hashearPassword(password) {
  const saltRounds = 10; // Puedes ajustar este número (10 es un valor razonable)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Controlador para registrar un nuevo usuario
async function registrarUsuario(req, res) {
  const { nombre, correo, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const query = 'SELECT * FROM users WHERE correo = $1';
    const result = await db.query(query, [correo]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await hashearPassword(password);

    // Guardar el nuevo usuario con la contraseña hasheada
    const insertQuery = 'INSERT INTO users (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *';
    const insertResult = await db.query(insertQuery, [nombre, correo, hashedPassword]);

    const newUser = insertResult.rows[0];
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error durante el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  registrarUsuario,
};