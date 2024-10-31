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

async function editReceipt(req, res) {
    const { idingreso } = req.params; // ID del ingreso a editar
    const { monto, fecha, descripcion } = req.body; // Nuevos datos (solo monto, fecha y descripcion)
    try {
        // Edita el ingreso
        const updatedReceipt = await IngresosService.editReceipt(idingreso, monto, fecha, descripcion);
        if (updatedReceipt) {
            res.status(200).json({ message: 'Ingreso actualizado exitosamente', updatedReceipt });
        } else {
            res.status(404).json({ error: 'Ingreso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el ingreso' });
    }
}

async function getReceiptHistory(req, res) {
    const { idingreso } = req.params; // Obtener el ID del ingreso para filtrar el historial
    try {
        const history = await IngresosService.getReceiptHistory(idingreso);
        if (history) {
            res.status(200).json(history);
        } else {
            res.status(404).json({ error: 'Historial no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
}

module.exports = {
    createReceipts,
    getReceipsbyuser,
    editReceipt,
    getReceiptHistory,
};