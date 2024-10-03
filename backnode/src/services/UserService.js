const db = require('../../db'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para hashear la contraseña
async function hashearPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Función para registrar un nuevo usuario
async function registrarUsuario(nombre, correo, password) {
  const query = 'SELECT * FROM users WHERE correo = $1';
  const result = await db.query(query, [correo]);

  if (result.rows.length > 0) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await hashearPassword(password);

  const insertQuery = 'INSERT INTO users (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *';
  const insertResult = await db.query(insertQuery, [nombre, correo, hashedPassword]);
  return insertResult.rows[0]; // Retorna el nuevo usuario
}

// Función para login
async function loginUsuario(correo, password) {
  const query = 'SELECT * FROM users WHERE correo = $1';
  const result = await db.query(query, [correo]);

  if (result.rows.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user.id, correo: user.correo }, 'secretKey', {
    expiresIn: '1h',
  });

  return { token, nombre: user.nombre }; // Retorna el token y el nombre
}

module.exports = {
  registrarUsuario,
  loginUsuario,
};