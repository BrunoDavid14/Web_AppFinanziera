const InvestmentTrackingService = require('../../services/InvestmentTrackingService');

// Crear un nuevo registro de seguimiento de inversión
async function createInvestmentTracking(req, res) {
    const { profile, horizon, assetType, assetName, quantity, purchaseDate, purchasePrice, currency, userid } = req.body;
    try {
        await InvestmentTrackingService.createInvestmentTracking(
            profile,
            horizon,
            assetType,
            assetName,
            quantity,
            purchaseDate,
            purchasePrice,
            currency,
            userid
        );
        res.status(201).json({ message: 'Seguimiento de inversión creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el seguimiento de inversión' });
    }
}

// Obtener todos los registros de seguimiento de inversión de un usuario
async function getInvestmentsByUser(req, res) {
    const { userid } = req.params;
    try {
        const investments = await InvestmentTrackingService.getInvestmentsByUser(userid);
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el seguimiento de inversiones' });
    }
}

module.exports = {
    createInvestmentTracking,
    getInvestmentsByUser,
};