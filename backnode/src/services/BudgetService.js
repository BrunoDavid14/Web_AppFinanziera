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

async function editBudget(id, budgetData) {
  const { totalAmount, startDate, endDate } = budgetData;

  try {
    // Obtener el presupuesto actual antes de la actualización
    const previousBudget = await pool.query(
      `SELECT name, total_amount, start_date, end_date FROM budget WHERE id = $1`, 
      [id]
    );

    if (previousBudget.rows.length === 0) {
      // Si el presupuesto no existe, devolver null
      return null;
    }

    // Insertar el estado previo en la tabla de historial
    const { name, total_amount: oldTotalAmount, start_date: oldStartDate, end_date: oldEndDate } = previousBudget.rows[0];
    
    await pool.query(
      `INSERT INTO HistorialBudget (budget_id, name, total_amount, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, name, oldTotalAmount, oldStartDate, oldEndDate]
    );

    // Actualizar el presupuesto solo con los campos editables
    const result = await pool.query(
      `UPDATE budget
       SET total_amount = $1, start_date = $2, end_date = $3
       WHERE id = $4
       RETURNING *`,
      [totalAmount, startDate, endDate, id]
    );

    return result.rows[0]; // Devuelve el presupuesto actualizado
  } catch (error) {
    throw new Error('Error al editar el presupuesto');
  }
}

async function getBudgetHistory(id) {
  try {
    const result = await pool.query(
      `SELECT name, total_amount, start_date, end_date, fecha_actualizacion 
       FROM HistorialBudget 
       WHERE budget_id = $1 
       ORDER BY fecha_actualizacion DESC`,
      [id]
    );
    return result.rows; // Devuelve los registros del historial
  } catch (error) {
    throw new Error('Error al obtener el historial');
  }
}

module.exports = {
  createBudget,
  getBudgetsByUser,
  editBudget,
  getBudgetHistory
};