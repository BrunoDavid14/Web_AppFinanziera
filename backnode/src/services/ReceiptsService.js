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

async function getReceipsbyuser(userid) {
  try {
      const result = await db.query(
          `SELECT i.*, f.nombre AS fuente_nombre
           FROM Ingresos i
           JOIN Fuentes f ON i.fuenteid = f.id
           WHERE i.Userid = $1`,
          [userid]
      );
      return result.rows;
  } catch (error) {
      throw new Error('Error al obtener los ingresos');
  }
}

async function editReceipt(idingreso, monto, fecha, descripcion) {
    try {
        // Obtener el ingreso antes de la actualización
        const previousReceipt = await db.query(
            `SELECT * FROM Ingresos WHERE IdIngreso = $1`, 
            [idingreso]
        );

        if (previousReceipt.rows.length === 0) {
            // Si el ingreso no existe, devolver null
            return null;
        }

        // Actualizar el ingreso
        const result = await db.query(
            `UPDATE Ingresos
             SET Monto = $1, Fecha = $2, Descripcion = $3
             WHERE IdIngreso = $4
             RETURNING *`,
            [monto, fecha, descripcion, idingreso]
        );

        // Insertar el estado previo en la tabla de historial
        const { monto: oldMonto, fecha: oldFecha, descripcion: oldDescripcion } = previousReceipt.rows[0];
        console.log("Datos anteriores:", oldMonto, oldFecha, oldDescripcion);

        await db.query(
            `INSERT INTO HistorialIngresos (IdIngreso, Monto, Fecha, Descripcion)
             VALUES ($1, $2, $3, $4)`,
            [idingreso, oldMonto, oldFecha, oldDescripcion]
        );

        return result.rows[0]; // Devuelve el ingreso actualizado
    } catch (error) {
        throw new Error('Error al editar el ingreso');
    }
}

async function getReceiptHistory(idingreso) {
    try {
        const result = await db.query(
            `SELECT * FROM HistorialIngresos WHERE IdIngreso = $1 ORDER BY Fecha DESC`,
            [idingreso]
        );
        return result.rows; // Devuelve los registros del historial
    } catch (error) {
        throw new Error('Error al obtener el historial');
    }
}

module.exports = {
    createReceipts,
    getReceipsbyuser,
    checkSourceExists,
    editReceipt, 
    getReceiptHistory
}