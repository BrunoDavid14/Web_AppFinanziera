// services/FuentesService.js
const db = require('../../db');

// Obtener todas las fuentes de ingreso
async function getAllSources() {
    try {
        const result = await db.query('SELECT * FROM Fuentes');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener las fuentes de ingreso');
    }
}

module.exports = {
    getAllSources,
};