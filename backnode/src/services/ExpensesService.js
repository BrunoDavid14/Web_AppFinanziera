// GastosService.js
const db = require('../../db'); // Importamos la conexión a la base de datos

async function checkSourceExists(categoriaid) {
  try {
      const result = await db.query('SELECT * FROM Categorias WHERE id = $1', [categoriaid]);
      return result.rowCount > 0;
  } catch (error) {
      throw new Error('Error al verificar la categoria de gastos');
  }
}

async function createExpenses (monto, categoriaid, fecha, descripcion, userid) {
    try {
        await db.query(
            'INSERT INTO Gastos (Monto, CategoriaId, Fecha, Descripcion, userid) VALUES ($1, $2, $3, $4, $5)',
            [monto, categoriaid, fecha, descripcion, userid]
        );
    } catch (error) {
        throw new Error('Error al crear el gasto');
    }
}

async function getExpensesbyuser(userid) {
  try {
      const result = await db.query(
          `SELECT g.*, c.nombre AS categoria_nombre
           FROM Gastos g
           JOIN Categorias c ON g.categoriaid = c.id
           WHERE g.Userid = $1`,
          [userid]
      );
      return result.rows;
  } catch (error) {
      throw new Error('Error al obtener los gastos');
  }
}

module.exports = {
    createExpenses,
    getExpensesbyuser,
    checkSourceExists,
};