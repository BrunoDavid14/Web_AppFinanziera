const userService = require('../../services/UserService'); // Asegúrate de que la ruta sea correcta

// Controlador para registrar un nuevo usuario
async function registrarUsuario(req, res) {
  const { nombre, correo, password } = req.body;

  try {
    const newUser = await userService.registrarUsuario(nombre, correo, password);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error durante el registro:', error);
    res.status(400).json({ error: error.message });
  }
}

// Controlador para el login de usuario
async function loginUsuario(req, res) {
  const { correo, password } = req.body;

  try {
    const { token, nombre } = await userService.loginUsuario(correo, password);
    res.status(200).json({ token, nombre });
  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
};