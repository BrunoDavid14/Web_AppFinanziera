// controllers/budgetController.js
const budgetService = require('../../services/BudgetService');

async function createBudget(req, res) {
  try {
    const { userid, ...budgetData } = req.body;
    const budget = await budgetService.createBudget(budgetData, userid);
    res.status(201).json(budget);
    console.log(campo)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getBudgetsByUser(req, res) {
  const { userid } = req.params;
  try {
    const budgets = await budgetService.getBudgetsByUser(userid);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los presupuestos' });
  }
}

async function editBudget(req, res) {
  const { id } = req.params;
  const { totalAmount, startDate, endDate, remainingBalance } = req.body;

  try {
    const updatedBudget = await budgetService.editBudget(id, { totalAmount, startDate, endDate, remainingBalance });
    if (updatedBudget) {
      res.status(200).json({ message: 'Presupuesto actualizado exitosamente', updatedBudget });
    } else {
      res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el presupuesto' });
  }
}

async function getBudgetHistory(req, res) {
  const { id } = req.params;

  try {
    const history = await budgetService.getBudgetHistory(id);
    if (history.length > 0) {
      res.status(200).json(history);
    } else {
      res.status(404).json({ error: 'Historial no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
}

module.exports = {
  createBudget,
  getBudgetsByUser,
  editBudget,
  getBudgetHistory
};