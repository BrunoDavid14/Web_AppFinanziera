const db = require('../../db'); // Importamos la conexión a la base de datos

// Crear un nuevo registro de seguimiento de inversión
async function createInvestmentTracking(profile, horizon, assetType, assetName, quantity, purchaseDate, purchasePrice, currency, userid) {
    try {
        await db.query(
            'INSERT INTO SeguimientoInversion (PerfilInversor, HorizonteInversion, TipoActivo, NombreActivo, Cantidad, FechaCompra, PrecioCompra, Divisa, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [profile, horizon, assetType, assetName, quantity, purchaseDate, purchasePrice, currency, userid]
        );
    } catch (error) {
        throw new Error('Error al crear el seguimiento de inversión');
    }
}

// Obtener toda la información de seguimiento de inversión de un usuario
async function getInvestmentsByUser(userid) {
    try {
        const result = await db.query(
            'SELECT * FROM SeguimientoInversion WHERE userid = $1',
            [userid]  // Usamos el userid para filtrar las inversiones del usuario
        );
        return result.rows;  // Retornamos las filas obtenidas
    } catch (error) {
        throw new Error('Error al obtener el seguimiento de inversiones');
    }
}

module.exports = {
    createInvestmentTracking,
    getInvestmentsByUser,
};
