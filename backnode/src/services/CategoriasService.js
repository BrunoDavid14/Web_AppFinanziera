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

// Crear una nueva categoría
async function createCategory(nombre) {
    try {
        const result = await db.query(
            'INSERT INTO Categorias (nombre) VALUES ($1) RETURNING id',
            [nombre]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error('Error en la base de datos al crear la nueva categoría:', error.message);
        throw new Error('Error al crear la nueva categoría: ' + error.message);
    }
}

module.exports = {
    GetAllSources,
    createCategory,
};