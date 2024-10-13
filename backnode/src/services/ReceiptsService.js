// IngresosService.js
const db = require('../../db'); // Importamos la conexión a la base de datos

async function checkSourceExists(fuenteid) {
  try {
      const result = await db.query('SELECT * FROM Fuentes WHERE id = $1', [fuenteid]);
      return result.rowCount > 0;
  } catch (error) {
      throw new Error('Error al verificar la fuente de ingreso');
  }
}

async function createReceipts (monto, fuenteid, fecha, descripcion, userid) {
    try {
        await db.query(
            'INSERT INTO Ingresos (Monto, FuenteId, Fecha, Descripcion, userid) VALUES ($1, $2, $3, $4, $5)',
            [monto, fuenteid, fecha, descripcion, userid]
        );
    } catch (error) {
        throw new Error('Error al crear el ingreso');
    }
}

async function  getReceipsbyuser (userid) {
    try {
        const result = await db.query(
            'SELECT * FROM Ingresos WHERE Userid = $1',
            [userid]
        );
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los ingresos');
    }
}

module.exports = {
    createReceipts,
    getReceipsbyuser,
    checkSourceExists,
};