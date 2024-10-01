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

    // Validación del formato de correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(correo)) {
    return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
    }

     // Validación de la seguridad de la contraseña
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
    });
  }

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