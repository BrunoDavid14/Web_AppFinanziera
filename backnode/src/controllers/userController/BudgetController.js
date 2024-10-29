// controllers/budgetController.js
const budgetService = require('../../services/BudgetService');

async function createBudget(req, res) {
  try {
    const { userid, ...budgetData } = req.body;
    const budget = await budgetService.createBudget(budgetData, userid);
    res.status(201).json(budget);
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

async function getBudgetById(req, res) {
  try {
    const budget = await budgetService.getBudgetById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createBudget,
  getBudgetsByUser,
  getBudgetById,
};