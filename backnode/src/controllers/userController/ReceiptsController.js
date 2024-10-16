// IngresosController.js
const IngresosService = require('../../services/ReceiptsService');

async function createReceipts(req, res) {
  const { monto, fuenteid, fecha, descripcion, userid } = req.body;
  try {
      // Verifica que la fuente de ingreso exista
      const fuenteExiste = await IngresosService.checkSourceExists(fuenteid);
      if (!fuenteExiste) {
          return res.status(400).json({ error: 'La fuente de ingreso no existe' });
      }

      await IngresosService.createReceipts(monto, fuenteid, fecha, descripcion, userid);
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