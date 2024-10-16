// services/CategoriasService.js
const db = require('../../db');

// Obtener todas las categorias de gastos
async function GetAllSources() {
    try {
        const result = await db.query('SELECT * FROM Categorias');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener las categorias de gastos');
    }
}

module.exports = {
    GetAllSources,
};