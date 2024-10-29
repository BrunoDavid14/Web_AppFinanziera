// controllers/CategoriasController.js
const CategoriasService = require('../../services/CategoriasService');

async function GetSources(req, res) {
    try {
        const categorias = await CategoriasService.GetAllSources();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorias de gasto' });
    }
}

async function createCategory(req, res) {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    }
    try {
        const categoriaId = await CategoriasService.createCategory(nombre);
        res.status(201).json({ categoriaId });
    } catch (error) {
        console.error('Error en el controlador al crear la categoría:', error.message);
        res.status(500).json({ error: 'Error al crear la nueva categoría' });
    }
}

module.exports = {
    GetSources,
    createCategory,
};