// controllers/budgetController.js
const budgetService = require('../../services/BudgetService');

async function createBudget(req, res) {
  try {
    const budget = await budgetService.createBudget(req.body);
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllBudgets(req, res) {
  try {
    const budgets = await budgetService.getAllBudgets();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getAllBudgets,
  getBudgetById,
};