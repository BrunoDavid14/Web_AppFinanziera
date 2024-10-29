// services/budgetService.js
const pool = require('../../db');

async function createBudget(data, userid) {
  const { name, totalAmount, startDate, endDate } = data;
  const remainingBalance = totalAmount;

  const query = `
    INSERT INTO budget (name, total_amount, start_date, end_date, remaining_balance, userid)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [name, totalAmount, startDate, endDate, remainingBalance, userid];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getBudgetsByUser(userid) {
  const query = `
    SELECT * FROM budget
    WHERE userid = $1;
  `;
  try {
    const result = await pool.query(query, [userid]);
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener los presupuestos');
  }
}

async function getBudgetById(id) {
  const query = 'SELECT * FROM budget WHERE id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  createBudget,
  getBudgetsByUser,
  getBudgetById,
};