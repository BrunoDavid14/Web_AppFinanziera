// controllers/FuentesController.js
const FuentesService = require('../../services/FuentesService');

async function getSources(req, res) {
    try {
        const fuentes = await FuentesService.getAllSources();
        res.json(fuentes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las fuentes de ingreso' });
    }
}

module.exports = {
    getSources,
};