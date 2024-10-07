// IngresosController.js
const IngresosService = require('../../services/ReceiptsService');

// Crear un nuevo ingreso
async function createReceipts (req, res) {
    const { monto, fuente, fecha, descripcion, userid } = req.body;
    try {
        await IngresosService.createReceipts(monto, fuente, fecha, descripcion, userid);
        res.status(201).json({ message: 'Ingreso creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el ingreso' });
    }
}

// Obtener todos los ingresos de un usuario
async function getReceipsbyuser (req, res) {
    const { userid } = req.params;
    try {
        const ingresos = await IngresosService.getReceipsbyuser(userid);
        res.json(ingresos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los ingresos' });
    }
}

module.exports = {
    createReceipts,
    getReceipsbyuser,
  };