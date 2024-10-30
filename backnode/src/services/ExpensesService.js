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

async function editExpenses(idgasto, monto, fecha, descripcion) {
    try {
        const previousReceipt = await db.query(
            `SELECT * FROM Gastos WHERE IdGasto = $1`, 
            [idgasto]
        );

        if (previousReceipt.rows.length === 0) {
            return null;
        }

        const result = await db.query(
            `UPDATE Gastos
             SET Monto = $1, Fecha = $2, Descripcion = $3
             WHERE IdGasto = $4
             RETURNING *`,
            [monto, fecha, descripcion, idgasto]
        );

        const { monto: oldMonto, fecha: oldFecha, descripcion: oldDescripcion } = previousReceipt.rows[0];
        console.log("Datos anteriores:", oldMonto, oldFecha, oldDescripcion);

        await db.query(
            `INSERT INTO HistorialGastos (IdGasto, Monto, Fecha, Descripcion)
             VALUES ($1, $2, $3, $4)`,
            [idgasto, oldMonto, oldFecha, oldDescripcion]
        );

        return result.rows[0];
    } catch (error) {
        throw new Error('Error al editar los gastos');
    }
}

async function getExpensesHistory(idgasto) {
    try {
        const result = await db.query(
            `SELECT * FROM HistorialGastos WHERE IdGasto = $1 ORDER BY Fecha DESC`,
            [idgasto]
        );
        return result.rows; // Devuelve los registros del historial
    } catch (error) {
        throw new Error('Error al obtener el historial');
    }
}


module.exports = {
    createExpenses,
    getExpensesbyuser,
    checkSourceExists,
    editExpenses,
    getExpensesHistory,
};