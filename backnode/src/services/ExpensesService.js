const db = require('../../db'); // Conexión a la base de datos

async function createExpense(monto, categoria, fecha, descripcion, userid) {
  try {
    await db.query(
      'INSERT INTO Gastos (Monto, Categoria, Fecha, Descripcion, userid) VALUES ($1, $2, $3, $4, $5)',
      [monto, categoria, fecha, descripcion, userid]
    );
  } catch (error) {
    throw new Error('Error al crear el gasto');
  }
}

async function getExpensesByUser(userid) {
  try {
    const result = await db.query(
      'SELECT * FROM Gastos WHERE Userid = $1',
      [userid]
    );
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener los gastos');
  }
}

module.exports = {
  createExpense,
  getExpensesByUser,
};
