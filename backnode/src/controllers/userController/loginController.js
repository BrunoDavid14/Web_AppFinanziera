// loginController.js

const db = require('../../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para el login de usuario
async function loginUsuario(req, res) {
  const { correo, password } = req.body;

  try {
    // Verificar si el usuario existe
    const query = 'SELECT * FROM users WHERE correo = $1';
    const result = await db.query(query, [correo]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, correo: user.correo }, 'secretKey', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  loginUsuario,
};