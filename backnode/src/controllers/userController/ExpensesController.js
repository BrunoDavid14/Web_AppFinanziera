const ExpensesService = require('../../services/ExpensesService');

// Crear un nuevo gasto
async function createExpense(req, res) {
  const { monto, categoria, fecha, descripcion, userid } = req.body;
  try {
    await ExpensesService.createExpense(monto, categoria, fecha, descripcion, userid);
    res.status(201).json({ message: 'Gasto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el gasto' });
  }
}

// Obtener todos los gastos de un usuario
async function getExpensesByUser(req, res) {
  const { userid } = req.params;
  try {
    const expenses = await ExpensesService.getExpensesByUser(userid);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
}

module.exports = {
  createExpense,
  getExpensesByUser,
};
