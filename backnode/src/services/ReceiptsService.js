// IngresosService.js
const db = require('../../db'); // Importamos la conexión a la base de datos

async function createReceipts (monto, fuente, fecha, descripcion, userid) {
    try {
        await db.query(
            'INSERT INTO Ingresos (Monto, Fuente, Fecha, Descripcion, userid) VALUES ($1, $2, $3, $4, $5)',
            [monto, fuente, fecha, descripcion, userid]
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
};