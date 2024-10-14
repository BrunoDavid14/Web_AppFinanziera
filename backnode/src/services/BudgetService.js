// services/budgetService.js
const pool = require('../../db');

async function createBudget(data) {
  const { name, totalAmount, startDate, endDate } = data;
  const remainingBalance = totalAmount;

  const query = `
    INSERT INTO budget (name, total_amount, start_date, end_date, remaining_balance)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [name, totalAmount, startDate, endDate, remainingBalance];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllBudgets() {
  const query = 'SELECT * FROM budget;';
  const result = await pool.query(query);
  return result.rows;
}

async function getBudgetById(id) {
  const query = 'SELECT * FROM budget WHERE id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
};