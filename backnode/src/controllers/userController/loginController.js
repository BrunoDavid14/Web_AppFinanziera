// loginController.js

const db = require('../../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para el login de usuario
async function loginUsuario(req, res) {
  const { correo, password } = req.body;

  try {
    // Buscar el usuario en la base de datos por correo
    const query = 'SELECT * FROM users WHERE correo = $1';
    const result = await db.query(query, [correo]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    console.log("Usuario encontrado:", user);

    // Comparar la contraseña en texto plano con la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT si la contraseña es correcta
    const token = jwt.sign({ id: user.id, correo: user.correo }, 'secretKey', {
      expiresIn: '1h',
    });

    // Responder con el token y el nombre del usuario
    res.status(200).json({ 
    token, 
    nombre: user.nombre // Asegúrate de que 'nombre' esté en la base de datos
  });
  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  loginUsuario,
};