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

module.exports = {
    createExpenses,
    getExpensesbyuser,
  };