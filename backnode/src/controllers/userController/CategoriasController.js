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

module.exports = {
    GetSources,
};