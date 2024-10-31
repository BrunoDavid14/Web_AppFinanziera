// GastosController.js
const GastosService = require('../../services/ExpensesService');

async function createExpenses(req, res) {
  const { monto, categoriaid, fecha, descripcion, userid } = req.body;
  try {
      // Verifica que la categoria de gastos exista
      const categoriaExiste = await GastosService.checkSourceExists(categoriaid);
      if (!categoriaExiste) {
          return res.status(400).json({ error: 'La categoria de gastos no existe' });
      }

      await GastosService.createExpenses(monto, categoriaid, fecha, descripcion, userid);
      res.status(201).json({ message: 'Gasto creado exitosamente' });
  } catch (error) {
      res.status(500).json({ error: 'Error al crear el gasto' });
  }
}

// Obtener todos los gastos de un usuario
async function getExpensesbyuser (req, res) {
    const { userid } = req.params;
    try {
        const gastos = await GastosService.getExpensesbyuser(userid);
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los Gastos' });
    }
}

async function editExpenses(req, res) {
    const { idgasto } = req.params;
    const { monto, fecha, descripcion } = req.body;
    try {
        // Edita el ingreso
        const updatedExpenses = await GastosService.editExpenses(idgasto, monto, fecha, descripcion);
        if (updatedExpenses) {
            res.status(200).json({ message: 'Gasto actualizado exitosamente', updatedExpenses });
        } else {
            res.status(404).json({ error: 'Gasto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el gasto' });
    }
}

async function getExpensesHistory(req, res) {
    const { idgasto } = req.params; // Obtener el ID del ingreso para filtrar el historial
    try {
        const history = await GastosService.getExpensesHistory(idgasto);
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
    createExpenses,
    getExpensesbyuser,
    editExpenses,
    getExpensesHistory,
  };